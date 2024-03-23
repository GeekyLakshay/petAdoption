import express, { json } from "express";
import axios from "axios";
import cors from "cors";
const app = express();
const port = 8000;

app.use(cors());
app.use(json());
app.post("/send-otp", async (req, res) => {
  const mobileNumber = req.body.mobileNumber;
  console.log(mobileNumber);
  const otp = Math.floor(100000 + Math.random() * 900000);
  const myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "App 8d2f7495d1b877fd352ec7040bc53311-bedfebc0-bdb3-4bde-aeff-797a814376b5"
  );
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Accept", "application/json");

  const raw = JSON.stringify({
    messages: [
      {
        destinations: [{ to: "919910196284" }],
        from: "ServiceSMS",
        text: "Hello,\n\nThis is a test message from Infobip. Have a nice day!",
      },
    ],
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("https://5yn29y.api.infobip.com/sms/2/text/advanced", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
});
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
