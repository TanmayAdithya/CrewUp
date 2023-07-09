package main

import (
	"encoding/base64"
	"log"
	"net/http"
	"os"

	"github.com/sendgrid/sendgrid-go"
	"github.com/sendgrid/sendgrid-go/helpers/mail"
)

func sendPDF(w http.ResponseWriter, r *http.Request) {

	// Parse the request body and extract the base64-encoded PDF data and email
	pdfData := r.FormValue("pdfData")
	email := r.FormValue("email")

	// Create a new SendGrid message
	from := mail.NewEmail("CrewUp", "tanmay.marni@gmail.com")
	to := mail.NewEmail("Bestie", email)
	subject := "Your generated PDF"
	message := mail.NewSingleEmail(from, subject, to, "Sending you a pocketful of sunshine and a bundle of smiles. You're as magical as a unicorn and as lovely as a rainbow. May your day be filled with joy, laughter, and all things wonderful. Remember, you're absolutely purr-fect just the way you are! Meow-tastic!🌈😺. Oops! I almost forgot to mention, here's your PDF!", "")

	// Create an attachment with the base64-encoded PDF data
	attachment := mail.NewAttachment()
	attachment.SetContent(base64.StdEncoding.EncodeToString([]byte(pdfData)))
	attachment.SetType("application/pdf")
	attachment.SetFilename("attachment.pdf")
	attachment.SetDisposition("attachment")
	attachment.SetContentID("pdfAttachment")
	message.AddAttachment(attachment)

	// Send the email using the SendGrid API
	client := sendgrid.NewSendClient(os.Getenv("SENDGRID_API_KEY"))
	response, err := client.Send(message)
	if err != nil {
		log.Println("Error sending email:", err)
		http.Error(w, "Failed to send email", http.StatusInternalServerError)
		return
	}

	log.Println("Email sent successfully:", response.StatusCode)

	// Send a success response to the frontend
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("PDF sent successfully"))
}

func main() {
	http.HandleFunc("/api/send-pdf", sendPDF)

	log.Println("Server listening on port 5173")
	log.Fatal(http.ListenAndServe(":5173", nil))
}
