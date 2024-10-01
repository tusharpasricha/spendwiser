"use client";

import { useState, useEffect } from "react";
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
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import axios from "axios";

function Income() {
  const [date, setDate] = useState();
  const [sources, setSources] = useState([]);
  const [selectedSource, setSelectedSource] = useState("");
  const [amount, setAmount] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/sources/getallsources");
        console.log("response", response.data.response);
        setSources(response.data.response);
      } catch (error) {
        console.log(error + "after getting all sources");
      }
    };
    fetchData();
  }, []);

  const handleSave = async () => {
    if (!selectedSource || !amount || !date) {
      setErrorMsg("Fill out all the fields");
      return;
    }
    setErrorMsg("");
    if (selectedSource && amount && date) {
      try {
        console.log("saving income");
        const response = await axios.post("/api/incomes/addincomes", {
          source: selectedSource,
          amount: amount,
          date: date,
        });
        console.log("income saved" + response.data);
      } catch (error) {
        console.log(error + "after adding income");
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>ADD Income</CardTitle>
        <CardDescription>Click on Save after Changes</CardDescription>
      </CardHeader>
      <CardContent>
        {sources.length === 0 ? (
          <p className="text-red-500">
            Please add a source before adding expenses.
          </p>
        ) : (
          <Select onValueChange={(value) => setSelectedSource(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Source" />
            </SelectTrigger>
            <SelectContent>
              {sources.map((source) => (
                <SelectItem key={source._id} value={source._id}>
                  {source.source}
                </SelectItem>
              ))}
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
        <p className="text-red-600">{errorMsg}</p>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSave}>Save</Button>
      </CardFooter>
    </Card>
  );
}

export default Income;
