import { token } from "../../controller/cookies.js";

function postData() {
  const url = "https://hris_backend.ulbi.ac.id/api/v2/prodi/insert";

  const nama = document.getElementById("name").value;
  const jenis_honor = document.getElementById("jenis_honor").value;
  const jenis_pembimbing1 = document.getElementById("jenis_pembimbing1").value;
  const jml_mhs1 = document.getElementById("jml_mhs1").value;
  const jenis_pembimbing2 = document.getElementById("jenis_pembimbing2").value;
  const jml_mhs2 = document.getElementById("jml_mhs2").value;
  const jenis_penguji1 = document.getElementById("jenis_penguji1").value;
  const jml_mhsU = document.getElementById("jml_mhsU").value;
  const jenis_penguji2 = document.getElementById("jenis_penguji2").value;
  const jml_mhsP = document.getElementById("jml_mhsP").value;
  
  if (jenis_pembimbing2 == "") {
    jenis_pembimbing2 = "-"
    jml_mhs2 = 0
  }

  const data = {
    nama: nama,
    bimbingan: {
      jenisBimbingan1: jenis_pembimbing1,
      pb1: parseInt(jml_mhs1),
      nominalPB1: parseFloat(0),
      jenisBimbingan2: jenis_pembimbing2,
      pb2: parseInt(jml_mhs2),
      nominalPB2: parseFloat(0)
    },
    menguji: {
      jenisMenguji1: jenis_penguji1,
      penguji_utama: parseInt(jml_mhsU),
      nominalPU: parseFloat(0),
      jenisMenguji2: jenis_penguji2,
      penguji_pendamping: parseInt(jml_mhsP),
      nominalPP: parseFloat(0)
    },
    totalHonor: parseFloat(0),
    persentasepph: parseFloat(0),
    pph: parseFloat(0),
    dibayarkan: parseFloat(0),
    jenisHonor: jenis_honor
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
          ).then((result) => {
            setTimeout(
              () =>
                (window.location.href =
                  "https://euis.ulbi.ac.id/hris-dev/app/prodi/prodi-master.html"),
              1000
            );
          });
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
