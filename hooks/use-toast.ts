// Copied from shadcn/ui toast component
import * as React from "react";
import { toast } from "sonner";

export function useToast() {
  return {
    toast,
    dismiss: toast.dismiss,
    error: (message: string) => toast.error(message),
    success: (message: string) => toast.success(message),
  };
}