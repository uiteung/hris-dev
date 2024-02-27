window.addEventListener("load", () => {
    const loader = document.querySelector(".loader");

    loader.classList.add("loader-hidden");

    loader.addEventListener("transitioned", () => {
        document.body.removeChild("loader");
    })
})

export function ModalUpdate(email) {
    
    Swal.fire({
        title: "<strong>Form Update <b>Data Gaji</b></strong>",
        html: `
        <h3>Silahkan Update data yang perlu diupdate</h3>
        <input type="text" id="gajipokok" class="swal2-input" placeholder="Gaji Pokok">
        <input type="text" id="keluarga" class="swal2-input" placeholder="Keluarga">
        <input type="text" id="pangan" class="swal2-input" placeholder="Pangan">
        <input type="text" id="keahlian" class="swal2-input" placeholder="Keahlian">
        <input type="text" id="fgs/struk" class="swal2-input" placeholder="FGS/Struk">
        <input type="text" id="transport" class="swal2-input" placeholder="Transport">
        <input type="text" id="kehadiran" class="swal2-input" placeholder="Kehadiran">
        <input type="text" id="kopkar" class="swal2-input" placeholder="Kopkar">
        <input type="text" id="bankjabar" class="swal2-input" placeholder="Bank Jabar">
        <input type="text" id="arisan" class="swal2-input" placeholder="Arisan">
        <input type="text" id="bpjstk" class="swal2-input" placeholder="BPJS TK">
        <input type="text" id="bauk" class="swal2-input" placeholder="BAUK">
        <input type="text" id="lain-lain" class="swal2-input" placeholder="Lain - Lain">
        `,
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: `
           Update
        `,
        confirmButtonAriaLabel: "Berhasil",
        cancelButtonText: `
          Cancel
        `,
        cancelButtonAriaLabel: "Gagal"
      })
}