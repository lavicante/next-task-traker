import React from "react";
import { Button, Table, Badge } from "@radix-ui/themes";
import prisma from "@/prisma/client";
import { IssuesBadge } from "../components/IssuesBadge";
import delay from "delay";
import { IssueToolbar } from "./IssueToolbar";
import { Link } from "../components/Link";

const options: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
};

const IssuesPage = async () => {
  const issues = await prisma.issue.findMany();
  await delay(2000);

  console.log(111);
  return (
    <div>
      <IssueToolbar />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <div className="mb-1 md:mb-0">
                  <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                </div>
                <div className="block md:hidden">
                  <IssuesBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssuesBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toLocaleDateString("ru", options)}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export const dynamic = "force-dynamic";

export default IssuesPage;
