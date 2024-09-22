import mongoose from "mongoose";

const sourceSchema = new mongoose.Schema({
  source: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});
const Source = mongoose.models.sources ||  mongoose.model("sources",sourceSchema)
export default Source