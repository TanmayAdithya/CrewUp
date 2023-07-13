import express, { json } from "express";
import { setApiKey, send } from "@sendgrid/mail";

const app = express();

app.use(json());

app.post(
  `https://crew-up-sooty.vercel.app/api/send-report`,
  async (req, res) => {
    const {
      Date: reportDate,
      ProjectName: projectName,
      Objective: projectObj,
      Team: teamMembers,
      MilestonesAchieved: milestonesAchieved,
      Challenges: challenges,
      TasksCompleted: tasksCompleted,
      TasksInProgress: tasksInProgress,
      PendingIssues: pendingIssues,
      Email: userEmail,
    } = req.body;

    try {
      // Set SendGrid API key
      setApiKey(process.env.SENDGRID_API_KEY);

      // SendGrid email message
      const msg = {
        to: userEmail,
        from: "tanmay.marni@gmail.com",
        subject:
          "Ding Ding! CrewUp Special Delivery: Your Document Soars to New Heights in Your Inbox!",
        html: `
        <html>
          <head>
            <meta charset="UTF-8" />
            <title>${projectName}</title>
            <p>Date: ${reportDate}</p>
          </head>
          <body>
            <h2>Project Objective</h2>
            <p>${projectObj}</p>
            <br />
            <h2>Team Members</h2>
            <p>${teamMembers}</p>
            <br />
            <h2>Milestones Achieved</h2>
            <p>${milestonesAchieved}</p>
            <br />
            <h2>Challenges</h2>
            <p>${challenges}</p>
            <br />
            <h2>Tasks Completed</h2>
            <p>${tasksCompleted}</p>
            <br />
            <h2>Tasks In Progress</h2>
            <p>${tasksInProgress}</p>
            <br />
            <h2>Pending Issues</h2>
            <p>${pendingIssues}</p>
          </body>
        </html>
      `,
      };

      // The code below is responsible for sending the email using SendGrid
      const response = await send(msg);

      console.log("Email sent successfully:", response);

      res.json({ message: "Email sent successfully" });
    } catch (error) {
      console.error("Error sending email:", error); // Log the error message
      res.status(500).json({ error: "Error sending email" });
    }
  }
);
