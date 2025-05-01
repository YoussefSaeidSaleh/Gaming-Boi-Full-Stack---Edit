"use client";

import React, { useTransition } from "react";
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
import { login } from "@/app/actions/auth";
import { toast } from "react-toastify";
import { redirect } from "next/navigation";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z
    .string()
    .min(5, { message: "Password must be at least 5 characters" }),
});

const Login = () => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      password: "",
      email: "",
    },
  });

  const [isPending, startTransition] = useTransition();
  const onSubmit = (data: z.infer<typeof loginSchema>) => {
    startTransition(async () => {
      const res = await login(data);
      if (res.success) {
        toast.success(res.success);
        redirect("/");
      } else toast.error(res.error);
    });
  };

  return (
    <MotionItem animate={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 30 }}>
      <MaxWidthWrapper
        customPadding={"py-8 md:py-14"}
        className="flex flex-col gap-4 items-center w-full bg-black/60 rounded-2xl border
         border-input px-4 md:px-8 max-w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto"
      >
        <Logo />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-80 flex-col gap-4 md:gap-6"
          >
            <FormInput name="email" label="Email" type="text" />
            <FormInput name="password" label="Password" type="password" />
            <Button variant={`destructive`} type="submit" className="mt-2">
              Submit
            </Button>
          </form>
        </Form>
        <div
          className="capitalize text-sm md:text-base font-semibold flex flex-col sm:flex-row items-center gap-2
         text-center sm:text-left"
        >
          <p className="text-gray-50">Do Not Have An Account ?!</p>{" "}
          <Link className="text-rose-500 hover:underline" href={"signup"}>
            register with us now
          </Link>
        </div>
      </MaxWidthWrapper>
    </MotionItem>
  );
};

export default Login;
