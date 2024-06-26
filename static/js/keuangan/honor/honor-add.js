import { token } from "../../controller/cookies.js";

function postData() {
  const url =
    "https://hris_backend.ulbi.ac.id/api/v2/honour/honormengajar/insert";

  const nama_pengajar = document.getElementById("name").value;
  const phone_number = document.getElementById("phone_number").value;
  const jabatan = document.getElementById("jabatan").value;
  const persentase_pph = document.getElementById("persentase_pph").value;
  const semester = document.getElementById("semester").value;

  const mata_kuliah = Array.from(
    document.getElementsByClassName("courseItem")
  ).map((course) => ({
    nama_matkul: course.querySelector('[name="nama_matkul[]"]').value,
    jurusan: course.querySelector('[name="jurusan[]"]').value,
    kelas: course.querySelector('[name="kelas[]"]').value,
    jam: parseFloat(course.querySelector('[name="jam[]"]').value),
    maks_kjm: parseFloat(course.querySelector('[name="maks_kjm[]"]').value),
    jumlah_kelas: parseInt(
      course.querySelector('[name="jumlah_kelas[]"]').value
    ),
    jumlah_temu: parseFloat(
      course.querySelector('[name="jumlah_temu[]"]').value
    ),
  }));

  const data = {
    nama_pengajar: nama_pengajar,
    phone_number: phone_number,
    mata_kuliah: mata_kuliah,
    jabatan: jabatan,
    persentase_pph: parseFloat(persentase_pph),
    periode_semester: semester,
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      login: ` ${token}`,
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
                  "https://euis.ulbi.ac.id/hris-dev/app/honor/honor-master.html"),
              1000
            );
          });
        })
        //s
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
const semesterSelect = document.getElementById("semester");
const currentYear = new Date().getFullYear();
const options = [];

for (let i = 0; i < 3; i++) {
  const year = currentYear + i;
  const prevYear = year - 1;
  const nextYear = year + 1;

  // Membuat option untuk semester genap
  options.push(
    `<option value="Semester Genap ${prevYear}/${year}">Semester Genap ${prevYear} / ${year}</option>`
  );

  // Membuat option untuk semester ganjil
  options.push(
    `<option value="Semester Ganjil ${year}/${nextYear}">Semester Ganjil ${year} / ${nextYear}</option>`
  );
}

semesterSelect.innerHTML = options.join("");
