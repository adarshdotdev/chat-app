import { response } from "express"
import cloudinary from "../lib/cloudinary.js"
import Message from "../models/Message.js"
import User from "../models/User.js"
import { io, userSocketMap } from '../server.js'

// Get all users except the logged in user
export const getUserForSidebar = async (req, res) => {
    try {
        const userId = req.user._id
        const filteredUsers = await User.find({ _id: { $ne: userId } }).select("-password")


        // Count number of messages not seen
        const unseenMessages = {}
        const promises = filteredUsers.map(async (user) => {
            const messages = await Message.find({ senderId: user._id, receiverId: userId, seen: false })

            if (messages.length > 0) {
                unseenMessages[user._id] = messages.length
            }
        })

        await Promise.all(promises)
        return res.status(200).json({ success: true, users: filteredUsers, unseenMessages })

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ success: false, message: error.message })
    }
}


// Get all messages for selected user 
export const getMessages = async (req, res) => {
    try {
        const { id: selectedUserId } = req.params

        const myId = req.user._id

        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: selectedUserId },
                { senderId: selectedUserId, receiverId: myId }
            ]
        })

        await Message.updateMany({ senderId: selectedUserId, receiverId: myId }, { seen: true })

        return res.json({ success: true, messages })

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ success: false, message: error.message })
    }
}

// api to mark message as seen using message id
export const markMessageAsSeen = async (req, res) => {
    try {
        const { id } = req.params
        await Message.findByIdAndUpdate(id, { seen: true })

        return res.json({ success: true })

    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}

// Send message to selected user 
export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body
        if (!text && !image) {
            return res.status(400).json({ success: false, message: "Text or image is required" });
        }
        const receiverId = req.params.id
        const senderId = req.user._id

        let imageUrl;
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image)
            imageUrl = uploadResponse.secure_url;

        }
        const newMessageData = {
            senderId,
            receiverId,
            text,
        };

        if (imageUrl) {
            newMessageData.image = imageUrl;
        }

        const newMessage = await Message.create(newMessageData);

        // Emit the new message to the reciever's socket 
        const receiverSocketId = userSocketMap[receiverId]
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage)
        }


        return res.json({ success: true, newMessage })

    } catch (error) {
        console.log(error.message)
        return res.json({ success: false, message: error.message })
    }

}