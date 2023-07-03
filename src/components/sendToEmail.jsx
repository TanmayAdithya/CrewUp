import axios from "axios";

export function handleSubmit(event) {
  event.preventDefault(); // Prevent the default form submission behavior

  const email = event.target.email.value; // Get the email value from the input field

  // Send the email address to the Go backend
  axios
    .post("/api/submit-email", { email })
    .then((response) => {
      // Handle the response from the Go backend
    })
    .catch((error) => {
      // Handle errors, if any
    });
}
