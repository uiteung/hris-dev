import { token } from "../../controller/cookies.js";

document.addEventListener("DOMContentLoaded", function () {
  const id = localStorage.getItem("editingid");
  if (id) {
    fetchbyID(id);
  } else {
    console.error("No id found in localStorage.");
    Swal.fire(
      "Error",
      "id tidak ditemukan di penyimpanan lokal.",
      "error"
    );
  }
});

function fetchbyID(id) {
  const url = `https://hris_backend.ulbi.ac.id/api/v2/prodi/primbon/byid?id=${id}`;
  fetch(url, {
    method: "GET",
    headers: {
      login: token,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.code === 200 && data.success) {
        populateForm(data.data);
      } else {
        Swal.fire(
          "Informasi",
          "Gagal mengambil data: " + (data.status || "Status tidak diketahui"),
          "error"
        );
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      Swal.fire(
        "Error",
        "Terjadi kesalahan saat mengambil data: " + error.message,
        "error"
      );
    });
}
function populateForm(userData) {
    document.getElementById("jenis").value = userData.jenis || ""
    document.getElementById("keterangan").value = userData.keterangan || ""
    document.getElementById("nominal").value = userData.nominal || 0
}

function postData() {
  const id = localStorage.getItem("editingid");
  const url = `https://hris_backend.ulbi.ac.id/api/v2/prodi/update?id=${id}`;
  const jenis = document.getElementById("jenis").value;
  const keterangan = document.getElementById("keterangan").value;
  const nominal = document.getElementById("nominal").value;
  
  

  const data = {
    id_primbon : 0,
    jenis : jenis,
    keterangan : keterangan,
    nominal : parseFloat(nominal),
  };

  const options = {
    method: "PUT",
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
                  "https://euis.ulbi.ac.id/hris-dev/app/prodi/primbon-prodi.html"),
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
