export default function handler(req, res) {
  // load the json file
  const data = require("./data.json");

  res.status(200).json(data);
}
