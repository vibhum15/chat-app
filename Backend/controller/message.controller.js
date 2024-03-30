import Conversation from '../models/conversation.model.js';
import Message from '../models/massage.model.js';
import { getReceiverSocketId,io } from '../socket/socket.js';

export async function sendMessages(req, res) {
      try{
        const {message} = req.body;
        const {id: receiverId} = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
          participants : {$all : [senderId,receiverId]}
        });

        if(!conversation){
          conversation = await Conversation.create({
            participants: [senderId,receiverId]
          })
        }

        const newMessage = Message({
          senderId : senderId,
          receiverId: receiverId,
          message: message
        })

        if(newMessage){
          conversation.messages.push(newMessage._id);
        }
        // socket io functionallity
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
          // io.to(<socket_id>).emit() used to send events to specific client
          io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        // await conversation.save();
        // await newMessage.save();

        await Promise.all([conversation.save(),newMessage.save()])
        res.status(201).json(newMessage);

      }
      catch(error){
        console.log("Error in sendMessage controller",error.message);
        res.status(501).json({"error":"Internal servererror"});
      }
}

export async function getMessages(req,res){
  try {
    const {id: userToChatID} = req.params;
    const senderID = req.user._id;

    const conversation = await Conversation.findOne({
      participants :{$all : [senderID, userToChatID]}
    }).populate("messages");

    if(!conversation){
      return res.status(200).json([]);
    }

    const messages = conversation.messages;
    res.status(200).json(messages);


  } catch (error) {
    console.log("Error in getMessages controller",error.message);
    res.status(501).json({"error":"Internal servererror"});
  }
}