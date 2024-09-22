import mongoose from "mongoose";


const expenseSchema = new mongoose.Schema({
    source: { type: Schema.Types.ObjectId, ref: "Source", required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  });
  


const Expense = mongoose.models.expenses ||  mongoose.model("expenses",expenseSchema)
export default Expense