const express = require("express");
const multiparty = require("multiparty");
const PORT = process.env.PORT || 5000;

const app = express();

// app.use(express.urlencoded({ extended: true, limit: "20 MB" }));

app.get("/", (req, res) => res.send("I am working"));
app.post("/email", (req, res) => {
  console.log(req.headers["content-type"]);
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
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));
