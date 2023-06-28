import { useState } from "react";
import jsPDF from "jspdf";

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

    // Report Date
    doc.setFontSize(10);
    doc.addFont("ReadexPro-Medium-normal.ttf", "ReadexPro-Medium", "normal");
    doc.setFont("ReadexPro-Medium", "normal");
    doc.text(`Report Date: ${reportDate}`, 10, 40);

    // Project Objective
    doc.setFontSize(15);
    doc.addFont("ReadexPro-Medium-normal.ttf", "ReadexPro-Medium", "normal");
    doc.setFont("ReadexPro-Medium", "normal");
    doc.text("Objective", 10, 60);
    doc.setFont("ReadexPro-Medium", "normal");
    doc.setFontSize(12);
    doc.text(projectObj, 10, 70);

    // Team Members
    doc.setFontSize(15);
    doc.setFont("ReadexPro-Medium", "normal");
    doc.text("Team Members", 10, 90);
    doc.setFont("ReadexPro-Medium", "normal");
    doc.setFontSize(12);
    doc.text(teamMembers, 10, 100);

    // Milestones Achieved
    doc.setFontSize(15);
    doc.setFont("ReadexPro-Medium", "normal");
    doc.text("Milestones Achieved", 10, 120);
    doc.setFont("ReadexPro-Medium", "normal");
    doc.setFontSize(12);
    doc.text(milestonesAchieved, 10, 130);

    // Challenges
    doc.setFontSize(15);
    doc.setFont("ReadexPro-Medium", "normal");
    doc.text("Challenges", 10, 150);
    doc.setFont("ReadexPro-Medium", "normal");
    doc.setFontSize(12);
    doc.text(challenges, 10, 160);

    // Tasks Completed
    doc.setFontSize(15);
    doc.setFont("ReadexPro-Medium", "normal");
    doc.text("Tasks Completed", 10, 180);
    doc.setFont("ReadexPro-Medium", "normal");
    doc.setFontSize(12);
    doc.text(tasksCompleted, 10, 190);

    // Tasks In Progress
    doc.setFontSize(15);
    doc.setFont("ReadexPro-Medium", "normal");
    doc.text("Tasks In Progress", 10, 210);
    doc.setFont("ReadexPro-Medium", "normal");
    doc.setFontSize(12);
    doc.text(tasksInProgress, 10, 220);

    // Pending Issues
    doc.setFontSize(15);
    doc.setFont("ReadexPro-Medium", "normal");
    doc.text("Pending Issues", 10, 240);
    doc.setFont("ReadexPro-Medium", "normal");
    doc.setFontSize(12);
    doc.text(pendingIssues, 10, 250);

    doc.save(`${projectName} - Project Report.pdf`);
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

export default ProjectStatusReport;
