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
function formatRupiah(number) {
  const format = number.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });
  return format;
}
function formatAsRupiah(input) {
  let value = input.value;
  // Remove all characters except digits and comma
  value = value.replace(/[^0-9]/g, "");
  // Convert string to an integer
  let number = parseInt(value, 10);
  if (isNaN(number)) {
    number = 0;
  }
  // Format the number with Indonesian locale to add thousand separators
  value = number.toLocaleString("id-ID");
  // Prepend 'Rp' and a space to denote Rupiah
  input.value = `Rp ${value}`;
}

// Attach event listeners to the input fields
document.addEventListener("DOMContentLoaded", function () {
  const currencyFields = [
    "gaji_pokok",
    "pangan",
    "keluarga",
    "fgs-struk",
    "fgs-fung",
    "kehadiran",
    "keluarga",
    "kinerja",
    "keahlian",
    "transportasi",
  ];
  currencyFields.forEach((fieldId) => {
    const inputField = document.getElementById(fieldId);
    inputField.addEventListener("input", () => formatAsRupiah(inputField));
  });
});

function populateForm(userData) {
  const struk = userData["fgs-struk"];
  const fung = userData["fgs-fung"];
  document.getElementById("nama").value = userData.nama || "0";
  document.getElementById("email").value = userData.email || "0";
  document.getElementById("gaji_pokok").value = formatRupiah(
    userData.pokok || 0
  );
  document.getElementById("pangan").value = formatRupiah(userData.pangan || 0);
  document.getElementById("keluarga").value = formatRupiah(
    userData.keluarga || 0
  );
  document.getElementById("fgs-struk").value = formatRupiah(struk || 0);
  document.getElementById("fgs-fung").value = formatRupiah(fung || 0);
  document.getElementById("kehadiran").value = formatRupiah(
    userData.kehadiran || 0
  );
  document.getElementById("kinerja").value = formatRupiah(
    userData.kinerja || 0
  );
  document.getElementById("keahlian").value = formatRupiah(
    userData.keahlian || 0
  );
  document.getElementById("transportasi").value = formatRupiah(
    userData.transportasi || 0
  );
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

  const parseRupiahToFloat = (value) => {
    return parseFloat(value.replace(/[^0-9]/g, ""));
  };

  const formData = {
    nama: document.getElementById("nama").value,
    email: email,
    pokok: parseRupiahToFloat(document.getElementById("gaji_pokok").value),
    pangan: parseRupiahToFloat(document.getElementById("pangan").value),
    keluarga: parseRupiahToFloat(document.getElementById("keluarga").value),
    "fgs-struk": parseRupiahToFloat(document.getElementById("fgs-struk").value),
    "fgs-fung": parseRupiahToFloat(document.getElementById("fgs-fung").value),
    kinerja: parseRupiahToFloat(document.getElementById("kinerja").value),
    kehadiran: parseRupiahToFloat(document.getElementById("kehadiran").value),
    keahlian: parseRupiahToFloat(document.getElementById("keahlian").value),
    transportasi: parseRupiahToFloat(
      document.getElementById("transportasi").value
    ),
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
        })
          .then(() => {
            window.location.href =
              "https://euis.ulbi.ac.id/hris-dev/app/Tunjangan/tunjangan-master.html";
          })
          .catch((error) => {
            console.error("Error:", error);
            Swal.fire(
              "Failed!",
              "There was an issue submitting your data.",
              "error"
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
