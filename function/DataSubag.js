function dataBingkar(dateParam) {
const data = [
    [dateParam,"giat", "APEL DI MAKO POLRES", 3, 1, "-"],
    [dateParam,"dok", "MEMBUAT SPRINT TUGAS", 1, 3, "-"],
    [dateParam,"dok", "MENGUPDATE SIPK ONLINE", 1, 2, "-"],
    [dateParam,"dok", "ADMINISTRASI MENGENAI UKGB", 1, 2, "-"],
    [dateParam,"dok", "MENGUPDATE DATA PADA APLIKASI SIPP", 1, 2, "-"],
    [dateParam,"dok", "PELAKSANAAN ADMINISTRASI ASSESMEN", 1, 4, "-"],
    [dateParam,"dok", "melaksanakan administrasi pegawai polri dalam pembinaan karir meliputi usulan kenaikan pangkat & mutasi serta pengangkatan & pemberhentian dalam jabatan", 1, 3, "-"],
    [dateParam,"dok", "pembinaan karir personel meliputi mutasi , pengangkatan dan pemberentian dalam jabatan", 1, 3, "-"]
  ];
    return data;
}
function dataDalpres(dateParam) { // Get current date in YYYY-MM-DD format
const data = [
    [dateParam,"giat", "apel pagi", 3, 1, "-"],
    [dateParam,"giat", "olahraga pagi", 3, 1, "-"],
    [dateParam,"dok", "administrasi mengenai dikbangum sip,pag,stik,sespimma,sespimmen", 2, 4, "-"],
    [dateParam,"dok", "membuat ren kegiatan meningkatkan kemampuan", 1, 2, "-"],
    [dateParam,"dok", "mendatakan personel polres pelabuhan tanjung priok yang belum mengikuti dikjur", 1, 2, "-"],
    [dateParam,"dok", "mengupdate aplikasi abk subbagdalpres Bag SDM polres pelabuhan tanjung priok", 1, 2, "-"],
    [dateParam,"dok", "mendatakan personel polres pelabuhan tanjung priok yang sudah mengikuti dikjur", 1, 2, "-"],
    [dateParam,"dok", "mendatakan personel polres pelabuhan tanjung priok yang belum mengikuti pelatihan", 1, 1, "-"],
];
    return data;
}
module.exports = { dataDalpres , dataBingkar };