"use client";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
type Props = {
  orders: any[];
};
export default function ExportButtons({ orders }: Props) {
 const exportPDF = () => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Shazify Sales Report", 14, 20);

  const tableData = orders.map((order) => [
    order.email,
    order.totalItems,
    `$${order.totalPrice}`,
    order.status,
  ]);

  autoTable(doc, {
    head: [
      ["Customer", "Items", "Total", "Status"]
    ],
    body: tableData,
    startY: 30,
  });

  doc.save("Shazify-Sales-Report.pdf");
};
const exportExcel = () => {

  const excelData = orders.map((order) => ({
    Customer: order.email,
    Items: order.totalItems,
    Total: order.totalPrice,
    Status: order.status,
  }));

  const worksheet = XLSX.utils.json_to_sheet(excelData);

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Orders"
  );

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const file = new Blob(
    [excelBuffer],
    {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    }
  );

  saveAs(
    file,
    "Shazify-Sales-Report.xlsx"
  );
};

  return (
    <div className="flex gap-4 mt-8">

      <button
        onClick={exportPDF}
        className="bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700"
      >
        📄 Export PDF
      </button>

      <button
       onClick={exportExcel}
        className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700"
      >
        📊 Export Excel
      </button>

    </div>
  );
}