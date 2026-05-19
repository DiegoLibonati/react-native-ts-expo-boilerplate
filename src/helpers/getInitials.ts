export const getInitials = (fullName: string, maxLength = 2): string => {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);

  if (parts.length === 0) return "";

  return parts
    .slice(0, maxLength)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
};
