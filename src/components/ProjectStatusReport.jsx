import { useState } from "react";
import jsPDF from "jspdf";
import "../fonts/ReadexPro-bold";
import "../fonts/ReadexPro-normal";
import "../fonts/ReadexPro-Light-italic";

const ProjectStatusReport = () => {
  const [projectName, setProjectName] = useState("");
  const [reportDate, setReportDate] = useState("");
  const [projectObj, setProjectObj] = useState("");
  const [teamMembers, setTeamMembers] = useState("");
  const [milestonesAchieved, setmilestonesAchieved] = useState("");
  const [challenges, setChallenges] = useState("");
  const [tasksCompleted, settasksCompleted] = useState("");
  const [tasksInProgress, settasksInProgress] = useState("");
  const [pendingIssues, setpendingIssues] = useState("");

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
    doc.addFont("ReadexPro-bold.ttf", "ReadexPro", "bold");
    doc.setFont("ReadexPro", "bold");
    doc.text(projectName, startX, 20); // Set the font size and align the text to center

    // Report Date
    doc.setFontSize(10);
    doc.addFont("ReadexPro-normal.ttf", "ReadexPro", "normal");
    doc.setFont("ReadexPro", "normal");
    doc.text(`Report Date: ${reportDate}`, 10, 35);

    // Projective Objective
    renderInitialSection("Objective", projectObj, maxWidthInMm, lineHeight);

    // Team Members
    renderSectionWithHeading("Team Members", teamMembers, projectObj);

    // Milestones Achieved
    renderSectionWithHeading(
      "Milestones Achieved",
      milestonesAchieved,
      teamMembers
    );

    // Challenges
    renderSectionWithHeading("Challenges", challenges, milestonesAchieved);

    // Tasks Completed
    renderSectionWithHeading("Tasks Completed", tasksCompleted, challenges);

    // Tasks In Progress
    renderSectionWithHeading(
      "Tasks In Progress",
      tasksInProgress,
      tasksCompleted
    );

    // Pending Issues
    renderSectionWithHeading("Pending Issues", pendingIssues, tasksInProgress);

    doc.save(`${projectName} - Project Report.pdf`);
  };

  return (
    <>
      {/* This is the section where the user provides information about the project. */}
      <section>
        <form id="report" onSubmit={handleFormSubmit}>
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
            {/* Report Date */}
            <label htmlFor="dateInput">Report Date</label>
            <input
              type="date"
              id="dateInput"
              value={reportDate}
              onChange={(e) => setReportDate(e.target.value)}
              name="dateInput"
            />
            {/* Project Objective */}
            <label htmlFor="project-obj">Objective</label>
            <textarea
              id="project-obj"
              className="input-text custom-textarea-lg"
              value={projectObj}
              onChange={(e) => setProjectObj(e.target.value)}
            />
            {/* Team Members */}
            <label htmlFor="team-members">Team Members</label>
            <textarea
              id="team-members"
              className="input-text custom-textarea-md"
              value={teamMembers}
              onChange={(e) => setTeamMembers(e.target.value)}
            ></textarea>
            {/* Milestones Achieved */}
            <label htmlFor="milestones">Milestones Achieved</label>
            <textarea
              id="milestones"
              className="input-text custom-textarea-lg"
              value={milestonesAchieved}
              onChange={(e) => setmilestonesAchieved(e.target.value)}
            ></textarea>
            {/* Challenges */}
            <label htmlFor="challenges">Challenges</label>
            <textarea
              id="challenges"
              className="input-text custom-textarea-lg"
              value={challenges}
              onChange={(e) => setChallenges(e.target.value)}
            ></textarea>
            {/* Tasks Completed */}
            <label htmlFor="tasks-completed">Tasks Completed</label>
            <textarea
              id="tasks-completed"
              className="input-text custom-textarea-md"
              value={tasksCompleted}
              onChange={(e) => settasksCompleted(e.target.value)}
            ></textarea>
            {/* Tasks In Progress */}
            <label htmlFor="tasks-in-progress">Tasks In Progress</label>
            <textarea
              id="tasks-in-progress"
              className="input-text custom-textarea-md"
              value={tasksInProgress}
              onChange={(e) => settasksInProgress(e.target.value)}
            ></textarea>
            {/* Pending Issues */}
            <label htmlFor="pending-issues">Pending Issues</label>
            <textarea
              id="pending-issues"
              className="input-text custom-textarea-md"
              value={pendingIssues}
              onChange={(e) => setpendingIssues(e.target.value)}
            ></textarea>
            <div>
              <button className="download-btn" type="submit">
                Download
              </button>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default ProjectStatusReport;
