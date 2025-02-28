import React from "react";
import * as XLSX from "xlsx";

const ExportToExcel = React.forwardRef(({ fileName, type }, ref) => {
  const exportToCSV = () => {
    if (!ref.current) {
      console.error("Table reference is not defined");
      return;
    }

    const tableElement = ref.current.cloneNode(true);
    Array.from(tableElement.querySelectorAll("tr")).forEach((row) => {
      const cells = row.querySelectorAll("th, td");
      if (cells.length > 0) {
        const lastIndex = cells.length - 1;
        const thirdToLastIndex = cells.length - 3;
        const secondToLastIndex = cells.length - 2;

        row.removeChild(cells[lastIndex]);

        if (type === "course" && secondToLastIndex >= 0) {
          console.log("amit");

          row.removeChild(cells[secondToLastIndex]);
        }
      }
    });

    const worksheet = XLSX.utils.table_to_sheet(tableElement); // Convert the modified table to a sheet
    Object.keys(worksheet).forEach((cell) => {
      if (worksheet[cell].t === "n" && worksheet[cell].v > 999999999) {
        // If the cell contains a large number, convert it to a string
        worksheet[cell].v = `'${worksheet[cell].v}`; // Prefix with a single quote to keep it as text
        worksheet[cell].t = "s"; // Set cell type to string
      }
    });
    // Convert the worksheet to CSV
    const csv = XLSX.utils.sheet_to_csv(worksheet);

    // Create a blob from the CSV data
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `${fileName}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="form-group">
      <label>&nbsp;</label>
      <button
        className="Button"
        style={{
          textAlign: "center",
          display:"flex",
          justifyContent: "center",
          alignItems: "center",
          gap:"5px"
        }}
        onClick={exportToCSV}
      >
        <span className="download">
          <img src={require("../assets/images/export.png")} alt="" />
        </span>
        Download csv
      </button>
    </div>
  );
});

export default ExportToExcel;
