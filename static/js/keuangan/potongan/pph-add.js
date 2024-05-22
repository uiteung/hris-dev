import { token } from "../../controller/cookies.js";

function postData() {
  const url = "https://hris_backend.ulbi.ac.id/api/v2/master/pph/insert";

  const bulan = document.getElementById("bulan").value;
  const tahun = document.getElementById("tahun").value;
  const persentase_pph = parseFloat(
    document.getElementById("persentase_pph").value
  );

  const data = {
    idpph: 0,
    bulan: bulan,
    persentase_pph: persentase_pph,
    tahun: tahun,
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
    title: "Are you sure?",
    text: "You won't be able to revert this!",
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
          Swal.fire("Submitted!", "Your data has been submitted.", "success");
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

document.getElementById("updateButton").addEventListener("click", postData);
