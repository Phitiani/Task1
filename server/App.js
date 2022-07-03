const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;
const rootPath = path.join(__dirname, "..", "client");
app.use(express.static(rootPath));

app.get("/", (req, res) => {
  res.sendFile(path.join(rootPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`App is up at port ${PORT}`);
});
