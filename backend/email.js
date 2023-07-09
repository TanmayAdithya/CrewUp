import express, { json } from "express";
import { setApiKey, send } from "@sendgrid/mail";

const app = express();

app.use(json());

app.post("/api/send-pdf", async (req, res) => {
  const { email, pdfData } = req.body;

  try {
    // Set SendGrid API key
    setApiKey(process.env.SENDGRID_API_KEY);

    // Create the SendGrid email message
    const msg = {
      to: email, // Recipient/User email
      from: "tanmay.marni@gmail.com", // Change to your verified sender
      subject:
        "Ding Ding! CrewUp Special Delivery: Your Document Soars to New Heights in Your Inbox!",
      html: (
        <strong>
          "Sending you a pocketful of sunshine and a bundle of smiles. You're as
          magical as a unicorn and as lovely as a rainbow. May your day be
          filled with joy, laughter, and all things wonderful. Remember, you're
          absolutely purr-fect just the way you are! Meow-tastic!🌈😺. Oops! I
          almost forgot to mention, here's your PDF!"
        </strong>
      ),
      attachments: [
        {
          content: pdfData, // Replace pdfData with the actual PDF data (byte array or base64-encoded string)
          filename: projectName + "Status Report",
          type: "application/pdf",
          disposition: "attachment",
        },
      ],
    };

    // Send the email using SendGrid
    const response = await send(msg);

    console.log("Email sent successfully:", response);

    res.json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Error sending email" });
  }
});

app.listen(5173, () => {
  console.log("Server is running on port 5173");
});
