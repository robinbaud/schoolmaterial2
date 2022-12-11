const axios = require("axios");
let i;
async function getstudent() {
  let res = await axios.get("http://vps-a47222b1.vps.ovh.net:4242/Student");
  return res.data;
}

module.exports = getstudent;
