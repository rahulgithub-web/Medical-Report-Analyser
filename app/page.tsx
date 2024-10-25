"use client";

import { useState } from "react";
import { FileUploader } from "@/components/file-uploader";
import { ReportSummary } from "@/components/report-summary";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  const [summary, setSummary] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  return (
    <main className="min-h-screen p-4 md:p-8 bg-background">
      <nav className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Medical Report Analyzer</h1>
        <ThemeToggle />
      </nav>
      
      <div className="max-w-4xl mx-auto space-y-8">
        <FileUploader
          onAnalysisComplete={setSummary}
          onAnalyzing={setIsAnalyzing}
        />
        
        {(summary || isAnalyzing) && (
          <ReportSummary
            summary={summary}
            isLoading={isAnalyzing}
          />
        )}
      </div>
    </main>
  );
}