"use client";

import { useCallback, useRef, useState } from "react";
import { Upload, FileText, X, AlertCircle } from "lucide-react";
import { formatFileSize, validateResumeFile } from "@/lib/resume-utils";

interface ResumeDropzoneProps {
  file: File | null;
  onFileChange: (file: File | null) => void;
  disabled?: boolean;
}

export function ResumeDropzone({ file, onFileChange, disabled }: ResumeDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = useCallback(
    (selected: File | null) => {
      if (!selected) {
        onFileChange(null);
        setError(null);
        return;
      }
      const validationError = validateResumeFile(selected);
      if (validationError) {
        setError(validationError);
        onFileChange(null);
        return;
      }
      setError(null);
      onFileChange(selected);
    },
    [onFileChange]
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      if (disabled) return;
      const dropped = e.dataTransfer.files?.[0];
      if (dropped) handleFile(dropped);
    },
    [disabled, handleFile]
  );

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-neutral-700">
          Resume
        </label>
        <span className="text-xs font-medium text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">
          Recommended
        </span>
      </div>
      <p className="text-xs text-neutral-500">Optional — PDF, DOC, or DOCX up to 5 MB</p>

      {!file ? (
        <div
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
          }}
          onClick={() => !disabled && inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            if (!disabled) setIsDragging(true);
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            setIsDragging(false);
          }}
          onDrop={onDrop}
          className={`relative flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-4 py-8 text-center transition-all cursor-pointer
            ${disabled ? "opacity-50 cursor-not-allowed" : "hover:border-orange-300 hover:bg-orange-50/50"}
            ${isDragging ? "border-orange-400 bg-orange-50 scale-[1.01]" : "border-neutral-200 bg-white"}
            ${error ? "border-red-300 bg-red-50/30" : ""}`}
        >
          <div className={`rounded-full p-3 ${isDragging ? "bg-orange-100" : "bg-neutral-100"}`}>
            <Upload className={`w-6 h-6 ${isDragging ? "text-orange-500" : "text-neutral-400"}`} />
          </div>
          <div>
            <p className="text-sm font-medium text-neutral-700">
              {isDragging ? "Drop your resume here" : "Drag & drop your resume"}
            </p>
            <p className="text-xs text-neutral-500 mt-1">
              or <span className="text-orange-600 font-medium">browse files</span>
            </p>
          </div>
          <input
            ref={inputRef}
            type="file"
            name="resume"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            className="hidden"
            disabled={disabled}
            onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
          />
        </div>
      ) : (
        <div className="flex items-center gap-3 rounded-xl border border-orange-200 bg-orange-50/50 px-4 py-3">
          <div className="rounded-lg bg-orange-100 p-2 shrink-0">
            <FileText className="w-5 h-5 text-orange-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-neutral-800 truncate">{file.name}</p>
            <p className="text-xs text-neutral-500">{formatFileSize(file.size)}</p>
          </div>
          <button
            type="button"
            onClick={() => {
              handleFile(null);
              if (inputRef.current) inputRef.current.value = "";
            }}
            disabled={disabled}
            className="shrink-0 rounded-lg p-1.5 text-neutral-400 hover:text-red-500 hover:bg-red-50 transition-colors"
            aria-label="Remove resume"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {error && (
        <p className="flex items-center gap-1.5 text-xs text-red-600">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}
