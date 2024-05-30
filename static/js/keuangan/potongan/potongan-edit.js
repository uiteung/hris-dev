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
  const url = `https://hris_backend.ulbi.ac.id/api/v2/master/potongan/email?email=${encodeURIComponent(
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
    "kopkar",
    "bankjabar",
    "bpjstk",
    "bauk",
    "pph",
    "lainlain2",
    "lainlain3",
  ];
  currencyFields.forEach((fieldId) => {
    const inputField = document.getElementById(fieldId);
    inputField.addEventListener("input", () => formatAsRupiah(inputField));
  });
});
function cleanCurrencyInput(inputValue) {
  // Remove 'Rp' prefix and all non-numeric characters except decimal point
  return inputValue.replace(/Rp/g, "").replace(/[^\d.-]/g, "");
}
function populateForm(userData) {
  document.getElementById("nama").value = userData.nama || "0";
  document.getElementById("email").value = userData.email || "0";
  document.getElementById("kopkar").value = formatRupiah(userData.kopkar || 0);
  document.getElementById("bankjabar").value = formatRupiah(
    userData.bankjabar || 0
  );
  document.getElementById("bauk").value = formatRupiah(userData.bauk || 0);

  document.getElementById("bpjstk").value = formatRupiah(userData.bpjstk || 0);
  document.getElementById("pph").value = formatRupiah(userData.pph || 0);
  document.getElementById("lainlain2").value = formatRupiah(
    userData.lainlain2 || 0
  );
  document.getElementById("lainlain3").value = formatRupiah(
    userData.lainlain3 || 0
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
  const url = `https://hris_backend.ulbi.ac.id/api/v2/master/potongan/update?email=${encodeURIComponent(
    email
  )}`;

  const formData = {
    kopkar: parseFloat(
      cleanCurrencyInput(document.getElementById("kopkar").value)
    ),
    bankjabar: parseFloat(
      cleanCurrencyInput(document.getElementById("bankjabar").value)
    ),
    bauk: parseFloat(cleanCurrencyInput(document.getElementById("bauk").value)),
    bpjstk: parseFloat(
      cleanCurrencyInput(document.getElementById("bpjstk").value)
    ),
    pph: parseFloat(cleanCurrencyInput(document.getElementById("pph").value)),
    lainlain2: parseFloat(
      cleanCurrencyInput(document.getElementById("lainlain2").value)
    ),
    lainlain3: parseFloat(
      cleanCurrencyInput(document.getElementById("lainlain3").value)
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
