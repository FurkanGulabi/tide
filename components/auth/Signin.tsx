/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { signInEmail, signInProvider } from "@/actions/auth/Auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthSchema } from "@/schemas/AuthSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { Mail } from "lucide-react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { toast } from "sonner";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import LoadingSpinner from "../ui/spinner";

export type FormData = z.infer<typeof AuthSchema>;

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,

      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const SigninPageComponent = () => {
  const [loading, setLoading] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [githubLoading, setGithubLoading] = useState(false);
  const [hasShownToast, setHasShownToast] = useState(false);
  const [disableProvider, setDisableProvider] = useState(false);
  const searchParams = useSearchParams();
  const isMailSent =
    searchParams.get("provider") === "resend" &&
    searchParams.get("type") === "email";

  const error = searchParams.get("error");

  useEffect(() => {
    if (!hasShownToast && error) {
      const errorMessage = () => {
        switch (error) {
          case "Configuration":
            return "Server error, please try again later";
          case "AccessDenied":
            return "Access Denied";
          case "Verification":
            return "The token has expired or has already been used.";
          default:
            return "An unknown error occurred.";
        }
      };

      toast.error(errorMessage());
      setHasShownToast(true); // Mark toast as shown
    }

    if (!hasShownToast && isMailSent) {
      toast.success("Email sent successfully");
      setHasShownToast(true); // Mark toast as shown
    }
    if (isMailSent) {
      setDisableProvider(true);
    }
  }, [error, isMailSent, hasShownToast]);

  const form = useForm<FormData>({
    resolver: zodResolver(AuthSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: FormData) => {
    setLoading(true);
    setEmailLoading(true);
    try {
      const data = await signInEmail(values);
      if (data?.error) {
        toast.error(data.error);
      }
      if (data?.success) {
        toast.success("Email sent successfully");
        console.log("Email sent successfully");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setEmailLoading(false);
      setLoading(false);
    }
  };

  const handleProvider = (provider: "google" | "github") => async () => {
    setLoading(true);
    switch (provider) {
      case "google":
        setGoogleLoading(true);
        break;
      case "github":
        setGithubLoading(true);
        break;
    }

    try {
      await signInProvider(provider);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
      switch (provider) {
        case "google":
          setGoogleLoading(false);
          break;
        case "github":
          setGithubLoading(false);
          break;
      }
    }
  };

  return (
    <motion.div
      className="w-full max-w-md space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1
        className="text-3xl font-bold text-center"
        variants={itemVariants}
      >
        Sign in
      </motion.h1>
      <motion.p
        className="text-center text-muted-foreground"
        variants={itemVariants}
      >
        Sign in to your account to continue
      </motion.p>
      <Form {...form}>
        <motion.form
          variants={itemVariants}
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-3"
          noValidate
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="me@example.com"
                    type="email"
                    required
                    disabled={loading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full flex justify-center items-center space-x-2"
            disabled={loading}
          >
            {emailLoading ? <LoadingSpinner size="md" /> : <Mail />}
            <span>Contiune with email</span>
          </Button>
        </motion.form>
      </Form>
      <motion.div
        className="w-full flex flex-row space-x-4 items-center"
        variants={itemVariants}
      >
        <motion.hr className="w-full" />
        <motion.p className="whitespace-nowrap">or contiune with</motion.p>
        <motion.hr className="w-full" />
      </motion.div>
      <motion.div className="flex flex-row space-x-4" variants={itemVariants}>
        <Button
          className="w-full flex justify-center items-center space-x-2"
          disabled={loading || disableProvider}
          onClick={handleProvider("google")}
        >
          {googleLoading ? <LoadingSpinner size="md" /> : <FaGoogle />}
          <span>Google</span>
        </Button>
        <Button
          className="w-full flex justify-center items-center space-x-2"
          disabled={loading || disableProvider}
          onClick={handleProvider("github")}
        >
          {githubLoading ? <LoadingSpinner size="md" /> : <FaGithub />}
          <span>Github</span>
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default SigninPageComponent;
