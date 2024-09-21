import { useState, useEffect } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Button } from "@/components/ui/button";

const months = [
  { label: "Jan", value: 1 },
  { label: "Feb", value: 2 },
  { label: "Mar", value: 3 },
  { label: "Apr", value: 4 },
  { label: "May", value: 5 },
  { label: "Jun", value: 6 },
  { label: "Jul", value: 7 },
  { label: "Aug", value: 8 },
  { label: "Sep", value: 9 },
  { label: "Oct", value: 10 },
  { label: "Nov", value: 11 },
  { label: "Dec", value: 12 },
];

function Track(user) {
  const [selectedYear, setSelectedYear] = useState(0);
  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(null);

  const currentYear = new Date().getFullYear();
  const startYear = 2000; // You can adjust this starting year if needed
  const years = Array.from(
    { length: currentYear - startYear + 1 },
    (v, i) => startYear + i
  ).reverse();

//   useEffect(() => {
//     const token = localStorage.getItem("token");

//     const fetchData = async () => {
//       if (!selectedYear) return; // Ensure a year is selected before fetching
//       try {
//         const yearMonthQuery = `year=${selectedYear}` + (selectedMonth ? `&month=${selectedMonth}` : "");

//         const incomeResponse = await fetch(
//           `https://spendwiser-backend.vercel.app/api/incomes?${yearMonthQuery}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         if (!incomeResponse.ok) {
//           throw new Error("Network response for income was not ok");
//         }
//         const incomeData = await incomeResponse.json();
//         setIncomeData(incomeData);

//         const expenseResponse = await fetch(
//           `https://spendwiser-backend.vercel.app/api/expenses?${yearMonthQuery}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         if (!expenseResponse.ok) {
//           throw new Error("Network response for expense was not ok");
//         }
//         const expenseData = await expenseResponse.json();
//         setExpenseData(expenseData);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, [selectedYear, selectedMonth]);

  const handleYearChange = (value) => {
    // setSelectedYear(value);
    // setSelectedMonth(null); // Reset month when year changes
  };

  const handleMonthChange = (monthValue) => {
    // setSelectedMonth(monthValue);
  };

  return (
    <div className="mt-8 mb-8">
    <Drawer>

      <DrawerTrigger >
        <div className="flex flex-col justify-center items-center min-h-96">
            <div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger >
              <Button>Analyze</Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Open the tracker to analyze monthly and yearly expenses</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        </div>
        {/* <div>
            rgrt
        </div> */}
        </div>
      </DrawerTrigger>

      <DrawerContent className="flex items-center bg-white dark:bg-gray-800 text-black dark:text-gray-300">
        <DrawerHeader className="mb-10">
          <DrawerTitle className="text-black dark:text-white">
            Expense report for
          </DrawerTitle>
          <DrawerDescription className="text-gray-700 dark:text-gray-400">
            <Select onValueChange={handleYearChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year} value={year}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Item</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Income</TableCell>
                  <TableCell className="text-right">
                    ₹
                    {incomeData
                      .reduce((acc, item) => acc + item.amount, 0)
                      .toFixed(2)}
                  </TableCell>
                </TableRow>
              </TableBody>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Expense</TableCell>
                  <TableCell className="text-right">
                    ₹
                    {expenseData
                      .reduce((acc, item) => acc + item.amount, 0)
                      .toFixed(2)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </DrawerDescription>
          <Separator />
        </DrawerHeader>

        <Separator />

        <DrawerFooter>
          <Tabs defaultValue="account" className="w-[400px]">
            <TabsList>
              {months.map((month) => (
                <TabsTrigger
                  key={month.value}
                  value={month.label}
                  onClick={() => handleMonthChange(month.value)}
                >
                  {month.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <DrawerClose className="text-gray-700 dark:text-gray-400"></DrawerClose>
          <Separator />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
    </div>
  );
}

export default Track;
