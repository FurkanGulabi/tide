//Todo: implenet edit profile
"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { EditProfileFormSchema } from "@/schemas/EditProfileSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Textarea } from "../ui/textarea";
import { EditUserProfileServerFunction } from "@/actions/user/updateUser";
import { toast } from "sonner";

interface EditProfileButtonProps {
  bio: string;
  image?: string;
}

export type EditProfileFormData = z.infer<typeof EditProfileFormSchema>;

const EditProfileButton = ({ bio }: EditProfileButtonProps) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const form = useForm<EditProfileFormData>({
    resolver: zodResolver(EditProfileFormSchema),
    defaultValues: {
      bio: bio || "",
    },
  });

  const onSubmit = async (values: EditProfileFormData) => {
    form.clearErrors();
    setLoading(true);
    try {
      const data = await EditUserProfileServerFunction(values);
      if (data?.error) {
        toast.error(data.error);
      }
      if (data?.success) {
        toast.success("Profile updated");
        setOpen(false);
        window.location.reload();
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="What's on your mind"
                        maxLength={160}
                        className="w-full max-h-40"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button
                type="submit"
                disabled={loading || form.formState.isSubmitting}
              >
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileButton;
