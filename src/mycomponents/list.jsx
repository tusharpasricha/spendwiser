import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function List({ user}) {
//   const transactions = [
//     ...incomes.map((income, index) => ({
//       ...income,
//       type: "INCOME",
//       timestamp: new Date(income.date).getTime(),
//     })),
//     ...expenses.map((expense, index) => ({
//       ...expense,
//       type: "EXPENSE",
//       timestamp: new Date(expense.date).getTime(),
//     })),
//   ];

//   const sortedTransactions = transactions.sort((a, b) => {
    // const dateComparison = new Date(b.date) - new Date(a.date);
    // if (dateComparison !== 0) {
    //   return dateComparison;
    // }
    // return b.timestamp - a.timestamp;
//   });

  return (
    <>
      <ScrollArea className="h-72 w-480 rounded-md border">
        <Table>
          <TableCaption>A list of your transactions.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Source/Category</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* {sortedTransactions.map((transaction) => (
              <TableRow key={transaction._id}>
                <TableCell className="font-medium">
                  {format(new Date(transaction.date), "PPP")}
                </TableCell>
                <TableCell>{transaction.type}</TableCell>
                <TableCell>
                  {transaction.type === "INCOME"
                    ? transaction.source?.source || "No source"
                    : transaction.category?.category || "No category"}
                </TableCell>
                <TableCell className="text-right">
                  {transaction.type === "INCOME"
                    ? <p className="text-green-500">{"+"+transaction.amount}</p>
                    :  <p className="text-red-500">{"-"+transaction.amount}</p>}
                </TableCell>
              </TableRow>
            ))} */}
          </TableBody>
        </Table>
      </ScrollArea>
    </>
  );
}



export default List;
