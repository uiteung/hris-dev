import { token } from "../../controller/cookies.js";
//
let id = ""
document.addEventListener("DOMContentLoaded", function () {
  id = localStorage.getItem("editingid");
  if (id) {
    fetchUserDataByid(id);
  } else {
    console.error("No id found in localStorage.");
    Swal.fire("Error", "id tidak ditemukan di penyimpanan lokal.", "error");
  }
});

function fetchUserDataByid(id) {
  const url = `https://hris_backend.ulbi.ac.id/api/v2/dosenwali/byid?_id=${encodeURIComponent(
    id
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
        populateForm(data.data); // Mengisi form dengan data yang didapat
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
  const currencyFields = ["pph"];
  currencyFields.forEach((fieldId) => {
    const inputField = document.getElementById(fieldId);
    inputField.addEventListener("input", () => formatAsRupiah(inputField));
  });
});

const laporan = document.getElementById("laporan").value;
console.log(laporan)

function populateForm(userData) {
  document.getElementById("name").value = userData.nama || "";
    document.getElementById("persentase_pph").value = formatRupiah(userData.pph || 0);

    const courseListDiv = document.getElementById("courseList");
    courseListDiv.innerHTML = ""; // Clear existing courses
  
    data.mata_kuliah.forEach((course) => {
      addCourse(course);
    });
  document.getElementById("validasi").value = userData.validasi || "";

  if (userData.masa_perolehan) {
    const masaPerolehan = document.getElementById("masa_perolehan");
    const formattedMasaPerolehan = capitalize(
      userData.masa_perolehan.toLowerCase()
    );
    selectDropdownOption(masaPerolehan, formattedMasaPerolehan);
  }
}

function addCourse(course) {
  const courseListDiv = document.getElementById("courseList");
  const div = document.createElement("div");
  div.className = "courseItem mb-3";
  div.innerHTML = `
         <h5>Detail Kelas Walian</h5>
         <label for="nama_matkul" class="form-label">Angkatan:</label>
         <input type="text" class="form-control" name="angkatan[]" value="${course.angkatan}">
 
         <label for="jurusan" class="form-label">Program Studi:</label>
         <input type="text" class="form-control" name="jurusan[]" value="${course.prodi}">
 
         <label for="kelas" class="form-label">Semester:</label>
         <input type="text" class="form-control" name="semester[]" value="${course.semester}">

         <label for="kelas" class="form-label">Kelas:</label>
         <input type="text" class="form-control" name="kelas[]" value="${course.kelas}">
 
         <label for="jam" class="form-label">Laporan Perwalian:</label>
         <select class="form-select" id="laporan" step="0.1" name="laporan[]">
           <option value="" aria-disabled="true"></option>
             <option value="OK">OK - Laporan Lengkap</option>
             <option value="TAL">TAL - Tidak Ada Laporan</option>
         </select>

         <label for="Honor" class="form-label">Honor:</label>
         <input type="number" class="form-control" name="honor[]" value="${course.honor}">

         <br>
         <button type="button" id="removeButton" class="btn btn-primary removeButton" onclick="removeCourse(this)">Hapus Kelas Walian</button>
         <br>
    `;
  courseListDiv.appendChild(div);
}

function capitalize(text) {
  return text
    .split(" ")
    .map((word) => word.toUpperCase())
    .join(" ");
}

// Function to select the correct dropdown option
function selectDropdownOption(dropdown, valueToSelect) {
  for (const option of dropdown.options) {
    if (option.value === valueToSelect) {
      option.selected = true;
      break;
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const buttonupdate = document.getElementById("updatebutton");
  buttonupdate.addEventListener("click", function (event) {
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
  const url = `https://hris_backend.ulbi.ac.id/api/v2/dosenwali/update?id=${encodeURIComponent(
    id
  )}`;
  const parseRupiahToFloat = (value) => {
    return parseFloat(value.replace(/[^0-9]/g, ""));
  };

  const formData = {
    nama: document.getElementById("name").value,
    angkatan: document.getElementById("angkatan").value,
    kelas: document.getElementById("kelas").value,
    semester: document.getElementById("semester").value,
    prodi: document.getElementById("prodi").value ,
    tahapan: {
      tahap1 : document.getElementById("laporan").value,
      tahap2 : document.getElementById("laporan").value,
    },
    honor: parseRupiahToFloat(document.getElementById('honor').value),
    pph: parseRupiahToFloat(document.getElementById('pph').value),
    masa_perolehan: document.getElementById("masa_perolehan").value
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
        }).then((result) => {
          setTimeout(
            () =>
              (window.location.href =
                "https://euis.ulbi.ac.id/hris-dev/app/dosenwali/dosenwali-master.html"),
            1000
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
