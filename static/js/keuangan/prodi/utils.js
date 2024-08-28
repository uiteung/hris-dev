export function ConvertJenisPrimbon(jenis) {
    if (jenis == "internship") {
        jenis = "Internship"
    } else if (jenis == "proyek") {
        jenis = "Proyek"
    } else if (jenis == "ta") {
        jenis = "Tugas Akhir"
    } else if (jenis == "kompehensif") {
        jenis = "Komprehensif"
    } else if (jenis == "sempro") {
        jenis = "Sempro"
    }
    return jenis
}

export function ConvertKeteranganPrimbon(keterangan) {
    if (keterangan == "pu") {
        keterangan = "Penguji Utama"
    } else if (keterangan == "pp") {
        keterangan = "Penguji Pendamping"
    } else if (keterangan == "pb") {
        keterangan = "Pembimbing"
    } else if (keterangan == "pb1") {
        keterangan = "Pembimbing 1"
    } else if (keterangan == "pb2") {
        keterangan = "Pembimbing 2"
    }
    return keterangan
}

export function ConvertDropdown(keterangan) {
    let html = ``
    if (keterangan == "OK") {
        html = `<option selected value="OK">OK - Laporan Lengkap</option>
        <option value="TAL">TAL - Tidak Ada Laporan</option>`
    }else if (keterangan == "TAL"){
        html = `<option value="OK">OK - Laporan Lengkap</option>
        <option selected value="TAL">TAL - Tidak Ada Laporan</option>`
    } else {
        html = `<option value="OK">OK - Laporan Lengkap</option>
        <option value="TAL">TAL - Tidak Ada Laporan</option>`
    }
    return html
}