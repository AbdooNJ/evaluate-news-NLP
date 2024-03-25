var path = require("path");
const dotenv = require("dotenv");
dotenv.config();
const bodyParser = require("body-parser");
const express = require("express");
const mockAPIResponse = require("./mockAPI.js");
const cors = require("cors");

const app = express();
const key1 = process.env.API_KEY;
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("dist"));
app.use(express.json());
console.log(__dirname);

app.get("/", function (req, res) {
  // res.sendFile("dist/index.html");
  res.sendFile(path.resolve("src/client/views/index.html"));
});

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
  console.log("Example app listening on port 8080!");
});

// app.get("/test", function (req, res) {
//   res.send(mockAPIResponse);
// });

app.post("/test", async function (req, res) {
  // get the input from the server
  const input_url = await req.body.name;
  console.log(input_url);
  let meaning_cloud_url = "https://api.meaningcloud.com/sentiment-2.1";
  const artVal = await valNews(input_url, key1, meaning_cloud_url);
  console.log(artVal);

  return res.send(artVal);
});

//
async function valNews(url, key, meaning_cloud_url) {
  return fetch(`${meaning_cloud_url}?key=${key}&url=${url}&lang=en`)
    .then((response) => response.json())
    .then((data) => {
      const code = data.status.code;

      const msg = {
        agreement: data.agreement,
        subjectivity: data.subjectivity,
        score_tag: data.score_tag,
        irony: data.irony,
      };

      if (code > 0) {
        return articleErrorHandler(code, "Should be an article URL!");
      }

      return { msg, code };
    })
    .catch((error) => console.error("Error:", error));
}

function articleErrorHandler(code, msg) {
  return { code, msg };
}
