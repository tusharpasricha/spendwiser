import {connect} from "@/dbConfig/dbConfig"
import Source from "@/models/sourcemodel"
import { NextRequest,NextResponse } from "next/server"
import { getDataFromToken } from "@/helpers/getDataFromToken"

connect();

export async function PUT(request:NextRequest){
    try{
        const reqBody = await request.json();
        const { id, source, amount } = reqBody;
        const userId = await getDataFromToken(request);

        const updatedSource = await Source.findByIdAndUpdate(
            id,
            { source, amount, user: userId }, // Include userId in the update
            { new: true } // Return the updated document
        );

        return NextResponse.json(
            { message: "Source updated successfully", updatedSource },
            { status: 200 }
        );


    }catch(error){
        console.log(error);
    }
}