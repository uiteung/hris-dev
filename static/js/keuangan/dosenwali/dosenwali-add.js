import { token } from "../../controller/cookies.js";

function postData() {
  const url = "https://hris_backend.ulbi.ac.id/api/v2/dosenwali/insert";

  const nama = document.getElementById("name").value;
  const masa_perolehan = document.getElementById("masa_perolehan").value;
  const classes = Array.from(
    document.getElementsByClassName("courseItem")
  ).map((course) => ({
    angkatan: course.querySelector('[name="angkatan[]"]').value,
    prodi: course.querySelector('[name="jurusan[]"]').value,
    semester: course.querySelector('[name="semester[]"]').value,
    kelas: course.querySelector('[name="kelas[]"]').value,
    tahapan: {
      tahap1: course.querySelector('[name="laporan[]"]').value,
      tahap2:course.querySelector('[name="laporan[]"]').value,
    },
    honor: parseFloat(
      course.querySelector('[name="honor[]"]').value
    ),
  }));
  const persentase_pph = document.getElementById("persentase_pph").value;

  const data = {
    nama: nama,
    kelas: classes,
    persentase_pph: parseFloat(persentase_pph),
    jumlahdibayarkan: parseFloat(0),
    masa_perolehan: masa_perolehan
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
                  "https://euis.ulbi.ac.id/hris-dev/app/dosenwali/dosenwali-master.html"),
              1000
            );
          });

          //   window.location.href =
          //     "https://euis.ulbi.ac.id/hris-dev/app/Doktor/doktor-master.html";
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
