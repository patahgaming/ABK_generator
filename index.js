const express = require("express");
const fs = require("fs");
const path = require("path");
const XLSX = require("xlsx");
const generateGiat = require("./function/generate.js").generateGiat;
const pick5RandomNumbers = require("./function/generate.js").pick5RandomNumbers;
const dataBingkar = require("./function/subagBingkar.js").dataBingkar;
const dataDalpres = require("./function/subagDalpres.js").dataDalpres;
// const { console } = require("inspector");
// const pick5RandomNumbers = require("./function/picknum.js").pick5RandomNumbers;
const app = express();
const PORT = 3000;
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.sendFile("index.html", { root: path.join(__dirname, "Frontend") });
});
app.get("/test", (req, res) => {

});
app.post("/generate-excel/subag-bingkar/", (req, res) => {
  // console.log(pick5RandomNumbers());
  // Data Preset
  const dateParam = req.body.date;
  const data = generateGiat(dataBingkar(dateParam), pick5RandomNumbers(2, 7, 5),"Subag Bingkar");
  // console.log("Generating Excel for date: %s\n", dateParam);
  // const data = [
  //   ["Tanggal","Kategori", "Uraian", "Jumlah Giat", "Jumlah Waktu (per jam)", "Keterangan"],
  //   [dateParam,"giat", "APEL DI MAKO POLRES", 3, 1, "-"],//setiap hari apel pagi
  //   [dateParam,"dok", "MEMBUAT SPRINT TUGAS", 1, 3, "-"],
  //   [dateParam,"dok", "MENGUPDATE SIPK ONLINE", 1, 2, "-"],
  //   [dateParam,"dok", "ADMINISTRASI MENGENAI UKGB", 1, 2, "-"],
  //   [dateParam,"dok", "MENGUPDATE DATA PADA APLIKASI SIPP", 1, 2, "-"],
  //   [dateParam,"dok", "PELAKSANAAN ADMINISTRASI ASSESMEN", 1, 4, "-"],
  //   [dateParam,"dok", "melaksanakan administrasi pegawai polri dalam pembinaan karir meliputi usulan kenaikan pangkat & mutasi serta pengangkatan & pemberhentian dalam jabatan", 1, 3, "-"],
  //   [dateParam,"dok", "pembinaan karir personel meliputi mutasi , pengangkatan dan pemberentian dalam jabatan", 1, 3, "-"]
  // ];

  const worksheet = XLSX.utils.aoa_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Subag Bingkar");

  const filePath = path.join(__dirname, "Subag_Bingkar_"+dateParam+".xlsx");
  XLSX.writeFile(workbook, filePath);

  res.download(filePath, "Subag_Bingkar_"+dateParam+".xlsx", (err) => {
    if (err) console.error("Download error:", err);
    // Optional: hapus file setelah download
    fs.unlink(filePath, () => {});
  });
});

app.post("/generate-excel/subag-dalpres/", (req, res) => {
  // Data Preset
  const dateParam = req.body.date;
  // console.log("Generating Excel for date: %s\n", dateParam);
  const data = generateGiat(dataDalpres(dateParam), pick5RandomNumbers(2, 7, 5),"Subag Dalpres");
  // const data = [
  //   [dateParam,"Tanggal","Kategori", "Uraian", "Jumlah Giat", "Jumlah Waktu (per jam)", "Keterangan"],
  //   [dateParam,"giat", "APEL DI MAKO POLRES", 3, 1, "-"],
  //   [dateParam,"dok", "MEMBUAT SPRINT TUGAS", 1, 3, "-"],
  //   [dateParam,"dok", "MENGUPDATE SIPK ONLINE", 1, 2, "-"],
  //   [dateParam,"dok", "ADMINISTRASI MENGENAI UKGB", 1, 2, "-"],
  //   [dateParam,"dok", "MENGUPDATE DATA PADA APLIKASI SIPP", 1, 2, "-"],
  //   [dateParam,"dok", "PELAKSANAAN ADMINISTRASI ASSESMEN", 1, 4, "-"],
  //   [dateParam,"dok", "melaksanakan administrasi pegawai polri dalam pembinaan karir meliputi usulan kenaikan pangkat & mutasi serta pengangkatan & pemberhentian dalam jabatan", 1, 3, "-"],
  //   [dateParam,"dok", "pembinaan karir personel meliputi mutasi , pengangkatan dan pemberentian dalam jabatan", 1, 3, "-"]
  // ];

  const worksheet = XLSX.utils.aoa_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Subag dalpres");

  const filePath = path.join(__dirname, "Subag_dalpres_"+dateParam+".xlsx");
  XLSX.writeFile(workbook, filePath);

  res.download(filePath, "Subag_dalpres_"+dateParam+".xlsx", (err) => {
    if (err) console.error("Download error:", err);
    // Optional: hapus file setelah download
    fs.unlink(filePath, () => {});
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}`);
});
