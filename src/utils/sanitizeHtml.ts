import DOMPurify from "dompurify";

export const sanitizeHtml = (dirtyHtml: string): string => {
  if (!dirtyHtml) return "";
  return DOMPurify.sanitize(dirtyHtml);
};
