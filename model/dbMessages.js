import mongoose from "mongoose";

const WhatsAppSchema = mongoose.Schema({
  message: {
    type: String,
    required: true,
    trime: true,
  },
  name: {
    type: String,
    require: true,
    trime: true,
  },
  timestamp: String,
  received: Boolean,
});

export default mongoose.model("messagedatas", WhatsAppSchema);
