import { token } from "../controller/cookies.js";

document.addEventListener("DOMContentLoaded", function () {
  const email = localStorage.getItem("editingEmail");
  if (email) {
    fetchUserDataByEmail(email);
  } else {
    console.error("No email found in localStorage.");
  }
});

function fetchUserDataByEmail(email) {
  const url = `https://hris_backend.ulbi.ac.id/api/v2/wagemst/getbyemail?email=${encodeURIComponent(
    email
  )}`;
  fetch(url, {
    method: "GET",
    headers: {
      login: token, // Ensure your authentication mechanism is secure
      Accept: "application/json",
    },
  })
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((response) => {
      console.log(response); // Check what the actual data looks like
      if (response.code === 200 && response.success) {
        populateForm(response);
      } else {
        Swal.fire(
          "Informasi",
          "Gagal mengambil data. Silakan periksa kembali.",
          "error"
        );
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      Swal.fire("Error", "Terjadi kesalahan saat mengambil data.", "error");
    });
}

function populateForm(data) {
  if (!data || !data.data_query || !data.data_query.length) {
    console.error("No data to populate the form.");
    return;
  }
  const userData = data.data_query[0]; // assuming the data is the first index
  document.getElementById("name").value = userData.nama || "";
  document.getElementById("email").value = userData.email || "";
  document.getElementById("rank").value = userData.pangkat || "";
  document.getElementById("position").value = userData.jabatan || "";
  document.getElementById("basicSalary").value = userData.pokok || "";
  document.getElementById("familyAllowance").value = userData.keluarga || "";
  document.getElementById("foodAllowance").value = userData.pangan || "";
  document.getElementById("performanceAllowance").value =
    userData.kinerja || "";
  document.getElementById("expertiseAllowance").value = userData.keahlian || "";
  document.getElementById("structuralAllowance").value =
    userData["fgs-struk"] || "";
  document.getElementById("transportationAllowance").value =
    userData.transportasi || "";
  document.getElementById("attendanceAllowance").value =
    userData.kehadiran || "";
  document.getElementById("kopkarDeduction").value = userData.kopkar || "";
  document.getElementById("bankJabarDeduction").value =
    userData.bankJabar || "";
  document.getElementById("arisanDeduction").value = userData.arisan || "";
  document.getElementById("bpjsDeduction").value = userData.bpjs || "";
  document.getElementById("baukDeduction").value = userData.bauk || "";
  document.getElementById("otherDeductions").value = userData.lain2 || "";
  document.getElementById("pphDeduction").value = userData.pph || "";
}
