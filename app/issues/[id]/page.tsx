import React from "react";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import { IssuesBadge } from "@/app/components/IssuesBadge";
import Markdown from "react-markdown";

interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) {
    notFound();
  }

  return (
    <div>
      <Heading as="h2">{issue.title}</Heading>
      <Flex gap={"2"} my={"2"}>
        <IssuesBadge status={issue.status} />
        <Text>{issue.createdAt.toLocaleDateString("ru")}</Text>
      </Flex>
      <Card className="prose">
        <Markdown>{issue.description}</Markdown>
      </Card>
    </div>
  );
};

export default IssueDetailPage;
