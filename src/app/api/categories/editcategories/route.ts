import {connect} from "@/dbConfig/dbConfig"
import Category from "@/models/categorymodel"
import { NextRequest,NextResponse } from "next/server"
import { getDataFromToken } from "@/helpers/getDataFromToken"

connect();

export async function PUT(request:NextRequest){
    try{
        const reqBody = await request.json();
        const { id, category } = reqBody;
        console.log("category new"+category)
        const userId = await getDataFromToken(request);

        const updatedCategory = await Category.findByIdAndUpdate(
            id,
            { category, user: userId }, // Include userId in the update
            { new: true } // Return the updated document
        );

        return NextResponse.json(
            { message: "Category updated successfully", updatedCategory },
            { status: 200 }
        );


    }catch(error){
        console.log(error);
    }
}