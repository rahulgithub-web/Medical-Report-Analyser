"use client";

import { useState } from "react";
import { Upload } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { analyzeReport } from "@/lib/gemini";

interface FileUploaderProps {
  onAnalysisComplete: (summary: string) => void;
  onAnalyzing: (isAnalyzing: boolean) => void;
}

export function FileUploader({ onAnalysisComplete, onAnalyzing }: FileUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    const validTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(selectedFile.type)) {
      toast({
        variant: "destructive",
        title: "Invalid file type",
        description: "Please upload a PDF, JPEG, PNG, or WebP file.",
      });
      return;
    }

    setFile(selectedFile);
  };

  const handleAnalyze = async () => {
    if (!file) return;

    try {
      onAnalyzing(true);
      const reader = new FileReader();
      
      reader.onload = async (e) => {
        const content = e.target?.result as string;
        const summary = await analyzeReport(content);
        onAnalysisComplete(summary);
      };

      reader.readAsText(file);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Analysis failed",
        description: "Failed to analyze the report. Please try again.",
      });
    } finally {
      onAnalyzing(false);
    }
  };

  return (
    <Card className="p-6">
      <div className="flex flex-col items-center gap-4">
        <label
          htmlFor="file-upload"
          className="w-full max-w-xs p-4 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary/50 transition-colors"
        >
          <div className="flex flex-col items-center gap-2">
            <Upload className="w-8 h-8 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {file ? file.name : "Upload medical report"}
            </span>
          </div>
          <input
            id="file-upload"
            type="file"
            className="hidden"
            accept=".pdf,.jpg,.jpeg,.png,.webp"
            onChange={handleFileChange}
          />
        </label>

        <Button
          onClick={handleAnalyze}
          disabled={!file}
          className="w-full max-w-xs"
        >
          Analyze Report
        </Button>
      </div>
    </Card>
  );
}