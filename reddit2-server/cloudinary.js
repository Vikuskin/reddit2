require('dotenv').config();
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: "vikuskin",
  api_key: "168437557951257",
  api_secret: 'XWkyq-t7l7nMOScSVNK_skmDlmI',
});

module.exports = { cloudinary };