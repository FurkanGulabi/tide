"use client";
import { updateUserProfile } from "@/actions/user/updateUser";
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
import { Input } from "@/components/ui/input";
import { EditProfileSchema } from "@/schemas/UserSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FaUpload } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { toast } from "sonner";
import { z } from "zod";
import { Avatar, AvatarImage } from "../ui/avatar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";

interface EditProfileButtonProps {
  bio: string;
  image?: string;
}

const MAX_IMAGE_SIZE = 16 * 1024 * 1024; // 5MB
const SUPPORTED_IMAGE_FORMATS = [
  "image/jpg",
  "image/jpeg",
  "image/png",
  "image/webp",
];

const EditProfileButton = ({ bio, image }: EditProfileButtonProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Use a ref to access the file input element
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const form = useForm({
    resolver: zodResolver(EditProfileSchema),
    defaultValues: {
      image: null,
      bio,
    },
  });

  const handlePreviewChange = (file: File | undefined) => {
    if (!file) return;
    if (file.size > MAX_IMAGE_SIZE) {
      toast.error(
        `Image size must be less than ${MAX_IMAGE_SIZE / (1024 * 1024)}MB`
      );
      return;
    }
    if (!SUPPORTED_IMAGE_FORMATS.includes(file.type)) {
      toast.error(`Unsupported image format: ${file.type}`);
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const image = e.target?.result;
      if (typeof image === "string") {
        setImagePreview(image);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    form.resetField("image");

    // Clear the file input value
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (values: z.infer<typeof EditProfileSchema>) => {
    setLoading(true);
    try {
      const formData = new FormData();
      if (values.image) {
        formData.append("image", values.image || null);
      }
      formData.append("bio", values.bio || "");

      const data = await updateUserProfile(formData);
      if (data?.error) {
        toast.error(data.error);
        return;
      }
      if (data?.success) {
        toast.success(data.success);
        window.location.reload();
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        toast.error("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button disabled={loading} variant="default">
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="relative">
            <Avatar className="mx-auto w-52 h-52 flex items-center justify-center border ">
              <AvatarImage
                src={imagePreview || image}
                alt="Profile image"
                className="object-cover"
              />
              <AvatarFallback>Image</AvatarFallback>
            </Avatar>
            {imagePreview && (
              <button
                type="button"
                onClick={handleRemoveImage} // Use the new remove image handler
                className="h-6 w-6 bg-destructive rounded-full z-50 absolute flex items-center justify-center top-0 right-24 hover:bg-destructive/90 "
                disabled={loading}
              >
                <IoClose />
              </button>
            )}
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-2"
              noValidate
            >
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profile Image</FormLabel>
                    <FormControl>
                      <div>
                        <Input
                          type="file"
                          placeholder="Picture"
                          onChange={(e) => {
                            field.onChange(e.target.files?.[0]);
                            handlePreviewChange(e.target.files?.[0]);
                          }}
                          accept="image/*"
                          className="sr-only"
                          id="fileInput"
                          ref={fileInputRef} // Attach the ref here
                          disabled={loading}
                        />
                        <Button
                          variant={"outline"}
                          className="w-full flex flex-row gap-2 items-center"
                          onClick={() =>
                            document.getElementById("fileInput")?.click()
                          }
                          type="button"
                          disabled={loading}
                        >
                          <FaUpload />
                          Upload Image
                        </Button>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Write a short bio"
                        className="max-h-40"
                        {...field}
                        maxLength={160}
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit" disabled={loading}>
                  {loading ? "Saving..." : "Save Changes"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileButton;
