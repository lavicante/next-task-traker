import { Button } from '@radix-ui/themes';
import Link from 'next/link';
import React from 'react'

export const IssueToolbar = () => {
  return (
    <div className="mb-5">
      <Button>
        <Link href={"/issues/new"}>New issue</Link>
      </Button>
    </div>
  );
}
