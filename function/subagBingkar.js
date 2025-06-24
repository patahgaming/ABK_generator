function dataBingkar(dateParam) { // Get current date in YYYY-MM-DD format
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
module.exports = { dataBingkar };