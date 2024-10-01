import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

// Define an interface for the structure of the decoded token
interface DecodedToken {
    id: string;
    // Add any other fields you expect from the token, e.g., username, roles, etc.
}

export const getDataFromToken = (request: NextRequest) => {
    try {
        const token = request.cookies.get("token")?.value || '';
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!) as DecodedToken
        return decodedToken.id;
    } catch (error) {
        const err = error as Error
        throw new Error(err.message);
    }

}