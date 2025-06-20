const express = require("express");
const XLSX = require("xlsx");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.get("/generate-excel/subag-bingkar/:date", (req, res) => {
  // Data Preset
  const dateParam = req.params.date;
  const data = [
    ["Tanggal","Kategori", "Uraian", "Jumlah Giat", "Jumlah Waktu (per jam)", "Keterangan"],
    [dateParam,"giat", "APEL DI MAKO POLRES", 3, 1, "-"],
    [dateParam,"dok", "MEMBUAT SPRINT TUGAS", 1, 3, "-"],
    [dateParam,"dok", "MENGUPDATE SIPK ONLINE", 1, 2, "-"],
    [dateParam,"dok", "ADMINISTRASI MENGENAI UKGB", 1, 2, "-"],
    [dateParam,"dok", "MENGUPDATE DATA PADA APLIKASI SIPP", 1, 2, "-"],
    [dateParam,"giat", "APEL DI MAKO POLRES", 1, 3, "-"],
    [dateParam,"dok", "PELAKSANAAN ADMINISTRASI ASSESMEN", 1, 4, "-"],
    [dateParam,"dok", "melaksanakan administrasi pegawai polri dalam pembinaan karir meliputi usulan kenaikan pangkat & mutasi serta pengangkatan & pemberhentian dalam jabatan", 1, 3, "-"],
    [dateParam,"dok", "MEMBUAT SPRINT TUGAS", 1, 3, "-"],
    [dateParam,"dok", "pembinaan karir personel meliputi mutasi , pengangkatan dan pemberentian dalam jabatan", 1, 3, "-"]
  ];

  const worksheet = XLSX.utils.aoa_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Subag Bingkar");

  const filePath = path.join(__dirname, "Subag_Bingkar_Auto.xlsx");
  XLSX.writeFile(workbook, filePath);

  res.download(filePath, "Subag_Bingkar_Auto.xlsx", (err) => {
    if (err) console.error("Download error:", err);
    // Optional: hapus file setelah download
    fs.unlink(filePath, () => {});
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}`);
});
