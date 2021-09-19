const express = require("express");

const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get("/", (req, res) => {
  res.json({message: "Welcome"});
})

require("./routes/webhook.routes")(app);

// Constants
const PORT = process.env.PORT || 8080;
const HOST = '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
})
