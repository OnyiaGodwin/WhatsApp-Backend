import Message from "../model/dbMessages.js";

const whatsAppHome = async (req, res) => {
  res.status(200).send("Hello from controller");
};

const SendMsg = async (req, res) => {
  const inputedMessage = req.body;
  console.log("The inputed msg:", req.body);

  if (
    inputedMessage.message.trim() === "" ||
    inputedMessage.name.trim() === ""
  ) {
    console.log("Please complete the data");
  }

  Message.create(inputedMessage);

  res.status(201).json({ status: "successful", data: inputedMessage });
};

const getAllMessages = async (req, res) => {
  const messages = await Message.find();

  // console.log(messages);

  res.status(200).json(messages);
};

export default { whatsAppHome, SendMsg, getAllMessages };
