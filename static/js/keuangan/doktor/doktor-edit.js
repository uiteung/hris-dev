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
  const url = `https://hris_backend.ulbi.ac.id/api/v2/master/doktor/email?email=${encodeURIComponent(
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
  document.getElementById("nama").value = userData.nama || "";
  document.getElementById("email").value = userData.email || "";
  document.getElementById("jafung").value = userData.jabatan_fungsional || "";
  document.getElementById("jabatan_struktural").value =
    userData.jabatan_struktural || "";

  document.getElementById("pph").value = userData.pph || "";
  document.getElementById("jumlah_dibayarkan").value =
    userData.jumlah_dibayarkan || "";

  document.getElementById("tunjangan").value = userData.tunjangan || "";
  document.getElementById("validasi").value = userData.validasi || "";

  if (userData.masa_perolehan) {
    const masaPerolehan = document.getElementById("masa_perolehan");
    const formattedMasaPerolehan = capitalize(
      userData.masa_perolehan.toLowerCase()
    );
    selectDropdownOption(masaPerolehan, formattedMasaPerolehan);
  }
}

function capitalize(text) {
  return text
    .split(" ")
    .map((word) => word.toUpperCase())
    .join(" ");
}

// Function to select the correct dropdown option
function selectDropdownOption(dropdown, valueToSelect) {
  for (const option of dropdown.options) {
    if (option.value === valueToSelect) {
      option.selected = true;
      break;
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const buttonupdate = document.getElementById("updatebutton");
  buttonupdate.addEventListener("click", function (event) {
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
  const url = `https://hris_backend.ulbi.ac.id/api/v2/master/doktor/edit?email=${encodeURIComponent(
    email
  )}`;

  const formData = {
    nama: document.getElementById("nama").value,
    email: document.getElementById("email").value,
    jabatan_fungsional: document.getElementById("jafung").value,
    jabatan_struktural: document.getElementById("jabatan_struktural").value,
    jumlah_dibayarkan: parseFloat(
      document.getElementById("jumlah_dibayarkan").value
    ),
    pph: parseFloat(document.getElementById("pph").value),
    tunjangan: parseFloat(document.getElementById("tunjangan").value),
    validasi: document.getElementById("validasi").value,
    masa_perolehan: document.getElementById("masa_perolehan").value,
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
                "https://euis.ulbi.ac.id/hris-dev/app/Doktor/dokter-master.html"),
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
