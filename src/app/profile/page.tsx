"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Profile() {
  const router = useRouter();
  const [data, setData] = useState("");

  useEffect(() => {
    async function fetchdata() {
      try {
        const res = await axios.get("/api/users/me");
        console.log(res.data.data+"data in profile");
        console.log(res.data.data.username);
        setData(res.data.data._id);
      } catch (error) {
        console.log(error);
        router.push("/login");
      }
    }
    fetchdata();

    router.push(`/profile/${data}`);
  });
  return (
    <>
      <div className="flex h-96 w-full items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full border-4 border-gray-300 border-t-gray-900 h-12 w-12" />
          <p className="text-gray-500 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    </>
  );
}
