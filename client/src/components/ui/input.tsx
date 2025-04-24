import * as React from "react";

import { cn } from "@/lib/utils";
import { File } from "lucide-react";
import CustomProgressBar from "../custom/CustomProgressBar";

interface FileUploadInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  readonly uploadProgress?: number;
  readonly showUploadProgress?: boolean;
  readonly isDisabled?: boolean
}

const Input = React.forwardRef<HTMLInputElement, FileUploadInputProps>(
  (
    {
      className,
      type,
      uploadProgress = 0,
      showUploadProgress = false,
      onChange,
      isDisabled=false,
      ...props
    },
    ref
  ) => {
    const fileInputRef = React.useRef<HTMLInputElement | null>(null);

    React.useEffect(() => {
      if (!showUploadProgress) {
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    }, [showUploadProgress]);
    return (
      <div className="relative h-9">
        <input
          ref={ref || fileInputRef}
          type={type}
          data-slot="input"
          onChange={onChange}
          disabled={isDisabled}
          className={cn(
            "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
            className
          )}
          {...props}
        />
        {type === "file" && (
          <>
            <File className="w-5 h-5 absolute z-30 bottom-[50%] top-[50%] translate-y-[-50%] right-1.5" />
            {showUploadProgress && (
              <div>
                <CustomProgressBar value={uploadProgress} />
              </div>
            )}
          </>
        )}
      </div>
    );
  }
);

export { Input };
