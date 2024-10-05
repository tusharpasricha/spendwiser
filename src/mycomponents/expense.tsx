"use client";
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
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";

import { useState, useEffect } from "react";
import axios from "axios";

// Defining types for sources and categories
interface Source {
  _id: string;
  source: string;
}

interface Category {
  _id: string;
  category: string;
}

function Expense() {
  const [date, setDate] = useState<Date>()
  const [categories, setCategories] = useState<Category[]>([]);
  const [sources, setSources] = useState<Source[]>([]);
  const [selectedSource, setSelectedSource] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false); // Loading state


  // Fetch sources
  useEffect(() => {
    const fetchSources = async () => {
      try {
        const response = await axios.get("/api/sources/getallsources");
        setSources(response.data.response);
      } catch (error) {
        console.error("Error fetching sources:", error);
      }
    };
    fetchSources();
  }, []);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/categories/getallcategories");
        setCategories(response.data.response);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Validate inputs before saving
  const handleSave = async () => {
    if (!selectedCategory || !selectedSource || !amount || !date) {
      setErrorMsg("Please fill out all the fields.");
      return;
    }
    setErrorMsg("");
    setLoading(true)

    try {
      const response = await axios.post("/api/expenses/addexpenses", {
        source: selectedSource,
        category: selectedCategory,
        amount,
        date,
      });
      console.log("Expense added successfully:", response.data);
    } catch (error) {
      console.error("Error adding expense:", error);
    }finally{
      setLoading(false); 
      setAmount("");
      setDate(undefined)
    }
  };

  return (
    <Card >
      <CardHeader>
        <CardTitle>ADD Expense</CardTitle>
        <CardDescription>Click on Save after Changes</CardDescription>
      </CardHeader>

      {/* Source Selection */}
      <CardContent>
        {sources.length === 0 ? (
          <p className="text-red-500">Please add a source before adding expenses.</p>
        ) : (
          <Select onValueChange={setSelectedSource}>
            <SelectTrigger >
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

      {/* Category Selection */}
      <CardContent>
        {categories.length === 0 ? (
          <p className="text-red-500">Please add a category before adding expenses.</p>
        ) : (
          <Select onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category._id} value={category._id}>
                  {category.category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </CardContent>

      {/* Date Selection */}
      <CardContent>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
             
            >
              <CalendarIcon  />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
          </PopoverContent>
        </Popover>
      </CardContent>

      {/* Amount Input */}
      <CardContent>
        <Input
          placeholder="Amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </CardContent>

      {/* Error Message */}
      <CardContent>
        {errorMsg && <p className="text-red-500 font-semibold">{errorMsg}</p>}
      </CardContent>

      {/* Save Button */}
      <CardFooter>
      <Button onClick={handleSave} disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default Expense;
