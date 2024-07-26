import { token } from "../../controller/cookies.js";

document.addEventListener("DOMContentLoaded", function () {
  const id_masdikjar = localStorage.getItem("editingid");
  if (id_masdikjar) {
    fetchbyID(id_masdikjar);
  } else {
    console.error("No id_masdikjar found in localStorage.");
    Swal.fire(
      "Error",
      "id_masdikjar tidak ditemukan di penyimpanan lokal.",
      "error"
    );
  }
});

function fetchbyID(id_masdikjar) {
  const url = `https://hris_backend.ulbi.ac.id/api/v2/honour/dikjar/byid?id=${id_masdikjar}`;
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
  document.getElementById("jenjang").value = userData.jenjang_jabatan || ""
  document.getElementById("kategori").value = userData.kategori_jabatan || ""
  document.getElementById("ewmp").value = userData.ewmp_struktural || ""
  document.getElementById("maksimalngajar").value = userData.maksimal_dikjar || ""
  document.getElementById("wajib").value = userData.wajib_dikjar || ""
  document.getElementById("kelebihan").value = userData.kelebihan_dikjar || ""
  document.getElementById("bonus").value = userData.bonus_jam || ""
}

function postData() {
  const id_masdikjar = localStorage.getItem("editingid");
  const url = `https://hris_backend.ulbi.ac.id/api/v2/honour/dikjar/update?id=${id_masdikjar}`;
  const jenjang_jabatan = document.getElementById("jenjang").value;
  const kategori_jabatan = document.getElementById("kategori").value;
  const ewmp = document.getElementById("ewmp").value;
  const maksimal_mengajar = document.getElementById("maksimalngajar").value;
  const wajib_dikjar = document.getElementById("wajib").value;
  const kelebihan_dikjar = document.getElementById("kelebihan").value;
  const bonus_jam = document.getElementById("bonus").value;
  const kategori_array = kategori_jabatan.split(",")
  
  

  const data = {
    id_masdikjar : parseInt(id_masdikjar),
    jenjang_jabatan : jenjang_jabatan,
    kategori_jabatan : kategori_array,
    ewmp_struktural : parseInt(ewmp),
    maksimal_dikjar : parseInt(maksimal_mengajar),
    wajib_dikjar : parseInt(wajib_dikjar),
    kelebihan_dikjar : parseInt(kelebihan_dikjar),
    bonus_jam : parseInt(bonus_jam)
  };

  console.log(data)

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
                  "https://euis.ulbi.ac.id/hris-dev/app/dikjar/dikjar-master.html"),
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
