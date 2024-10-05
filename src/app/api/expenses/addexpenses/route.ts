import {connect} from "@/dbConfig/dbConfig";
import Expense from "../../../../models/expensemodel";
import { NextRequest,NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect()

export async function POST(request:NextRequest){
    try{
        const reqBody = await request.json()
        const { source,category,amount,date } = reqBody;
        const userId = await getDataFromToken(request);
        const newExpense = new Expense({source, category,amount,date, user: userId });
        const savedExpense = await newExpense.save();
        console.log(savedExpense);
        
        return NextResponse.json({
            message:"expense created successfully",
            success:true,
            savedExpense
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