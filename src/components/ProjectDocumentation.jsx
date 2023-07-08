import "../fonts/ReadexPro-bold";
import "../fonts/ReadexPro-normal";
import "../fonts/ReadexPro-Light-italic";
import { useState } from "react";
import jsPDF from "jspdf";
import axios from "axios";

const ProjectDocumentation = () => {
  const [projectName, setProjectName] = useState("");
  const [projectOverview, setProjectOverview] = useState("");
  const [hypothesis, setHypothesis] = useState("");
  const [resultAndAnalysis, setResultAndAnalysis] = useState("");
  const [conclusion, setConclusion] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const doc = new jsPDF(); // Creates a new instance of jsPDF

    const maxWidthInMm = 190; // Maximum width in millimeters
    const lineHeight = 5;
    const contentX = 10;
    let currentY = 60;

    function renderInitialSection(heading, text, maxWidthInMm, lineHeight) {
      const initialheadingY = 50; // Initial position for the heading
      let y = initialheadingY + 10;

      doc.setFont("ReadexPro", "normal").setFontSize(12);
      doc.text(heading, contentX, initialheadingY);

      doc.setFont("ReadexPro-Light", "italic").setFontSize(9);

      const lines = doc.splitTextToSize(text, maxWidthInMm);

      lines.forEach((line) => {
        doc.text(line, contentX, y);
        y += lineHeight;
      });
    }

    function renderTextInSection(body, y) {
      const lines = doc.splitTextToSize(body, maxWidthInMm);

      lines.forEach((line) => {
        doc.text(line, contentX, y);
        y += lineHeight;
      });
    }

    function renderSectionWithHeading(heading, body, previoustext) {
      const previousTextHeightInPoints = doc.getTextDimensions(previoustext).h;
      const lines = doc.splitTextToSize(previoustext, maxWidthInMm);
      const previousTextLines = lines.length;
      const headingY =
        previousTextHeightInPoints * 0.3528 * previousTextLines * 5; // Position the heading below the text
      const sectionSpacing = 30; // Adjust this value as desired for the spacing between sections

      doc.setFont("ReadexPro", "normal").setFontSize(12);
      doc.text(heading, contentX, currentY + headingY);

      doc.setFont("ReadexPro-Light", "italic").setFontSize(9);
      renderTextInSection(body, currentY + headingY + 10);

      const sectionHeight =
        doc.getTextDimensions(heading).h +
        doc.getTextDimensions(body).h +
        sectionSpacing;

      // Update the current vertical position for the next section
      currentY += sectionHeight;
    }

    // Centering the Project Name
    const docWidth = doc.internal.pageSize.getWidth();
    const fontSize = 30;
    const projectNameWidth =
      (doc.getStringUnitWidth(projectName) * fontSize) /
      doc.internal.scaleFactor;
    const startX = (docWidth - projectNameWidth) / 2; // Calculate the starting position to center align the text

    // Project Name Heading
    doc.setFontSize(fontSize);
    doc.addFont("ReadexPro-normal.ttf", "ReadexPro", "normal");
    doc.setFont("ReadexPro", "normal");
    doc.text(projectName, startX, 20); // Set the font size and align the text to center

    // Project Overview
    renderInitialSection(
      "Project Overview",
      projectOverview,
      maxWidthInMm,
      lineHeight
    );

    // Hypothesis
    renderSectionWithHeading("Hypothesis", hypothesis, projectOverview);

    // Result and Analysis
    renderSectionWithHeading(
      "Result and Analysis",
      resultAndAnalysis,
      hypothesis
    );

    // Conclusion
    renderSectionWithHeading("Conclusion", conclusion, resultAndAnalysis);

    if (event.target.name === "emailSubmit") {
      // Convert the jspdf document to a base64-encoded string
      const base64String = doc.output("datauristring").split(",")[1];

      const payload = {
        pdfData: base64String,
        email: userEmail,
      };

      // This section sends the PDF data to the backend using Axios
      axios
        .post("/api/send-pdf", payload)
        .then((response) => {
          console.log("PDF sent to backend successfully");
          console.log("Response data:", response.data); // Accessing response data
        })
        .catch((error) => {
          console.error("Error sending PDF to backend:", error);
        });
    } else {
      doc.save(`${projectName} - Project Report`);
    }
  };

  return (
    <>
      {/* This is the section where the user provides information about the project. */}
      <section>
        <form id="documentation" onSubmit={handleFormSubmit}>
          <div className="doc-inputs">
            {/* Project Name */}
            <label htmlFor="project-name">Project Name</label>
            <input
              id="project-name"
              className="input-text custom-textarea"
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
            {/* Project Overview */}
            <label htmlFor="project-overview">Overview</label>
            <textarea
              id="project-overview"
              className="input-text custom-textarea-lg"
              value={projectOverview}
              onChange={(e) => setProjectOverview(e.target.value)}
            />
            {/* Hypothesis */}
            <label htmlFor="hypothesis">Hypothesis</label>
            <textarea
              id="hypothesis"
              className="input-text custom-textarea-md"
              value={hypothesis}
              onChange={(e) => setHypothesis(e.target.value)}
            ></textarea>
            {/* Result and Analysis */}
            <label htmlFor="result-analysis">Result and Analysis</label>
            <textarea
              id="result-analysis"
              className="input-text custom-textarea-lg"
              value={resultAndAnalysis}
              onChange={(e) => setResultAndAnalysis(e.target.value)}
            ></textarea>
            {/* Conclusion */}
            <label htmlFor="conclusion">Conclusion</label>
            <textarea
              id="conclusion"
              className="input-text custom-textarea-lg"
              value={conclusion}
              onChange={(e) => setConclusion(e.target.value)}
            ></textarea>
          </div>
        </form>
      </section>
      {/* User's Email Input Email */}
      <div className="email-section">
        <form name="emailSubmit" onSubmit={handleFormSubmit}>
          <div className="email-checkbox">
            <label>
              <input
                type="checkbox"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.value)}
              />
              Do you want the PDF to be emailed directly to you?
            </label>
          </div>
          {isChecked && (
            <div>
              <input
                className="email-input"
                type="email"
                value={userEmail}
                placeholder="Enter your email"
                onChange={(e) => setUserEmail(e.target.value)}
              />

              <button className="email-btn" type="submit">
                Send
              </button>
            </div>
          )}
        </form>
      </div>
      {/* Download PDF */}
      <form onSubmit={handleFormSubmit}>
        <div className="download-section">
          <button className="download-btn" type="submit">
            Download
          </button>
        </div>
      </form>
    </>
  );
};
export default ProjectDocumentation;
