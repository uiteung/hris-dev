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
  const url = `https://hris_backend.ulbi.ac.id/api/v2/master/tunjangan/email?email=${encodeURIComponent(
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
  const struk = userData["fgs-struk"];
  document.getElementById("nama").value = userData.nama || "Tidak Tersedia";
  document.getElementById("email").value = userData.email || "Tidak Tersedia";
  document.getElementById("gaji_pokok").value =
    userData.pokok || "Tidak Tersedia";
  document.getElementById("pangan").value = userData.pangan || "Tidak Tersedia";
  document.getElementById("keluarga").value =
    userData.keluarga || "Tidak Tersedia";
  document.getElementById("fgs-struk").value = struk || "Tidak Tersedia";
  document.getElementById("kehadiran").value =
    userData.kehadiran || "Tidak Tersedia";
  document.getElementById("keahlian").value =
    userData.keahlian || "Tidak Tersedia";
  document.getElementById("transportasi").value =
    userData.transportasi || "Tidak Tersedia";
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
  const url = `https://hris_backend.ulbi.ac.id/api/v2/master/tunjangan/update?email=${encodeURIComponent(
    email
  )}`;

  const formData = {
    nama: document.getElementById("nama").value,
    email: email,
    pokok: parseFloat(document.getElementById("gaji_pokok").value),
    pangan: parseFloat(document.getElementById("pangan").value),
    keluarga: parseFloat(document.getElementById("keluarga").value),
    "fgs-struk": parseFloat(document.getElementById("fgs-struk").value),
    kehadiran: parseFloat(document.getElementById("kehadiran").value),
    keahlian: parseFloat(document.getElementById("keahlian").value),
    transportasi: parseFloat(document.getElementById("transportasi").value),
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
