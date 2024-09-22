import mongoose from "mongoose";


const incomeSchema = new Schema({
    source: {
      type: Schema.Types.ObjectId,
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
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  });

  const Income = mongoose.models.incomes ||  mongoose.model("incomes",incomeSchema)
  export default Income