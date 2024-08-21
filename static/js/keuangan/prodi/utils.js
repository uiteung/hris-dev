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