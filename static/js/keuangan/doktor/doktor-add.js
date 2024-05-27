import { token } from "../../controller/cookies.js";

function postData() {
  const url = "https://hris_backend.ulbi.ac.id/api/v2/master/doktor/insert";

  const nama = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const jafung = document.getElementById("jafung").value;
  const jabatan_struktural =
    document.getElementById("jabatan_struktural").value;
  const tunjangan = parseFloat(document.getElementById("tunjangan").value);
  const pph = parseFloat(document.getElementById("pph").value);
  //   const jumlah_dibayarkan = parseFloat(
  //     document.getElementById("jumlah_dibayarkan").value
  //   );
  const masa_perolehan = document.getElementById("masa_perolehan").value;
  const validasi = document.getElementById("validasi").value;

  const data = {
    nama: nama,
    email: email,
    jabatan_fungsional: jafung,
    jabatan_struktural: jabatan_struktural,
    tunjangan: tunjangan,
    pph: pph,
    // jumlah_dibayarkan: jumlah_dibayarkan,
    masa_perolehan: masa_perolehan,
    validasi: validasi === "true", // Convert to boolean
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
          Swal.fire(
            "Submitted!",
            "Your data has been submitted.",
            "success"
          ).then(() => {
            location.reload(true);
          });

          //   window.location.href =
          //     "https://euis.ulbi.ac.id/hris-dev/app/Doktor/doktor-master.html";
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
