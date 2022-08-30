import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import html2canvas from "html2canvas";
export const createPDF = async (id) => {
  window.html2canvas = html2canvas;
  var doc = new jsPDF({
    unit: "pt",
    orientation: "p",
    format: [1902, 820],
  });
  // add custom font to file
  doc.addFont("ConsolasHex.ttf", "ConsolasHex", "Bold");
  doc.setFont("ConsolasHex", "Bold");
  doc.text(35, 25, "Text with the letter Š");
  doc.setFontSize(12);
  autoTable(doc, {
    html: `exportDagta`,
    theme: "grid",

    margin: {
      left: 3,
      right: 1.5,
      top: 1.5,
      bottom: 7,
    },
  });
  var content = document.getElementById("exportDagta");
  doc.html(content, {
    callback: function (doc) {
      doc.save();
    },
  });
};
