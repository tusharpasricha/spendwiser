import {connect} from "@/dbConfig/dbConfig";
import Category from "../../../../models/categorymodel";
import { NextRequest,NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect()

export async function POST(request:NextRequest){
    try{
        const reqBody = await request.json()
        const { category } = reqBody;
        const userId = await getDataFromToken(request);
        const newCategory = new Category({ category, user: userId });
        const savedCategory = await newCategory.save();
        console.log(savedCategory);
        
        return NextResponse.json({
            message:"Category created successfully",
            success:true,
            savedCategory
        })
    }
    catch(error){
        const err = error as Error
        return NextResponse.json({
            error:err.message
        },{
            status:500
        })
    }
}