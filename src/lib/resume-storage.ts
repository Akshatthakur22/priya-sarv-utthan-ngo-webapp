import {
  RESUME_ALLOWED_EXTENSIONS,
  RESUME_MAX_BYTES,
} from "./resume-utils";

export type ResumeFile = {
  filename: string;
  mimeType: string;
  data: Buffer;
};

function guessMimeType(ext: string): string {
  switch (ext) {
    case ".pdf":
      return "application/pdf";
    case ".doc":
      return "application/msword";
    case ".docx":
      return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    default:
      return "application/octet-stream";
  }
}

export async function parseResumeFromFormData(formData: FormData): Promise<ResumeFile | undefined> {
  const file = formData.get("resume");
  if (!file || !(file instanceof File) || file.size === 0) {
    return undefined;
  }

  const ext = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
  if (!RESUME_ALLOWED_EXTENSIONS.includes(ext)) {
    throw new Error("Resume must be a PDF, DOC, or DOCX file");
  }
  if (file.size > RESUME_MAX_BYTES) {
    throw new Error("Resume must be 5 MB or smaller");
  }

  const arrayBuffer = await file.arrayBuffer();
  const data = Buffer.from(arrayBuffer);

  return {
    filename: file.name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 255),
    mimeType: file.type || guessMimeType(ext),
    data,
  };
}
