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

        <label for="jurusan" class="form-label">Jurusan:</label>
        <input type="text" class="form-control" name="jurusan[]" value="${course.jurusan}">

        <label for="kelas" class="form-label">Kelas:</label>
        <input type="text" class="form-control" name="kelas[]" value="${course.kelas}">

        <label for="jam" class="form-label">Jam:</label>
        <input type="number" step="0.1" class="form-control" name="jam[]" value="${course.jam}">

        <label for="maks_kjm" class="form-label">Maks KJM:</label>
        <input type="number" step="0.1" class="form-control" name="maks_kjm[]" value="${course.maks_kjm}">

        <label for="jumlah_kelas" class="form-label">Jumlah Kelas:</label>
        <input type="text" class="form-control" name="jumlah_kelas[]" value="${course.jumlah_kelas}">

        <label for="jumlah_temu" class="form-label">Jumlah Temu:</label>
        <input type="number" step="0.1" class="form-control" name="jumlah_temu[]" value="${course.jumlah_temu}">

        <label for="jam_dibayar" class="form-label">Jam Dibayar:</label>
        <input type="number" step="0.01" class="form-control" name="jam_dibayar[]" value="${course.jam_dibayar}">

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
