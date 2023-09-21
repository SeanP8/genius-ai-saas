"use client";
import { cn } from "@/lib/utils";
import { createNewEntry } from "@/util/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/Heading";
import { MessageSquare } from "lucide-react";
import { Loader } from "@/components/Loader";
import { UserAvatar } from "@/components/User-Avatar";
import { BotAvatar } from "@/components/Bot-Avatar";

const formSchema = z.object({
  content: z.string().min(2, {
    message: "Statement must be at least 2 characters",
  }),
});

const UserInput = () => {
  const router = useRouter();
  const [analysis, setAnalysis] = useState<any>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      let userMessage = { role: "user", content: values.content };
      const newMessage = [...analysis, userMessage];

      const response = await createNewEntry({ messages: newMessage });

      setAnalysis((curr) => [...curr, userMessage, response]);

      form.reset();
    } catch (error: any) {
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <Heading
        title="Conversation"
        description="Our most advance conversation model"
        icon={MessageSquare}
        iconColor="text-blue-500"
        bgColor="bg-blue-500/10"
      />
      <div className="px-4 lg:px-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=" rounded-lg border w-full p-4 px-3 grid grid-cols-12 gap-2"
          >
            <FormField
              name="content"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-10">
                  <FormControl className="m-0 p-0">
                    <Input
                      className="text-black border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                      placeholder="what is the diameter of the sun"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              className="col-span-12 lg:col-span-2 w-full"
              disabled={isLoading}
              type="submit"
            >
              Submit
            </Button>
          </form>
        </Form>
      </div>
      <div className="space-y-4 py-8 mt-4 px-4 lg:px-8">
        {isLoading && (
          <div className="-8 rounded-lg w-full flex items-center justify-center bg-muted">
            <Loader />
          </div>
        )}
        <div className="flex flex-col-reverse gap-y-4">
          {analysis.map((message, idx) => (
            <div
              key={idx}
              className={cn(
                "p-8 w-full flex items-start gap-x-8 rounded-lg",
                message.role === "user"
                  ? "bg-white border border-black/10"
                  : "bg-muted"
              )}
            >
              {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
              <p className="text-sm">{message.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserInput;
