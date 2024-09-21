"use client";
import Link from "next/link";
import React, {useEffect} from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
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



export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
       
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState("");



    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("Login success", response.data);
            toast.success("Login success");
            router.push("/profile");
        } catch (error:any) {
            setError("Login failed")

            console.log("Login failed", error.message);
            toast.error(error.message);
        } finally{
        setLoading(false);
        }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else{
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <>
    {/* <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>{loading ? "Processing" : "Login"}</h1>
        <hr />
        
        <label htmlFor="email">email</label>
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="email"
            type="text"
            value={user.email}
            onChange={(e) => setUser({...user, email: e.target.value})}
            placeholder="email"
            />
        <label htmlFor="password">password</label>
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({...user, password: e.target.value})}
            placeholder="password"
            />
            <button
            onClick={onLogin}
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">Login here</button>
            <Link href="/signup">Visit Signup page</Link>
        </div> */}


<div className="flex justify-center items-center flex-col min-h-screen">
    <div className="absolute top-10 left-10 text-6xl ">
    SpendWiser💰
    </div>
  
  <Card>
    <CardHeader>
      <CardTitle>Login</CardTitle>
      <CardDescription>
        To access your Expense Tracker account, please login below.
        <br></br>
        {loading ? "Processing" : ""}

      </CardDescription>
    </CardHeader>
    <CardContent>
        <Input placeholder="Email" type="email" name="email" value={user.email} onChange={(e)=>{setUser({...user,email:e.target.value})}}/>
        <br></br>
        <Input placeholder="Password" type="password" name="password"onChange={(e) => setUser({...user, password: e.target.value})} />
        <br></br>
        <Button onClick={onLogin} > Submit </Button>
    </CardContent>
    <CardFooter>
      <p className="link">
        Do not have an account?
        <Link href="/signup"> Signup</Link>
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