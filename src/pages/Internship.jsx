import React, { useState } from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Selection,
  Inject,
  Toolbar,
  Sort,
  Filter,
} from "@syncfusion/ej2-react-grids";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { InternshipData, InternshipGrid } from "../data/dummy";
import { Header } from "../components";
import axios from "axios";

const Internship = () => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]); // Current date
  const [refNo, setRefNo] = useState(
    `REF-${Math.floor(Math.random() * 100000)}`
  ); // Unique reference number
  const [data, setData] = useState(InternshipData); // State to manage data

  const selectionSettings = { persistSelection: true };
  const toolbarOptions = ["Delete"];
  const editing = { allowDeleting: true, allowEditing: true };

  // Handle row selection
  const handleRowSelect = (args) => {
    setSelectedStudent(args.data);
    setRefNo(`REF-${Math.floor(Math.random() * 100000)}`); // Regenerate reference number
  };

  // Handle toolbar click
  const handleToolbarClick = (args) => {
    if (args.item.id === "Grid_delete") {
      deleteSelectedStudent();
    }
  };

  // Delete selected student
  const deleteSelectedStudent = () => {
    if (selectedStudent) {
      const updatedData = data.filter(
        (student) => student.CustomerID !== selectedStudent.CustomerID
      );
      setData(updatedData);
      setSelectedStudent(null);
    } else {
      alert("Please select a student to delete!");
    }
  };

  // Generate Offer Letter PDF
  const generatePDF = async () => {
    if (!selectedStudent) {
      alert("Please select a student!");
      return null;
    }

    // Update the offer letter content
    const offerLetter = document.getElementById("offer-letter");
    offerLetter.querySelector(".date").textContent = `Date: ${date}`;
    offerLetter.querySelector(".ref-no").textContent = `Ref. No.: ${refNo}`;
    offerLetter.querySelector(
      ".to-name"
    ).textContent = `To: ${selectedStudent.CustomerName}`;

    // Capture the image with updated text
    const canvas = await html2canvas(offerLetter);
    const imgData = canvas.toDataURL("image/jpeg");

    const doc = new jsPDF();
    doc.addImage(imgData, "JPEG", 10, 10, 180, 160);

    const pdfBlob = doc.output("blob");
    saveAs(pdfBlob, `OfferLetter_${selectedStudent.CustomerName}.pdf`);
    return pdfBlob;
  };

  // Send Email with PDF
  const sendEmail = async () => {
    const pdfBlob = await generatePDF();
    if (!pdfBlob || !selectedStudent) return;

    const formData = new FormData();
    formData.append("to", selectedStudent.CustomerEmail);
    formData.append("subject", "Your Internship Offer Letter");
    formData.append(
      "text",
      `Dear ${selectedStudent.CustomerName},\n\nPlease find your offer letter attached.`
    );
    formData.append(
      "file",
      new File([pdfBlob], `OfferLetter_${selectedStudent.CustomerName}.pdf`)
    );

    try {
      await axios.post("/api/send-email", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Offer letter sent successfully!");
    } catch (error) {
      alert("Error sending email:", error.message);
    }
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Internship Details" />
      <GridComponent
        dataSource={data}
        allowPaging
        pageSettings={{ pageCount: 5 }}
        selectionSettings={selectionSettings}
        toolbar={toolbarOptions}
        editSettings={editing}
        allowSorting
        rowSelected={handleRowSelect}
        toolbarClick={handleToolbarClick}
      >
        <ColumnsDirective>
          {InternshipGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject services={[Page, Selection, Toolbar, Sort, Filter]} />
      </GridComponent>

      <div className="mt-5">
        <h3 className="text-xl font-semibold">Generate Offer Letter</h3>
        <div className="flex items-center space-x-4 mt-2">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border p-2 rounded"
          />
          <button
            onClick={generatePDF}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Generate PDF
          </button>
          <button
            onClick={sendEmail}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Send Email
          </button>
        </div>
      </div>

      <div id="offer-letter" style={{ display: "none", position: "relative" }}>
        <img src="/image/offerletter.jpg" alt="Offer Letter" />
        <div style={{ position: "absolute", top: "50px", left: "50px" }}>
          <p className="date">Date: {date}</p>
          <p className="ref-no">Ref. No.: {refNo}</p>
          <p className="to-name">To: {selectedStudent?.CustomerName}</p>
        </div>
      </div>
    </div>
  );
};

export default Internship;
