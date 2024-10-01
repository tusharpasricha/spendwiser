import {connect} from "@/dbConfig/dbConfig";
import Income from "../../../../models/incomemodel";
import { NextRequest,NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect()

export async function POST(request:NextRequest){
    try{
        const reqBody = await request.json()
        const { source, amount,date } = reqBody;
        console.log("income route"+amount)

        const userId = await getDataFromToken(request);
        const newIncome = new Income({ source, amount, date, user: userId });
        const savedIncome = await newIncome.save();
        console.log(savedIncome);
        
        return NextResponse.json({
            message:"Income created successfully",
            success:true,
            savedIncome
        })
    }
    catch(error:any){
        return NextResponse.json({
            error:error.message
        },{
            status:500
        })
    }
}