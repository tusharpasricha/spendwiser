"use client"
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Logout() {
    const router = useRouter()
    const handleLogout = async () => {
        try {
          await axios.get("/api/users/logout");
          toast.success("Logout successful");
          router.push("/login");
        } catch (error) {
            const err = error as Error
          console.log(err.message);
          toast.error(err.message);
        }
      };
  return <>
  <Button onClick={handleLogout} >Logout</Button>
  </>;
}
