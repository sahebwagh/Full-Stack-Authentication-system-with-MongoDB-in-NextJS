import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/helpers/mailer";


connect()

export async function POST(request:NextRequest) {
  try {
    const reqBody = await request.json();
    const { email } = reqBody;
  
    const user = await User.findOne({ email });
  
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }
  
    // send verification email
    await sendEmail({ email, emailType: "RESET", userId: user._id });
  
    return NextResponse.json({
      message:"Email sent success fully"
    })
  } catch (error: any) {
    return NextResponse.json({message: "Failed to send mail"}, {status: 500})
  }
}