import { token } from "../../controller/cookies.js";

function fetchDataById(id) {
  const url = `https://hris_backend.ulbi.ac.id/api/v2/honour/honormengajar/get?_id=${id}`;
  fetch(url, {
    method: "GET",
    headers: {
      login: ` ${token}`, // Assuming you use Bearer token for authentication
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.code === 200 && result.success) {
        populateForm(result.data);
      } else {
        Swal.fire("Error", "Failed to fetch data: " + result.status, "error");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      Swal.fire("Error", "An error occurred while fetching data.", "error");
    });
}

function populateForm(data) {
  document.getElementById("name").value = data.nama_pengajar;
  document.getElementById("phoneNumber").value = data.phone_number;
  document.getElementById("jabatan").value = data.jabatan;
  document.getElementById("persentase_pph").value = data.persentase_pph;
  // document.getElementById("total_honor").value = data.total_honor;
  // document.getElementById("pph").value = data.pph;

  const courseListDiv = document.getElementById("courseList");
  courseListDiv.innerHTML = ""; // Clear existing courses

  data.mata_kuliah.forEach((course) => {
    addCourse(course);
  });
}

function addCourse(course) {
  const courseListDiv = document.getElementById("courseList");
  const div = document.createElement("div");
  div.className = "courseItem mb-3";
  div.innerHTML = `
        <h5>Detail Matakuliah</h5>
        <label for="nama_matkul" class="form-label">Nama Mata Kuliah:</label>
        <input type="text" class="form-control" name="nama_matkul[]" value="${course.nama_matkul}">
        <br>
        <label for="jurusan" class="form-label">Program Studi:</label>
        <input type="text" class="form-control" name="jurusan[]" value="${course.jurusan}">
        <br>
        <label for="kelas" class="form-label">Kelas:</label>
        <input type="text" class="form-control" name="kelas[]" value="${course.kelas}">
         <br>
        <label for="jam" class="form-label">Jam:</label>
        <input type="number" step="0.1" class="form-control" name="jam[]" value="${course.jam}">
         <br>        
        <label for="maks_kjm" class="form-label">Maks KJM:</label>
        <input type="number" step="0.1" class="form-control" name="maks_kjm[]" value="${course.maks_kjm}">
         <br>
        <label for="jumlah_kelas" class="form-label">Jumlah Kelas:</label>
        <input type="text" class="form-control" name="jumlah_kelas[]" value="${course.jumlah_kelas}">
         <br>
        <label for="jumlah_temu" class="form-label">Jumlah Temu:</label>
        <input type="number" step="0.1" class="form-control" name="jumlah_temu[]" value="${course.jumlah_temu}">
         <br>
        <label for="jam_dibayar" class="form-label">Jam Dibayar:</label>
        <input type="number" step="0.01" class="form-control" name="jam_dibayar[]" value="${course.jam_dibayar}">
         <br>
        <label for="honor_ajar" class="form-label">Honor Ajar:</label>
        <input type="number" class="form-control" name="honor_ajar[]" value="${course.honor_ajar}">
        <br>
        <button type="button" class="btn btn-primary removeButton" onclick="removeCourse(this)">Hapus Mata Kuliah</button>
        <br>
    `;
  courseListDiv.appendChild(div);
}

document.addEventListener("DOMContentLoaded", () => {
  const id = localStorage.getItem("editingId"); // Retrieve the ID from localStorage
  if (id) {
    fetchDataById(id);
  } else {
    console.error("No ID found in localStorage.");
    Swal.fire("Error", "No valid ID was provided for editing.", "error");
  }
});

function updateData() {
  const id = localStorage.getItem("editingId"); // Assuming the ID is stored in localStorage
  const namaPengajar = document.getElementById("name").value;
  const jabatan = document.getElementById("jabatan").value;
  const phoneNumber = document.getElementById("phoneNumber").value;
  const persentase_pph = document.getElementById("persentase_pph").value;
  const semester = document.getElementById("semester").value;

  const mataKuliahElements = document.querySelectorAll(".courseItem");
  const mataKuliah = Array.from(mataKuliahElements).map((courseElement) => ({
    nama_matkul: courseElement.querySelector("[name='nama_matkul[]']").value,
    jurusan: courseElement.querySelector("[name='jurusan[]']").value,
    kelas: courseElement.querySelector("[name='kelas[]']").value,
    jam: parseFloat(courseElement.querySelector("[name='jam[]']").value),
    maks_kjm: parseFloat(
      courseElement.querySelector("[name='maks_kjm[]']").value
    ),
    jumlah_kelas: parseInt(
      courseElement.querySelector("[name='jumlah_kelas[]']").value
    ),
    jumlah_temu: parseFloat(
      courseElement.querySelector("[name='jumlah_temu[]']").value
    ),
    jam_dibayar: parseFloat(
      courseElement.querySelector("[name='jam_dibayar[]']").value
    ),
    honor_ajar: parseFloat(
      courseElement.querySelector("[name='honor_ajar[]']").value
    ),
  }));

  const data = {
    nama_pengajar: namaPengajar,
    jabatan: jabatan,
    persentase_pph: parseFloat(persentase_pph),

    phone_number: phoneNumber,
    mata_kuliah: mataKuliah,
    periode_semester: semester,
  };

  if (!id) {
    console.error("No ID found in localStorage.");
    Swal.fire("Error", "No valid ID was provided for editing.", "error");
    return;
  }

  const url = `https://hris_backend.ulbi.ac.id/api/v2/honour/honormengajar/update?_id=${id}`;

  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      login: ` ${token}`, // Correct header for token authentication
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
          ).then(() => {
            setTimeout(
              () =>
                (window.location.href =
                  "https://euis.ulbi.ac.id/hris-dev/app/honor/honor-master.html"),
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

// Add an event listener or a button to trigger the updateData function
document.getElementById("updateButton").addEventListener("click", updateData);

const semesterSelect = document.getElementById("semester");
const currentYear = new Date().getFullYear();
const options = [];

for (let i = 0; i < 3; i++) {
  const year = currentYear + i;
  const prevYear = year - 1;
  const nextYear = year + 1;

  // Membuat option untuk semester genap
  options.push(
    `<option value="Genap ${prevYear}/${year}">Semester Genap ${prevYear} / ${year}</option>`
  );

  // Membuat option untuk semester ganjil
  options.push(
    `<option value="Ganjil ${year}/${nextYear}">Semester Ganjil ${year} / ${nextYear}</option>`
  );
}

semesterSelect.innerHTML = options.join("");
