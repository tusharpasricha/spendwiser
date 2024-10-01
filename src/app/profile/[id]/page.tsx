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
import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

import Expense from "@/mycomponents/expense";
import Income from "@/mycomponents/income";
import Source from "@/mycomponents/source";
import Category from "@/mycomponents/category";
import Track from "@/mycomponents/track";
import List from "@/mycomponents/list";
import Logout from "@/mycomponents/logout";

// async function fetchUserData() {
//   try {
//     const res = await fetch("http://localhost:3000/api/users/me", {
//       cache: 'no-store' // Ensures we fetch fresh data
//     });

//     if (!res.ok) {
//       throw new Error("Error fetching user data");
//     }

//     const data = await res.json();
//     return data.data;
//   } catch (error) {
//     console.error("Failed to fetch user data:", error);
//     return null;
//   }
// }

export default function Profile() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("/api/users/me");
        console.log(res.data);
        console.log(res.data.data._id);
        setId(res.data.data._id);
        setUsername(res.data.data.username);
      } catch (error) {
        const err = error as Error;
        console.log(err.message);
        toast.error("Error fetching user data");
        router.push("/login");
      }
    }
    fetchData();
  }, []);

  return (
    <div>
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
              <Logout />
            </div>
          </SheetContent>
        </Sheet>
      </div>
      <div className="mt-11 flex-col items-center justify-center">
        {id ? (
          <>
            <div className="flex flex-row justify-around items-center my-11">
              {/* <UserProfile user={id}/> */}
              <div className="w-1/4">
                <Expense />
              </div>
              <div className="w-1/4">
                <Income />
              </div>
              <div className="w-1/6">
                <Source />
              </div>
              <div className="w-1/6">
                <Category/>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center my-11">
              <Track />
              <List />
            </div>
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
    </div>
  );
}
