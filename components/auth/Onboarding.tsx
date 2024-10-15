/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { onboardingSchema } from "@/schemas/AuthSchema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LoadingSpinner from "../ui/spinner";
import { toast } from "sonner";
import { FaUserPlus } from "react-icons/fa";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { completeOnboarding } from "@/actions/auth/Auth";
import { useRouter } from "next/navigation";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import checkUsernameAvailable from "@/lib/auth/checkUsername";

export type OnboardingFormData = z.infer<typeof onboardingSchema>;

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

const OnboardingPageComponent = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<OnboardingFormData>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      name: "",
      surname: "",
      username: "",
    },
  });

  const onSubmit = async (values: OnboardingFormData) => {
    form.clearErrors();
    setLoading(true);
    try {
      const data = await completeOnboarding(values);
      if (data.error) {
        throw new Error(data.error);
      }
      if (data.success) {
        toast.success("Onboarding completed");
        router.replace(DEFAULT_LOGIN_REDIRECT);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
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
        Let&apos;s complete your account
      </motion.p>
      <Form {...form}>
        <motion.form
          variants={containerVariants}
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-3"
          animate="visible"
          initial="hidden"
          noValidate
        >
          <div className="flex w-full flex-row space-x-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <motion.div variants={itemVariants}>
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="John"
                        type="text"
                        required
                        disabled={loading || form.formState.isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </motion.div>
              )}
            />
            <FormField
              control={form.control}
              name="surname"
              render={({ field }) => (
                <motion.div variants={itemVariants}>
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Doe"
                        type="text"
                        required
                        disabled={loading || form.formState.isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </motion.div>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <motion.div variants={itemVariants}>
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="johndoe123"
                      type="text"
                      required
                      disabled={loading || form.formState.isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </motion.div>
            )}
          />
          <motion.div variants={itemVariants}>
            <Button
              type="submit"
              className="w-full flex flex-row gap-2"
              disabled={loading || form.formState.isSubmitting}
            >
              {loading || form.formState.isSubmitting ? (
                <LoadingSpinner size="md" />
              ) : (
                <FaUserPlus />
              )}
              <span>Complete onboarding</span>
            </Button>
          </motion.div>
        </motion.form>
      </Form>
    </motion.div>
  );
};

export default OnboardingPageComponent;
