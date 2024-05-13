import { token } from "../../controller/cookies.js";
//
document.addEventListener("DOMContentLoaded", function () {
  const email = localStorage.getItem("editingEmail");
  if (email) {
    fetchUserDataByEmail(email);
  } else {
    console.error("No email found in localStorage.");
    Swal.fire("Error", "Email tidak ditemukan di penyimpanan lokal.", "error");
  }
});

function fetchUserDataByEmail(email) {
  const url = `https://hris_backend.ulbi.ac.id/api/v2/master/bio/email?email=${encodeURIComponent(
    email
  )}`;
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
        populateForm(data.data); // Mengisi form dengan data yang didapat
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
  document.getElementById("nama").value = userData.nama || "Tidak Tersedia";
  document.getElementById("email").value = userData.email || "Tidak Tersedia";
  document.getElementById("pangkat").value =
    userData.pangkat || "Tidak Tersedia";
  document.getElementById("jabatan").value =
    userData.jabatan || "Tidak Tersedia";
  document.getElementById("jafung").value = userData.jafung || "Tidak Tersedia";
  document.getElementById("status_keluarga").value =
    userData.status_keluarga || "Tidak Tersedia";
  document.getElementById("suskel_dirisendiri").value =
    userData.suskel.dirisendiri || "Tidak Tersedia";
  document.getElementById("suskel_suamiistri").value =
    userData.suskel.suamiistri || "Tidak Tersedia";
  document.getElementById("suskel_anak").value =
    userData.suskel.anak || "Tidak Tersedia";
  document.getElementById("kelompok").value =
    userData.kelompok || "Tidak Tersedia";
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("editForm");
  form.addEventListener("submit", function (event) {
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
  const email = document.getElementById("email").value; // mendapatkan email dari form
  const url = `https://hris_backend.ulbi.ac.id/api/v2/wagemst/update?email=${encodeURIComponent(
    email
  )}`;

  const formData = {
    nama: document.getElementById("nama").value,
    email: email,
    pangkat: document.getElementById("pangkat").value,
    jabatan: document.getElementById("jabatan").value,
    jafung: document.getElementById("jafung").value,
    status_keluarga: document.getElementById("status_keluarga").value,
    suskel: {
      dirisendiri: document.getElementById("suskel_dirisendiri").value,
      suamiistri: document.getElementById("suskel_suamiistri").value,
      anak: document.getElementById("suskel_anak").value,
    },
    kelompok: document.getElementById("kelompok").value,
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
                "https://euis.ulbi.ac.id/hris-dev/app/Biodata/biodata-master.html"),
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
