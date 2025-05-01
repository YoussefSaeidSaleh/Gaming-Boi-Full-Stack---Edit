"use client";
import React, { startTransition, useTransition } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import FormInput from "../FormInput";
import MotionItem from "../defaults/MotionItem";
import MaxWidthWrapper from "../defaults/MaxWidthWrapper";
import Logo from "../defaults/Logo";
import Link from "next/link";
import { FileUploadDemo } from "../FileUpload";
import { signup } from "@/app/actions/auth";
import { toast } from "react-toastify";
import { redirect } from "next/navigation";

const signupSchema = z
  .object({
    email: z.string().email({ message: "Please enter a valid email" }),
    password: z
      .string()
      .min(5, { message: "Password must be at least 5 characters" }),
    name: z.string().min(5, { message: "Name must be at least 5 characters" }),
    avatar: z.any(),
    confirmPassword: z
      .string()
      .min(5, { message: "Password must be at least 5 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
const Signup = () => {
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      password: "",
      email: "",
      name: "",
      avatar: "",
      confirmPassword: "",
    },
  });
  const [isPending, startTransition] = useTransition();
  const onSubmit = async (data: z.infer<typeof signupSchema>) => {
    startTransition(async () => {
      if (data.avatar) {
        const formData = new FormData();
        formData.append("file", data.avatar[0]);
        formData.append("upload_preset", "ml_default");

        try {
          const res = await fetch(process.env.NEXT_PUBLIC_CLOUDINARY_URL!, {
            method: "POST",
            body: formData,
          });

          if (!res.ok) {
            const errorResponse = await res.json();
            console.error("Cloudinary Error:", errorResponse);
            throw new Error("Failed to upload photo");
          }

          const cloudinaryData = await res.json();
          data.avatar = {
            secure_url: cloudinaryData.secure_url,
            public_id: cloudinaryData.public_id,
          };
        } catch (error) {
          console.error("Photo upload failed:", error);
          return;
        }
      }

      const response = await signup(data);

      if (response?.success) {
        toast.success(response.success);
        redirect("/login");
      } else {
        toast.error(response.error);
      }
    });
  };

  return (
    <MotionItem animate={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 30 }}>
      <MaxWidthWrapper
        customPadding={"py-8 px-4 md:py-14 md:px-5"}
        className="flex flex-col gap-4 items-center w-full bg-black/60 rounded-lg md:rounded-2xl border border-input"
      >
        <Logo />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg flex-col gap-4 md:gap-6 px-2 md:px-0"
          >
            <FileUploadDemo name="avatar" />
            <FormInput name="name" label="Name" type="text" />
            <FormInput name="email" label="Email" type="text" />
            <FormInput name="password" label="Password" type="password" />
            <FormInput
              name="confirmPassword"
              type="password"
              label="Confirm Password"
            />
            <Button
              variant={`destructive`}
              disabled={isPending}
              type="submit"
              className="w-full"
            >
              Submit
            </Button>
          </form>
        </Form>
        <div className="capitalize text-sm md:text-base font-semibold flex flex-col sm:flex-row items-center gap-2">
          <p className="text-gray-50">Already Have An Account ?!</p>
          <Link className="text-rose-500 hover:underline" href={"/login"}>
            Login In to Your Account
          </Link>
        </div>
      </MaxWidthWrapper>
    </MotionItem>
  );
};

export default Signup;