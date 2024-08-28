import { token } from "../../controller/cookies.js";
import { ConvertDropdown } from "../prodi/utils.js";

const urlDropdown = "https://hris_backend.ulbi.ac.id/api/v2/honour/dikjar/pilihan"
document.addEventListener("DOMContentLoaded", () => {
  // GetDropdownData()
});

async function GetDropdownData() {
  const optionsDrop = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      login: `${token}`,
    },
  };
  
  try {
    const response = await fetch(urlDropdown, optionsDrop);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    // console.log(data)
    return data;
  } catch (error) {
    console.error("Error:", error);
    Swal.fire("Failed!", "There was an issue submitting your data.", "error");
    return null;
  }
 
}

function fetchDataById(id) {
  const url = `https://hris_backend.ulbi.ac.id/api/v2/dosenwali/byid?_id=${id}`;
  fetch(url, {
    method: "GET",
    headers: {
      login: ` ${token}`, // Assuming you use Bearer token for authentication
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((result) => {
      // console.log(result.data)
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
  // console.log(data)
  document.getElementById("name").value = data.nama;
  document.getElementById("persentase_pph").value = data.persentase_pph;


  const courseListDiv = document.getElementById("courseList");
  courseListDiv.innerHTML = ""; // Clear existing courses

  data.kelas.forEach((course) => {
    addCourse(course);
  });
  if (data.masa_perolehan) {
    const masaPerolehan = document.getElementById("masa_perolehan");
    const formattedMasaPerolehan = capitalize(
      data.masa_perolehan.toLowerCase()
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
            ${ConvertDropdown(course.tahapan.tahap1)}
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

function selectDropdownOption(dropdown, valueToSelect) {
  for (const option of dropdown.options) {
    if (option.value === valueToSelect) {
      option.selected = true;
      break;
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const id = localStorage.getItem("editingid"); // Retrieve the ID from localStorage
  if (id) {
    fetchDataById(id);
  } else {
    console.error("No ID found in localStorage.");
    Swal.fire("Error", "No valid ID was provided for editing.", "error");
  }
});

function updateData() {
  const id = localStorage.getItem("editingid"); // Assuming the ID is stored in localStorage
  const nama = document.getElementById("name").value;
  const persentase_pph = document.getElementById("persentase_pph").value;
  const masa_perolehan = document.getElementById("masa_perolehan").value;
  const mataKuliahElements = document.querySelectorAll(".courseItem");
  const classes = Array.from(mataKuliahElements).map((course) => ({
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

  const data = {
    nama: nama,
    kelas: classes,
    persentase_pph: parseFloat(persentase_pph),
    jumlahdibayarkan: parseFloat(0),
    masa_perolehan: masa_perolehan
  };

  if (!id) {
    console.error("No ID found in localStorage.");
    Swal.fire("Error", "No valid ID was provided for editing.", "error");
    return;
  }

  const url = `https://hris_backend.ulbi.ac.id/api/v2/dosenwali/update?id=${id}`;

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
                  "https://euis.ulbi.ac.id/hris-dev/app/dosenwali/dosenwali-master.html"),
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
document.getElementById("updatebutton").addEventListener("click", updateData);
