import { token } from "../../controller/cookies.js";
//
document.addEventListener("DOMContentLoaded", function () {
  const id_pangkat = localStorage.getItem("editingid");
  if (id_pangkat) {
    fetchUserDataByid_pangkat(id_pangkat);
  } else {
    console.error("No id_pangkat found in localStorage.");
    Swal.fire(
      "Error",
      "id_pangkat tidak ditemukan di penyimpanan lokal.",
      "error"
    );
  }
});

function fetchUserDataByid_pangkat(id_pangkat) {
  const url = `https://hris_backend.ulbi.ac.id/api/v2/master/jafung/byid?id=${id_pangkat}`;
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
  document.getElementById("jafung").value = userData.nama_jafung || "";
  document.getElementById("singkatan").value = userData.singkatan || "";
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("editForm");
  const updateButton = document.getElementById("buttonupdate");

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
  const id_pangkat = localStorage.getItem("editingid");

  const url = `https://hris_backend.ulbi.ac.id/api/v2/master/jafung/edit?id=${id_pangkat}`;

  const formData = {
    id_pangkat: id_pangkat,
    nama_jafung: document.getElementById("jafung").value,
    singkatan: document.getElementById("singkatan").value,
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
