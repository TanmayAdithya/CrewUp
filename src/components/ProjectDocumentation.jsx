import { useState } from "react";
import jsPDF from "jspdf";

const ProjectDocumentation = () => {
  const [projectName, setProjectName] = useState("");
  const [projectOverview, setProjectOverview] = useState("");
  const [hypothesis, setHypothesis] = useState("");
  const [resultAndAnalysis, setResultAndAnalysis] = useState("");
  const [conclusion, setConclusion] = useState("");

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const doc = new jsPDF(); // Creates a new instance of jsPDF

    // Centering the Project Name
    const docWidth = doc.internal.pageSize.getWidth();
    const fontSize = 32;
    const projectNameWidth =
      (doc.getStringUnitWidth(projectName) * fontSize) /
      doc.internal.scaleFactor;
    const startX = (docWidth - projectNameWidth) / 2; // Calculate the starting position to center align the text

    // Project Name Heading
    doc.setFontSize(fontSize);
    doc.addFont("ReadexPro-Medium-normal.ttf", "ReadexPro-Medium", "normal");
    doc.setFont("ReadexPro-Medium", "normal");
    doc.text(projectName, startX, 20); // Set the font size and align the text to center

    // Hypothesis
    doc.setFontSize(15);
    doc.addFont("ReadexPro-Medium-normal.ttf", "ReadexPro-Medium", "normal");
    doc.setFont("ReadexPro-Medium", "normal");
    doc.text("Hypothesis", 10, 40);
    doc.setFont("ReadexPro-Medium", "normal");
    doc.setFontSize(9);
    doc.text(hypothesis, 10, 50);

    // Result and Analysis
    doc.setFontSize(15);
    doc.setFont("ReadexPro-Medium", "normal");
    doc.text("Result and Analysis", 10, 70);
    doc.setFont("ReadexPro-Medium", "normal");
    doc.setFontSize(9);
    doc.text(resultAndAnalysis, 10, 80);

    // Conclusion
    doc.setFontSize(15);
    doc.setFont("ReadexPro-Medium", "normal");
    doc.text("Conclusion", 10, 100);
    doc.setFont("ReadexPro-Medium", "normal");
    doc.setFontSize(9);
    doc.text(conclusion, 10, 110);

    doc.save(`${projectName} - Documentation.pdf`);
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
            <div>
              <button id="download-btn" type="submit">
                Download
              </button>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};
export default ProjectDocumentation;
