"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";

interface ReportSummaryProps {
  summary: string;
  isLoading: boolean;
}

export function ReportSummary({ summary, isLoading }: ReportSummaryProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedSummary, setEditedSummary] = useState(summary);

  if (isLoading) {
    return (
      <Card className="p-6 space-y-4">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-32 w-full" />
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Report Summary</h2>
        <Button
          variant="outline"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? "Save" : "Edit"}
        </Button>
      </div>

      {isEditing ? (
        <Textarea
          value={editedSummary}
          onChange={(e) => setEditedSummary(e.target.value)}
          className="min-h-[200px]"
        />
      ) : (
        <div className="prose dark:prose-invert max-w-none">
          {summary.split("\n").map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
      )}
    </Card>
  );
}