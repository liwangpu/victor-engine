const express = require('express');
const router = express.Router();
const path = require('path');
const AdmZip = require("adm-zip");

/* GET users listing. */
router.post('/upload', function (req, res, next) {
  console.log(`req:`, req.body.type);
  console.log(`upload doing:`, req.files.component);
  // const decompressPath = `./tmp/${req.body.type}`;
  const decompressPath = path.join(__dirname, 'tmp', req.body.type);
  console.log(`decompressPath:`, decompressPath);
  req.files.component.mv(decompressPath);
  const zip = new AdmZip(decompressPath);
  var zipEntries = zip.getEntries();
  console.log(`zipEntries:`, zipEntries);
  // zip.extractAllTo(`./custom-components/${req.body.type}`, /*overwrite*/ true);
  // console.log(`1:`,zip);
  res.send();
});

module.exports = router;