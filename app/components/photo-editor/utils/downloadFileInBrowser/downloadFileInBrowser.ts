export const downloadFileInBrowser = (
  data: any,
  filename: string,
  mimeType = 'application/json'
) => {
  const blob = new Blob([data], { type: mimeType });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();

  URL.revokeObjectURL(url);
};
