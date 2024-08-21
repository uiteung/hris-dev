export function ConvertJenisPrimbon(jenis) {
    if (jenis == "internship") {
        jenis = "Internship"
    } else if (jenis == "proyek") {
        jenis = "Proyek"
    } else if (jenis == "ta") {
        jenis = "Tugas Akhir"
    }
    return jenis
}

export function ConvertKeteranganPrimbon(keterangan) {
    if (keterangan == "pu") {
        keterangan = "Pendamping Utama"
    } else if (keterangan == "pp") {
        keterangan = "Pembimbing Pendamping"
    } else if (keterangan == "pb") {
        keterangan = "Pembimbing"
    } else if (keterangan == "pb1") {
        keterangan = "Pembimbing 1"
    } else if (keterangan == "pb2") {
        keterangan = "Pembimbing 2"
    }
    return keterangan
}