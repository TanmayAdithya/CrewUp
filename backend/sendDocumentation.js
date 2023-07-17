import express, { json } from "express";

import { setApiKey, send } from "@sendgrid/mail";

const app = express();

app.use(json());

app.post(
  `https://crew-up-sooty.vercel.app/api/send-documentation`,
  async (req, res) => {
    const {
      ProjectName: projectName,
      Overview: projectOverview,
      Hypothesis: hypothesis,
      ResultAndAnalysis: resultAndAnalysis,
      Conclusion: conclusion,
      Email: userEmail,
    } = req.body;

    try {
      // Set SendGrid API key
      setApiKey(process.env.SENDGRID_API_KEY);

      // SendGrid email message
      const msg = {
        to: userEmail, // Recipient email
        from: "tanmay.marni@gmail.com",
        subject:
          "Ding Ding! CrewUp Special Delivery: Your Document Soars to New Heights in Your Inbox!",
        html: `
        <html>
            <head>
              <strong>
                "Sending you a pocketful of sunshine and a bundle of smiles.
                You're as magical as a unicorn and as lovely as a rainbow. May
                your day be filled with joy, laughter, and all things wonderful.
                Remember, you're absolutely purr-fect just the way you are!
                Meow-tastic!🌈😺. Oops! I almost forgot to mention, here's the
                documentation for our epic project😎!"
              </strong>
              <meta charset="UTF-8" />
              <title>${projectName}</title>
            </head>
            <body>
              <h2>Project Overview</h2>
              <p>${projectOverview}</p>
              <br />
              <h2>Hypothesis</h2>
              <p>${hypothesis}</p>
              <br />
              <h2>Result And Analysis</h2>
              <p>${resultAndAnalysis}</p>
              <br />
              <h2>Conclusion</h2>
              <p>${conclusion}</p>
              <br />
            </body>
          </html>`,
      };

      // The code below is responsible for sending the email using SendGrid
      const response = await send(msg);

      console.log("Email sent successfully:", response);

      res.json({ message: "Email sent successfully" });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Error sending email" });
    }
  }
);
