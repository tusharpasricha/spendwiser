import mongoose from "mongoose";


const incomeSchema = new mongoose.Schema({
    source: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Source",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  });

  const Income = mongoose.models.incomes ||  mongoose.model("incomes",incomeSchema)
  export default Income