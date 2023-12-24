import { Status } from "@prisma/client";
import { Badge } from "@radix-ui/themes";
import React from "react";

interface IssuesBadgeProps {
  status: Status;
}

const STATUS_MAP = new Map<
  Status,
  { label: string; color: "red" | "violet" | "green" }
>([
  [Status.OPEN, { label: "Open", color: "red" }],
  [Status.CLOSED, { label: "Closed", color: "green" }],
  [Status.IN_PROGRESS, { label: "In progress", color: "violet" }],
]);

export const IssuesBadge = ({ status }: IssuesBadgeProps) => {
  return (
    <Badge color={STATUS_MAP.get(status)?.color}>
      {STATUS_MAP.get(status)?.label}
    </Badge>
  );
};
