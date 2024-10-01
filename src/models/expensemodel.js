import mongoose from "mongoose";


const expenseSchema = new mongoose.Schema({
    source: { type: mongoose.Schema.Types.ObjectId, ref: "Source", required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  });
  


const Expense = mongoose.models.expenses ||  mongoose.model("expenses",expenseSchema)
export default Expense