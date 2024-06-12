import { token } from "../../controller/cookies.js";
//
document.addEventListener("DOMContentLoaded", function () {
  const id_pph = localStorage.getItem("editingId");
  if (id_pph) {
    fetchUserDataByid_pph(id_pph);
  } else {
    console.error("No id_pph found in localStorage.");
    Swal.fire("Error", "id_pph tidak ditemukan di penyimpanan lokal.", "error");
  }
});

function fetchUserDataByid_pph(id_pph) {
  const url = `https://hris_backend.ulbi.ac.id/api/v2/master/pph/byid?id=${id_pph}`;
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
  document.getElementById("bulan").value = userData.bulan || "-";
  document.getElementById("tahun").value = userData.tahun || "-";
  document.getElementById("persentase_pph").value =
    userData.persentase_pph || "-";
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("editForm");
  const updateButton = document.getElementById("updateButton");
  updateButton.addEventListener("click", function (event) {
    event.preventDefault();
    Swal.fire({
      title: "Konfirmasi",
      text: "Apakah Anda yakin ingin memperbarui data ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, perbarui data!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.value) {
        updateUserData();
      }
    });
  });
});

function updateUserData() {
  const idpph = localStorage.getItem("editingId");

  const url = `https://hris_backend.ulbi.ac.id/api/v2/master/pph/edit?id=${idpph}`;

  const formData = {
    idpph: parseInt(idpph),
    bulan: document.getElementById("bulan").value,
    tahun: document.getElementById("tahun").value,
    persentase_pph: parseFloat(document.getElementById("persentase_pph").value),
  };

  fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      login: token,
    },
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        Swal.fire({
          title: "Berhasil!",
          text: "Data telah berhasil diperbarui.",
          icon: "success",
          confirmButtonText: "OK",
        }).then((result) => {
          setTimeout(
            () =>
              (window.location.href =
                "https://euis.ulbi.ac.id/hris-dev/app/Potongan/pph-master.html"),
            1000
          );
        });
      } else {
        Swal.fire("Error", "Gagal memperbarui data: " + data.message, "error");
      }
    })
    .catch((error) => {
      console.error("Error updating user data:", error);
      Swal.fire(
        "Error",
        "Terjadi kesalahan saat memperbarui data: " + error.message,
        "error"
      );
    });
}
