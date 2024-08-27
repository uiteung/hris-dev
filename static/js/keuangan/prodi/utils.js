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