export const RESUME_MAX_BYTES = 5 * 1024 * 1024; // 5 MB

export const RESUME_ALLOWED_MIME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
] as const;

export const RESUME_ALLOWED_EXTENSIONS = [".pdf", ".doc", ".docx"];

export function validateResumeFile(file: File): string | null {
  const ext = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
  if (!RESUME_ALLOWED_EXTENSIONS.includes(ext)) {
    return "Resume must be a PDF, DOC, or DOCX file";
  }
  if (!RESUME_ALLOWED_MIME_TYPES.includes(file.type as (typeof RESUME_ALLOWED_MIME_TYPES)[number]) && file.type !== "") {
    return "Invalid resume file type. Use PDF, DOC, or DOCX";
  }
  if (file.size > RESUME_MAX_BYTES) {
    return "Resume must be 5 MB or smaller";
  }
  if (file.size === 0) {
    return "Resume file is empty";
  }
  return null;
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
