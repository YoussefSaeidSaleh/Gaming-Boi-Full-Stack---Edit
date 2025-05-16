"use server";
import User from "../models/user";
import connect from "./connet";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_EXPIRES = 90 * 60;
const generateToken = async ({ id }: { id: any }) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!!, {
    expiresIn: JWT_EXPIRES,
  });
};

// في وظيفة signup
export const signup = async (data: any) => {
  try {
    await connect();
    // تحقق من وجود المستخدم قبل إنشائه
    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      return { error: "User with this email already exists" };
    }
    
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await User.create({ ...data, password: hashedPassword });
    return { success: "User created successfully" };
  } catch (error: any) {
    console.error("Signup error:", error);
    // التعامل مع الخطأ بشكل آمن
    return { 
      error: "User creation failed", 
      details: error && typeof error === 'object' && 'message' in error 
        ? error.message 
        : "Unknown error during signup" 
    };
  }
};

export const login = async (data: { email: string; password: string }) => {
  try {
    await connect();
    const cookie = await cookies();
    const user = await User.findOne({ email: data.email }).select("+password");
    if (!user) {
      console.log("User not found:", data.email);
      return { error: "User not found" };
    }
    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) {
      console.log("Password mismatch for user:", data.email);
      return { error: "Incorrect email or password !" };
    }
    const userObj = JSON.parse(JSON.stringify(user));
    const token = await generateToken({ id: user._id });
    console.log("Generated token:", token.substring(0, 10) + "...");
    
    try {
  cookie.set("token", token, {
    httpOnly: true,
    maxAge: JWT_EXPIRES,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  } );
  console.log("Cookie set successfully");
} catch (cookieError) {
  console.error("Error setting cookie:", cookieError);
  // تصحيح التعامل مع نوع unknown
  return { 
    error: "Login failed - cookie error", 
    details: cookieError instanceof Error ? cookieError.message : "Unknown cookie error" 
  };
}

    return { success: "Login successful", data: userObj };
  } catch (error: any) {
    console.error("Login error:", error);
    return { error: "Login failed", details: error.message };
  }
};


// review game update
export const protect = async () => {
  const cookie = await cookies();
  const token = cookie.get("token")?.value;
  if (!token)
    return { error: "you are not authorized to preform this action"! };
  let decode;
  decode = jwt.verify(token, process.env.JWT_SECRET!!);
  if (!decode)
    return { error: "you are not authorized to preform this action"! };
  return { decode };
};

export const getUser = async () => {
  try {
    connect();
    const { decode } = await protect();
    const user = await User.findById((decode as any).id);
    if (!user)
      return { error: "you are not authorized to preform this action"! };
    const userObj = JSON.parse(JSON.stringify(user));
    return { data: userObj };
  } catch (error) {
    return { error: "you are not authorized to preform this action"! };
  }
};

export const logout = async () => {
  try {
    (await cookies()).delete("token");
    return { success: "Logout successful" };
  } catch (error) {
    return { error: "Logout failed" };
  }
};
