// src/utils/csvUtils.js
export const downloadCSV = (data, filename = "data.csv") => {
  if (!data || data.length === 0) {
    console.error("No data available to download.");
    return;
  }

  // Extract headers from the first object in the array
  const headers = Object.keys(data[0]);

  // Create CSV content
  const csvRows = [
    headers.join(","), // Header row
    ...data.map((row) =>
      headers
        .map((header) => JSON.stringify(row[header] || "")) // Handle missing values
        .join(",")
    ),
  ];

  const csvString = csvRows.join("\n");

  // Create a blob from the CSV string
  const blob = new Blob([csvString], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  // Create a hidden link to download the file
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
