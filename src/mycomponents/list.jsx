import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import axios from "axios";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";

function List() {
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/expenses/getallexpenses");
        console.log("response", response.data.response);
        setExpenses(response.data.response);
      } catch (error) {
        console.log(error + "after getting all expenses");
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/incomes/getallincomes");
        console.log("response", response.data.response);
        setIncomes(response.data.response);
      } catch (error) {
        console.log(error + "after getting all incomes");
      }
    };
    fetchData();
  }, []);

  const transactions = [
    ...incomes.map((income, index) => ({
      ...income,
      type: "INCOME",
      timestamp: new Date(income.date).getTime(),
    })),
    ...expenses.map((expense, index) => ({
      ...expense,
      type: "EXPENSE",
      timestamp: new Date(expense.date).getTime(),
    })),
  ];

  const sortedTransactions = transactions.sort((a, b) => {
    const dateComparison = new Date(b.date) - new Date(a.date);
    if (dateComparison !== 0) {
      return dateComparison;
    }
    return b.timestamp - a.timestamp;
  });

  return (
    <div className="w-full border rounded-lg mt-10">
      <ScrollArea>
        <Table>
          <TableCaption>A list of your transactions.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Source/Category</TableHead>
              <TableHead>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedTransactions.map((transaction) => (
              <TableRow key={transaction._id}>
                <TableCell>
                  {format(new Date(transaction.date), "PPP")}
                </TableCell>
                <TableCell>{transaction.type}</TableCell>
                <TableCell>
                  {transaction.type === "INCOME"
                    ? transaction.source?.source || "No source"
                    : transaction.category?.category || "No category"}
                </TableCell>
                <TableCell>
                  {transaction.type === "INCOME" ? (
                    <p className="text-green-500">{"+" + transaction.amount}</p>
                  ) : (
                    <p className="text-red-500">{"-" + transaction.amount}</p>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
}

export default List;
