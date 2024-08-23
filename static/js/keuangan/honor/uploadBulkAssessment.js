import { token } from "../../controller/cookies.js"; // Adjust path as needed
document.addEventListener("DOMContentLoaded", function () {
  const bulkUploadButton = document.getElementById("bulkUploadButton");
  const templateExcel = document.getElementById("templateExcel");
  const loadingSpinner = document.getElementById("loadingSpinner"); // Ensure you have this element in HTML

  bulkUploadButton.addEventListener("click", function () {
    handleFileUpload(loadingSpinner);
  });

  templateExcel.addEventListener("click", downloadExcelTemplate);
});
function handleFileUpload() {
  const fileInput = document.getElementById("fileUpload");
  const file = fileInput.files[0];
  if (file) {
    Swal.fire({
      title: "Processing...",
      text: "Please wait while the file is being processed",
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });
    const reader = new FileReader();
    reader.onload = function (event) {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: false });
      const groupedData = groupCoursesByInstructor(jsonData);
      groupedData.forEach((instructorData) => {
        postInstructorData(instructorData);
      });
    };
    reader.readAsArrayBuffer(file);
  } else {
    Swal.fire("Error!", "Please select a file to upload.", "error");
  }
}
function groupCoursesByInstructor(data) {
  const instructors = {};

  data.forEach((row) => {
    const key = row["Nama Pengajar"] + "_" + row["Phone Number"];
    if (!instructors[key]) {
      instructors[key] = {
        nama_pengajar: row["Nama Pengajar"],
        status_dosen: row["Status Dosen"],
        jabatan: row["Jabatan"],
        jenjang_jabatan: row["Jenjang Jabatan"],
        phone_number: row["Phone Number"],
        persentase_pph: parseFloat(row["Persentase PPH"]),
        periode_semester: row["Periode Semester"],

        mata_kuliah: [],
      };
    }
    instructors[key].mata_kuliah.push({
      nama_matkul: row["Nama Mata Kuliah"],
      jurusan: row["Jurusan"],
      kelas: row["Kelas"],
      jenjang_jabatan : row["Jenjang Jabatan"],
      jam: parseFloat(row["Jam"]),
      maks_kjm: 0,
      jumlah_kelas: parseInt(row["Jumlah Kelas"]),
      jumlah_temu: parseFloat(row["Jumlah Temu"]),
      honor_ajar: parseFloat(row["Honor ATS"])
    });
  });

  return Object.values(instructors);
}
function postInstructorData(data) {
  const url =
    "https://hris_backend.ulbi.ac.id/api/v2/honour/assessment/insert";
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      login: `${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      Swal.fire(
        "Success!",
        "Data successfully uploaded and processed.",
        "success"
      ).then((result) => {
        setTimeout(
          () =>
            (window.location.href =
              "https://euis.ulbi.ac.id/hris-dev/app/honor/assessment-master.html"),
          1000
        );
      });
    })
    .catch((error) => {
      Swal.fire("Failed!", "There was an issue uploading your data.", "error");
    });
}

function downloadExcelTemplate() {
  const ws_data = [
    [
      "Nama Pengajar",
      "Status Dosen",
      "Jabatan",
      "Jenjang Jabatan",
      "Phone Number",
      "Nama Mata Kuliah",
      "Jurusan",
      "Kelas",
      "Jam",
      "Jumlah Kelas",
      "Jumlah Temu",
      "Honor ATS",
      "Persentase PPH",
      "Periode Semester",
    ],
  ];

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet(ws_data);
  XLSX.utils.book_append_sheet(wb, ws, "Template");
  XLSX.writeFile(wb, "Honor_Template.xlsx");
  Swal.fire("Unduh!", "Template Berhasil di Unduh.", "success");
}
