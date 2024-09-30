"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import UserProfile from "@/mycomponents/userProfile";
import Expense from "@/mycomponents/expense";
import Income from "@/mycomponents/income";
import Source from "@/mycomponents/source";
import Category from "@/mycomponents/category";
import Track from "@/mycomponents/track";
import List from "@/mycomponents/list";

export default function Profile() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [id, setId] = useState("");

  // Fetch user data when the component loads
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("/api/users/me");
        console.log(res.data);
        console.log(res.data.data._id);
        setId(res.data.data._id);
        setUsername(res.data.data.username); // Set the username from the response
      } catch (error) {
        console.log(error.message);
        toast.error("Error fetching user data");
        router.push("/login");
      }
    }
    fetchData();
  }, []); // Empty dependency array ensures this only runs once

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className="ml-20 mr-10 flex text-7xl justify-between items-center mt-6 ">
        SpendWiser💰
        <Sheet>
          <SheetTrigger>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Account: {username || "Loading..."}</SheetTitle>{" "}
              {/* Display the username */}
              <SheetDescription>
                Beware of little expenses, a small leak will sink a great ship.
                See you next time!
              </SheetDescription>
            </SheetHeader>
            <div className="mt-4">
              <Button variant="destructive" onClick={logout}>
                Logout
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      <div className="mt-11">
        {id ? (
          <>
            <div className="flex flex-row justify-around">
              {/* <UserProfile user={id}/> */}
              <Expense user={id} />
              <Income user={id} />
              <div className="flex flex-col justify-around">
                <Source user={id} />
                <Category user={id} />
              </div>
            </div>
            <Track user={id} />
            <List user={id} />
          </>
        ) : (
          <div className="flex h-96 w-full items-center justify-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="animate-spin rounded-full border-4 border-gray-300 border-t-gray-900 h-12 w-12" />
              <p className="text-gray-500 dark:text-gray-400">Loading...</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}