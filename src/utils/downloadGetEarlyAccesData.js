export const downloadCSV = (data, filename = "data.csv") => {
  if (!data || data.length === 0) {
    console.error("No data available to download.");
    return;
  }

  const headers = Object.keys(data[0]);

  const csvRows = [
    headers.join(","), 
    ...data.map((row) =>
      headers
        .map((header) => JSON.stringify(row[header] || "")) 
        .join(",")
    ),
  ];

  const csvString = csvRows.join("\n");

  const blob = new Blob([csvString], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
