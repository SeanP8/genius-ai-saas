import { auth } from "@clerk/nextjs";
import { analyze } from "@/util/ai";
import { NextResponse } from "next/server";
import { checkApiLimit, incrementApiLimit } from "@/util/api-limits";






export const POST = async(request: Request) => {

    try{
        const {userId} = auth();
        const {content} = await request.json();
        
        if(!userId) {
            return new NextResponse("Unauthorized", {status: 401})
        }

        if(!content) {
            return new NextResponse("Content required", {status: 400})
        }

        const freeTrial = checkApiLimit();

        if(!freeTrial){
            return new NextResponse("Free trial has expired. Please upgrade to Pro", {status: 403})
        }
        

        const analysis = await analyze(JSON.stringify(content))

        await incrementApiLimit();

        return NextResponse.json({data: analysis})
    }catch (error: any){
        console.log('[CONVERSATION_ERROR]', error);
        return new NextResponse('internal error', {status: 500})
    }
}