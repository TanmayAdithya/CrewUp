import express from "express";
import sendReportRouter from "./backend/sendReport";
import sendDocumentationRouter from "./backend/sendDocumentation";

const app = express();
app.use(express.json());

/* If only one of the defined routes receives the request, 
the corresponding router will handle it, and the other router will not be invoked.*/

app.use("https://crew-up-sooty.vercel.app/api/send-report", sendReportRouter);
app.use(
  "https://crew-up-sooty.vercel.app/api/send-documentation",
  sendDocumentationRouter
);
