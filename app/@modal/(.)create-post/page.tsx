"use client";

import { createPost } from "@/actions/user/post/createPost";
import { Modal } from "@/components/Modal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImagePlus, MapPin, Send } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import { toast } from "sonner";
import * as z from "zod";

const MAX_IMAGE_SIZE = 16 * 1024 * 1024; // 16MB
const SUPPORTED_IMAGE_FORMATS = [
  "image/jpg",
  "image/jpeg",
  "image/png",
  "image/webp",
];

const formSchema = z.object({
  description: z.string().optional(),
  location: z.string().optional(),
  image: z
    .instanceof(File)
    .refine(
      (file) => file.size <= MAX_IMAGE_SIZE,
      `Image size must be less than ${MAX_IMAGE_SIZE / (1024 * 1024)}MB`
    )
    .refine(
      (file) => SUPPORTED_IMAGE_FORMATS.includes(file.type),
      "Unsupported image format"
    )
    .optional(),
});

export default function CreatePost() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const session = useSession();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      location: "",
    },
  });

  const handlePreviewChange = (file: File | undefined) => {
    if (!file) return;
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
    form.setValue("image", undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true);
    if (!data.image) {
      form.setError("image", {
        type: "required",
        message: "Image is required",
      });
      return;
    }
    const formData = new FormData();
    formData.append("image", data.image);
    formData.append("description", data.description || "");
    formData.append("location", data.location || "");

    try {
      const data = await createPost(formData);

      if (data?.error) {
        toast.error(data.error);
        return;
      }
      if (data?.success) {
        toast.success(data.success);
        router.replace(`/${session.data?.user.username || ""}`);
        window.location.reload();
      }

      console.log(data);
      toast.success("Post created successfully!");
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Something went wrong. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal>
      <Card className="w-full max-w-3xl">
        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/2">
                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div
                            className={`relative aspect-square border ${
                              form.formState.errors.image &&
                              "border-destructive"
                            } hover:bg-white/5  rounded-lg overflow-hidden transition-colors`}
                          >
                            {imagePreview ? (
                              <>
                                <Image
                                  src={imagePreview}
                                  alt="Post Image"
                                  fill
                                  style={{ objectFit: "cover" }}
                                  className="relative"
                                />
                                <Button
                                  onClick={handleRemoveImage}
                                  variant="destructive"
                                  className="absolute top-2 right-2 z-40 p-1 rounded-full h-8 w-8"
                                >
                                  <IoClose className="w-5 h-5" />
                                </Button>
                              </>
                            ) : (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <ImagePlus className="h-12 w-12 text-muted-foreground" />
                              </div>
                            )}
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  field.onChange(file);
                                  handlePreviewChange(file);
                                }
                              }}
                              className="absolute inset-0 opacity-0 cursor-pointer"
                              ref={fileInputRef}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="w-full md:w-1/2 flex flex-col h-auto justify-between">
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="What's on your mind?"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <MapPin className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                            <Input
                              placeholder="Add location"
                              className="pl-9"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    disabled={loading}
                    type="submit"
                    className="w-full mt-4"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Post
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </Modal>
  );
}
