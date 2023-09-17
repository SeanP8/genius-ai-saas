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
} from "./ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "./ui/button";

const formSchema = z.object({
  content: z.string().min(2, {
    message: "Statement must be at least 2 characters",
  }),
});

const UserInput = () => {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [analysis, setAnalysis] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  const messageData = [
    { role: "user", content: value },
    {
      role: "bot",
      content: analysis,
    },
  ];

  console.log("messageData ", messageData);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    let user = values.content;
    console.log("user form user --==-- ", user);
    setValue(user);

    try {
      const data = await createNewEntry(values.content);
      let bot = data.conversation;

      console.log("userinput bot data -- ", bot);

      setAnalysis(bot);
    } catch (error: any) {
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full p-4 px-3 grid grid-cols-12 gap-2"
          >
            <FormField
              name="content"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-10">
                  <FormControl className="m-0 p-0">
                    <Input
                      className="text-black border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                      placeholder="what is the diameter of the sun"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button className="col-span-12 lg:col-span-2 w-full" type="submit">
              Submit
            </Button>
          </form>
        </Form>
      </div>
      {messageData.map((message, idx) => (
        <div
          key={idx}
          className={cn(
            "p-8 w-full flex items-start gap-x-8 rounded-lg",
            message.role === "user" ? "user" : "bot"
          )}
        >
          {message.content}
        </div>
      ))}
    </div>
  );
};

export default UserInput;
