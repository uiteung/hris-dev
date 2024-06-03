import { token } from "../../controller/cookies.js";
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
document.addEventListener("DOMContentLoaded", function () {
  const currencyFields = ["nominal"];
  currencyFields.forEach((fieldId) => {
    const inputField = document.getElementById(fieldId);
    inputField.addEventListener("input", () => formatAsRupiah(inputField));
  });
});
function postData() {
  const url =
    "https://hris_backend.ulbi.ac.id/api/v2/master/komponenkeluarga/insert";

  const jenis = document.getElementById("jenis").value;
  const nominal = parseFloat(
    document.getElementById("nominal").value.replace(/[^0-9]/g, "")
  );
  const persentase = parseFloat(document.getElementById("persentase").value);

  const data = {
    jenis: jenis,
    persentase: persentase,
    nominal: nominal,
  };

  const options = {
    method: "POST",
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
                  "https://euis.ulbi.ac.id/hris-dev/app/Biodata/keluarga-master.html"),
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
