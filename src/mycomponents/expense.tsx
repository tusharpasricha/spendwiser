import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  
  import { Input } from "@/components/ui/input";
  import { Button } from "@/components/ui/button";
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
  
  import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover";
  
  import { Calendar } from "@/components/ui/calendar";
//   import { format } from "date-fns";
  import { Calendar as CalendarIcon } from "lucide-react";
  import { cn } from "@/lib/utils";
  
  import { useState, useEffect } from "react";
  
  
  function Expense({ user }) {
    const [date, setDate] = useState();
    const [categories, setCategories] = useState([]);
    const [sources, setSources] = useState([]);
    const [selectedSource, setSelectedSource] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [amount, setAmount] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(true); 
  
  
    // useEffect(() => {
    //   const token = localStorage.getItem("token");
    //   fetch("https://spendwiser-backend.vercel.app/api/getAllSources", {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   })
    //     .then((response) => response.json())
    //     .then((data) => {
    //       setSources(data.allSources);
    //       setLoading(false);
    //     })
    //     .catch((error) => {
    //       console.error("Error fetching sources:", error)
    //       setLoading(false);
    //     });
    // }, []);
  
    // useEffect(() => {
    //   const token = localStorage.getItem("token");
    //   console.log("token inside expense", token);
    //   fetch("https://spendwiser-backend.vercel.app/api/getAllCategories", {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   })
    //     .then((response) => response.json())
    //     .then((data) => {
    //       setCategories(data.allCategories);
    //       setLoading(false);
    //     })
    //     .catch((error) => {
    //       console.error("Error fetching categories:", error)
    //       setLoading(false);
    //     });
    // }, []);
  
    const handleSave = () => {
    //   const token = localStorage.getItem("token");
    //   if (!selectedCategory || !selectedSource || !amount || !date) {
    //     setErrorMsg("Fill out all the fields");
  
    //     return;
    //   }
    //   setErrorMsg("");
    //   if (selectedSource && selectedCategory && amount && date) {
    //     fetch("https://spendwiser-backend.vercel.app/api/addExpense", {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${token}`,
    //       },
    //       body: JSON.stringify({
    //         sourceId: selectedSource,
    //         categoryId: selectedCategory,
    //         amount: amount,
    //         date: date,
    //       }),
    //     })
    //       .then((response) => response.json())
    //       .then((data) => {
    //         if (data.success) {
    //           onExpenseSaved(data.savedExpense); 
    //           setDate(null);
    //           setSelectedSource("");
    //           setSelectedCategory("");
    //           setAmount("");
    //         } else {
    //           console.error("Error adding expense:", data.errors);
    //         }
    //       })
    //       .catch((error) => console.error("Error adding expense:", error));
    //   }
    };
  
    // if (loading) {
    //   return <div>Loading...</div>;
    // }
  
    return (
      <Card className="dark">
        <CardHeader>
          <CardTitle>ADD Expense</CardTitle>
          <CardDescription>Click on Save after Changes</CardDescription>
        </CardHeader>
        <CardContent>
          
            {sources.length === 0 ? (
              <p className="text-red-500">
                Please add a source before adding expenses.
              </p>
            ) : (
              <Select onValueChange={(value) => setSelectedSource(value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Source" />
                </SelectTrigger>
                <SelectContent>
                  {/* {sources.map((source) => (
                    <SelectItem key={source._id} value={source._id}>
                      {source.source}
                    </SelectItem>
                  ))} */}
                </SelectContent>
              </Select>
            )}
          
        </CardContent>
        <CardContent>
          {categories.length === 0 ? (
            <p className="text-red-500">
              Please add a category before adding expenses.
            </p>
          ) : (
            <Select onValueChange={(value) => setSelectedCategory(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {/* {categories.map((category) => (
                  <SelectItem key={category._id} value={category._id}>
                    {category.category}
                  </SelectItem>
                ))} */}
              </SelectContent>
            </Select>
          )}
        </CardContent>
        <CardContent>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[280px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </CardContent>
        <CardContent>
          <Input
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </CardContent>
        <CardContent>
          <p className="text-red-500">{errorMsg}</p>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSave}>Save</Button>
        </CardFooter>
      </Card>
    );
  }
 
  
  export default Expense;
  