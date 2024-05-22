import { token } from "../../controller/cookies.js";
//
document.addEventListener("DOMContentLoaded", function () {
  const id_pangkat = localStorage.getItem("editingId");
  if (id_pangkat) {
    fetchUserDataByid_pangkat(id_pangkat);
  } else {
    console.error("No ID found in localStorage.");
    Swal.fire("Error", "ID tidak ditemukan di penyimpanan lokal.", "error");
  }
});

function fetchUserDataByid_pangkat(id_pangkat) {
  const url = `https://hris_backend.ulbi.ac.id/api/v2/master/komponenkeluarga/get?_id=${id_pangkat}`;
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
  document.getElementById("jenis").value = userData.jenis || "";
  document.getElementById("nominal").value = userData.nominal || "";
  document.getElementById("persentase").value = userData.persentase || "";
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
  const id_pangkat = localStorage.getItem("editingId");

  const url = `https://hris_backend.ulbi.ac.id/api/v2/master/komponenkeluarga/update?_id=${id_pangkat}`;

  const formData = {
    jenis: document.getElementById("jenis").value,
    nominal: parseFloat(document.getElementById("nominal").value),
    persentase: parseFloat(document.getElementById("persentase").value),
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
        }).then(() => {
          window.location.href =
            "https://euis.ulbi.ac.id/hris-dev/app/Biodata/keluarga-master.html";
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
