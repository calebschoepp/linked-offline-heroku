const express = require("express");
const multiparty = require("multiparty");
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.urlencoded({ extended: true, limit: "20 MB" }));

app.get("/", (req, res) => res.send("I am working"));
app.post("/email", (req, res) => {
  console.log(`Parsing req with content-type ${req.headers["content-type"]}`);
  if (req.is("application/x-www-form-urlencoded")) {
    handleEncodedEmail(req, res);
  } else if (req.is("multipart/form-data")) {
    handleMultipartEmail(req, res);
  } else {
    res.status(415);
    res.send("Unsupported content-type");
  }
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));

function handleEncodedEmail(req, res) {
  console.log(req.body);
  res.send("Received");
}

function handleMultipartEmail(req, res) {
  let form = new multiparty.Form({ maxFieldsSize: 6e6 });

  form.parse(req, (err, fields, files) => {
    console.log(err);
    try {
      console.log(fields["body-html"][0]);
    } catch (e) {
      console.log(e);
    }
    try {
      console.log(fields["stripped-html"][0]);
    } catch (e) {
      console.log(e);
    }
    res.send("Received");
  });
}
