import express from 'express';
import { getMessages,sendMessages } from '../controller/message.controller.js';
// import { sendMessage } from '../controller/message.controller.js';
import protectRoute from '../middleware/protect.route.js'
const router = express.Router();

router.get("/:id",protectRoute,getMessages);
router.post("/send/:id",protectRoute,sendMessages);

export default router;