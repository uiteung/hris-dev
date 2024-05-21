import { token } from "../../controller/cookies.js";
function postData() {
  const url = "https://hris_backend.ulbi.ac.id/api/v2/master/doktor/insert";

  const nama = document.getElementById("nama");
  const email = document.getElementById("email");
  const jafung = document.getElementById("jafung");
  const jabatan_struktural = document.getElementById("jabatan_struktural");
  const tunjangan = document.getElementById("tunjangan");
  const pph = document.getElementById("pph");
  const jumlah_dibayarkan = document.getElementById("jumlah_dibayarkan");
  const masa_perolehan = document.getElementById("masa_perolehan");
  const validasi = document.getElementById("validasi");

  const data = {
    nama: nama,
    email: email,
    jafung: jafung,
    jabatan_struktural: jabatan_struktural,
    tunjangan: parseInt(tunjangan),
    pph: parseInt(pph),
    jumlah_dibayarkan: parseInt(jumlah_dibayarkan),
    masa_perolehan: masa_perolehan,
    validasi: validasi,
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      login: token,
    },
    body: JSON.stringify(data),
  };
  Swal.fire({
    title: "Anda Yakin?",
    text: "Kamu ingin mengirim data!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, submit it!",
  }).then((result) => {
    if (result.isConfirmed) {
      // Only proceed with fetch if user confirms
      fetch(url, options)
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          Swal.fire("Submitted!", "Your data has been submitted.", "success");
          window.location.href =
            "https://euis.ulbi.ac.id/hris-dev/app/Doktor/doktor-master.html";
        })
        .catch((error) => {
          console.error("Error:", error);
          Swal.fire(
            "Failed!",
            "There was an issue submitting your data.",
            "error"
          );
        });
    }
  });
}

document.getElementById("updatebutton").addEventListener("click", postData);
