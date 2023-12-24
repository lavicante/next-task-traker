"use client";

import "easymde/dist/easymde.min.css";
import { TextField, Button, Callout, Text } from "@radix-ui/themes";
import React, { useState } from "react";

import dynamic from "next/dynamic";
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { MdErrorOutline } from "react-icons/md";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createIssueSchema } from "@/app/createIssueSchema";
import { ErrorMessage } from "@/app/components/ErrorMessage";
import { Spinner } from "@/app/components/Spinner";

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSend = async (data: IssueForm) => {
    try {
      setLoading(true);
      await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (error) {
      setError("Error!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Icon>
            <MdErrorOutline />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form onSubmit={handleSubmit(handleSend)} className="space-y-3">
        <TextField.Root>
          <TextField.Input placeholder="Title" {...register("title")} />
        </TextField.Root>

        <ErrorMessage>{errors.title?.message}</ErrorMessage>

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={loading} className="cursor-pointer">
          Submit new issue
          {loading && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
