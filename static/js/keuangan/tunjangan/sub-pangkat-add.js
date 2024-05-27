import { token } from "../../controller/cookies.js";

function postData() {
  const url = "https://hris_backend.ulbi.ac.id/api/v2/master/pangkat/insert";

  //   const id_pangkat = document.getElementById("id_pangkat").value;
  const kepanjangan = document.getElementById("kepanjangan").value;
  const jenis_pangkat = document.getElementById("jenis_pangkat").value;

  const data = {
    jenis_pangkat: jenis_pangkat,
    kepanjangan: kepanjangan,
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
          Swal.fire(
            "Submitted!",
            "Your data has been submitted.",
            "success"
          ).then((result) => {
            setTimeout(
              () =>
                (window.location.href =
                  "https://euis.ulbi.ac.id/hris-dev/app/Biodata/pangkat-master.html"),
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
