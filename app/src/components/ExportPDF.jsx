import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { motion } from "framer-motion";

const ExportPDF = ({ data, columns, fileName }) => {
  const handleExport = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text(fileName || "Exported Table", 14, 20);

    autoTable(doc, {
      head: [columns],
      body: data.map((row) => columns.map((col) => row[col])),
      startY: 30,
      styles: {
        font: "helvetica",
        fontSize: 12,
        textColor: "#333",
        lineColor: "#ddd",
        lineWidth: 0.5,
      },
      headStyles: {
        fillColor: "#4CAF50",
        textColor: "#fff",
        fontSize: 14,
        halign: "center",
      },
      bodyStyles: {
        halign: "center",
      },
      alternateRowStyles: {
        fillColor: "#f3f3f3",
      },
    });

    doc.save(`${fileName || "table"}.pdf`);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05, cursor: "pointer" }}
      className="p-2 rounded border border-green-500 text-green-500 hover:bg-green-500 hover:text-white shadow-lg"
      onClick={handleExport}
    >
      Exportar PDF
    </motion.button>
  );
};

export default ExportPDF;
