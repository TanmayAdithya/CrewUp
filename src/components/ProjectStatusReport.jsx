import "../fonts/ReadexPro-bold";
import "../fonts/ReadexPro-normal";
import "../fonts/ReadexPro-Light-italic";
import { useState } from "react";
import jsPDF from "jspdf";

const ProjectStatusReport = () => {
  // State variables for capturing form inputs and user preferences
  const [projectName, setProjectName] = useState("");
  const [reportDate, setReportDate] = useState("");
  const [projectObj, setProjectObj] = useState("");
  const [teamMembers, setTeamMembers] = useState("");
  const [milestonesAchieved, setMilestonesAchieved] = useState("");
  const [challenges, setChallenges] = useState("");
  const [tasksCompleted, setTasksCompleted] = useState("");
  const [tasksInProgress, setTasksInProgress] = useState("");
  const [pendingIssues, setPendingIssues] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  // Function to handle form submission
  const handleFormSubmit = (event) => {
    event.preventDefault();

    const doc = new jsPDF(); // Creates a new instance of jsPDF

    const maxWidthInMm = 190; // Maximum width of content in the document in millimeters
    const lineHeight = 5;
    const contentX = 10;
    let currentY = 60;
    let sectionSpacing = 30; // Distance between the sections in the document

    /*The `renderInitialSection` function creates the "Project Objective" section of the PDF 
    and establishes a reference point for positioning subsequent sections based on its content height. */
    function renderInitialSection(heading, text, maxWidthInMm, lineHeight) {
      const initialheadingY = 50; // Initial position for the heading
      let y = initialheadingY + 10; // Position of content from Y-axis i.e 10 millimeters

      doc.setFont("ReadexPro", "normal").setFontSize(12);
      doc.text(heading, contentX, initialheadingY);

      doc.setFont("ReadexPro-Light", "italic").setFontSize(9);

      const lines = doc.splitTextToSize(text, maxWidthInMm);

      lines.forEach((line) => {
        doc.text(line, contentX, y);
        y += lineHeight;
      });
    }

    /* The function splits the text into new lines when it reaches the maximum width of the page  */
    function renderTextInSection(body, y) {
      const lines = doc.splitTextToSize(body, maxWidthInMm);

      lines.forEach((line) => {
        doc.text(line, contentX, y);
        y += lineHeight;
      });
    }

    /* The function renders all other sections with their respective headings and content after the initial section, 
    positioning each section appropriately based on the previous text content. It calculates the height of the previous 
    text and uses it to position the heading of the current section below it */
    function renderSectionWithHeading(heading, body, previoustext) {
      const previousTextHeightInPoints = doc.getTextDimensions(previoustext).h;
      const lines = doc.splitTextToSize(previoustext, maxWidthInMm);
      const previousTextLines = lines.length;
      const headingY = previousTextHeightInPoints * 0.3528 * previousTextLines * 5; // Position the heading below the text

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

    // Render Report Date
    doc.setFontSize(10);
    doc.addFont("ReadexPro-normal.ttf", "ReadexPro", "normal");
    doc.setFont("ReadexPro", "normal");
    doc.text(`Report Date: ${reportDate}`, 10, 35);

    // Render Projective Objective
    renderInitialSection("Objective", projectObj, maxWidthInMm, lineHeight);

    // Render Team Members
    renderSectionWithHeading("Team Members", teamMembers, projectObj);

    // Render Milestones Achieved
    renderSectionWithHeading("Milestones Achieved", milestonesAchieved, teamMembers);

    // Render Challenges
    renderSectionWithHeading("Challenges", challenges, milestonesAchieved);

    // Render Tasks Completed
    renderSectionWithHeading("Tasks Completed", tasksCompleted, challenges);

    // Render Tasks In Progress
    renderSectionWithHeading("Tasks In Progress", tasksInProgress, tasksCompleted);

    // Render Pending Issues
    renderSectionWithHeading("Pending Issues", pendingIssues, tasksInProgress);

    // Handle email submission
    if (event.target.name === "emailSubmit") {
      const formData = new FormData();
      formData.append("Date", reportDate);
      formData.append("ProjectName", projectName);
      formData.append("Objective", projectObj);
      formData.append("Team", teamMembers);
      formData.append("MilestonesAchieved", milestonesAchieved);
      formData.append("Challenges", challenges);
      formData.append("TasksCompleted", tasksCompleted);
      formData.append("TasksInProgress", tasksInProgress);
      formData.append("PendingIssues", pendingIssues);
      formData.append("Email", userEmail);

      fetch(`https://crew-up-sooty.vercel.app/api/send-report`, {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error sending data to backend");
          }
          console.log("PDF sent to backend successfully");
          return response.json(); // Parse the response JSON
        })
        .then((data) => {
          console.log("Response data:", data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      doc.save(`${projectName} - Project Report`); // Download the PDF
    }
  };

  return (
    <>
      {/* This is the section where the user provides information about the project. */}
      <section>
        <form className="report">
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
              onChange={(e) => setMilestonesAchieved(e.target.value)}
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
              onChange={(e) => setTasksCompleted(e.target.value)}
            ></textarea>
            {/* Tasks In Progress */}
            <label htmlFor="tasks-in-progress">Tasks In Progress</label>
            <textarea
              id="tasks-in-progress"
              className="input-text custom-textarea-md"
              value={tasksInProgress}
              onChange={(e) => setTasksInProgress(e.target.value)}
            ></textarea>
            {/* Pending Issues */}
            <label htmlFor="pending-issues">Pending Issues</label>
            <textarea
              id="pending-issues"
              className="input-text custom-textarea-md"
              value={pendingIssues}
              onChange={(e) => setPendingIssues(e.target.value)}
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
              Do you want the details to be emailed directly to you?
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

export default ProjectStatusReport;
