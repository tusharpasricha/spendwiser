"use client";
import React from "react";
import axios from "axios";

import Link from "next/link";
import {useRouter} from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",
    })
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState("");


    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("Signup success", response.data);
            router.push("/login");
            
        } catch (error) {
            const err = error as Error
            setError("Signup failed")
            console.log("oho Signup failed", err);
        }finally {
            setLoading(false);
        }
    }


    return (
        <>
        <div className="flex justify-center items-center flex-col min-h-screen" >
        <div className="absolute top-10 left-10 text-6xl ">
    SpendWiser💰
    </div>
      <Card>
        <CardHeader>
          <CardTitle>Signup</CardTitle>
          <CardDescription>
            To create a new Spendwiser account, please signup below
            <br></br>
            {loading ? "Processing" : ""}
          </CardDescription>
        </CardHeader>
        <CardContent>
            <Input placeholder="Username" type="text" name="username" value={user.username} onChange={(e)=>{setUser({...user,username:e.target.value})}}/>
            <br />
            <Input placeholder="Email" type="text" name="username" value={user.email} onChange={(e)=>{setUser({...user,email:e.target.value})}}/>
            <br />
            <Input placeholder="Password" type="password" name="password" value={user.password} onChange={(e)=>{setUser({...user,password:e.target.value})}}/>
            <br />
            <Button onClick={onSignup} > Submit </Button>
        </CardContent>
        <CardFooter>
          <p className="link">
            Have an account?
            <Link href="/login"> Login</Link>
          </p>
        </CardFooter>
        {error && (
          <Alert>
            <AlertTitle>Oohoo!</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </Card>
    </div>

        </>
    )

}