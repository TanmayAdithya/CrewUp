import { useState } from "react";
import { jsPDF } from "jspdf";

function App() {
  const [projectName, setProjectName] = useState("");
  const [reportDate, setReportDate] = useState("");
  const [projectObj, setProjectObj] = useState("");
  const [teamMembers, setTeamMembers] = useState("");
  const [tasksRoles, setTasksRoles] = useState("");
  const handleFormSubmit = (event) => {
    event.preventDefault();

    const doc = new jsPDF();

    var docWidth = doc.internal.pageSize.getWidth();

    var projectNameWidth = doc.getTextWidth(projectName);
    var startX = (docWidth - projectNameWidth) / 2; // Calculate the starting position to center align the text
    const maxWidth = docWidth - 10; // Set the maximum width for the text

    // Project Name Heading
    doc.setFontSize(32);
    doc.setFont("helvetica", "bold");
    doc.text(projectName, startX, 20, { align: "center" }); // Set the font size and align the text to center

    // Report Date
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(`Report Date: ${reportDate}`, 10, 40);

    // Project Objective
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Objective", 10, 60);
    doc.setFont("helvetica", "normal");
    doc.text(projectObj, 10, 70, { maxWidth });

    // Team Members
    doc.setFont("helvetica", "bold");
    doc.text("Team Members", 10, 90);
    doc.setFont("helvetica", "normal");
    doc.text(teamMembers, 10, 100);

    // Tasks and Roles
    doc.setFont("helvetica", "bold");
    doc.text("Tasks & Roles", 10, 120);
    doc.setFont("helvetica", "normal");
    doc.text(tasksRoles, 10, 130);

    doc.save(`${projectName} - Project Report.pdf`);
  };

  return (
    <>
      <div id="container">
        {/* CrewUp Logo */}
        <img
          className="crewup-logo"
          src="https://i.postimg.cc/Ls7Tth4g/Crew-Up-Logo.png"
          alt="crewup-image"
        />
      </div>
      <div id="hero-text">
        {/* Main Heading/Hero Text */}
        <h1 id="heading">
          Say goodbye to the frustrations of miscommunication and disorganized
          efforts.
        </h1>
      </div>
      <div>
        {/* Main Sub-heading */}
        <h3 id="sub-heading">
          Create detailed documentation for your project, aiding its efficacy by
          setting objectives, assigning tasks, and tracking progress.
        </h3>
      </div>

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
            {/* Tasks and Roles */}
            <label htmlFor="tasks-roles">Tasks and Roles</label>
            <textarea
              id="tasks-roles"
              className="input-text custom-textarea-lg"
              value={tasksRoles}
              onChange={(e) => setTasksRoles(e.target.value)}
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
}

export default App;
