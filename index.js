const express = require("express");
const multiparty = require("multiparty");
const PORT = process.env.PORT || 5000;

const app = express();

app.get("/", (req, res) => res.send("I am working"));
app.post("/email", (req, res) => {
  let form = new multiparty.Form();

  form.parse(req, (err, fields, files) => {
    console.log(fields["stripped-html"][0]);
    res.send("Received");
  });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));
