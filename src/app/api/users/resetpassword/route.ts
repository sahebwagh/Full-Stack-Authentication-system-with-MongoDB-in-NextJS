import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import bcryptjs from "bcryptjs";


connect()

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json();
        const {newPassword, token} = reqBody;
        console.log(reqBody);
        
    
        const user = await User.findOne({
          forgetPasswordToken: token,
          forgetPasswordTokenExpiry: {$gt: Date.now()}
        });
    
        if(!user){
            return NextResponse.json({ error: "Invalid token" }, { status: 400 });
        }
        console.log(user);

        // hashing the password
        const hashedPassword = await bcryptjs.hash(newPassword, 10);

    
        user.password = hashedPassword;
        user.forgetPasswordToken = undefined;
        user.forgetPasswordTokenExpiry = undefined;
        await user.save();
    
        console.log(user);
    
        return NextResponse.json({
          message: "Password changed successfully",
          success: true,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
}