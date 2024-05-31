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
        jabatan: row["Jabatan"],
        phone_number: row["Phone Number"],
        mata_kuliah: [],
        total_honor: 0, // Calculate this on the server-side if possible
        pph: parseFloat(row["PPH"]), // Assume the last PPH value for simplicity or calculate differently
        jumlah_dibayar: parseInt(row["Jumlah Dibayar"]), // Assume the last value for simplicity
      };
    }
    instructors[key].mata_kuliah.push({
      nama_matkul: row["Nama Mata Kuliah"],
      jurusan: row["Jurusan"],
      kelas: row["Kelas"],
      jam: parseFloat(row["Jam"]),
      maks_kjm: parseFloat(row["Maks KJM"]),
      jumlah_kelas: row["Jumlah Kelas"],
      jumlah_temu: parseFloat(row["Jumlah Temu"]),
      jam_dibayar: parseFloat(row["Jam Dibayar"]),
      honor_ajar: parseFloat(row["Honor Ajar"]),
    });
    instructors[key].total_honor += parseFloat(row["Honor Ajar"]); // Sum the honor ajar for each course
  });

  return Object.values(instructors);
}
function postInstructorData(data) {
  const url =
    "https://hris_backend.ulbi.ac.id/api/v2/master/honormengajar/insert";
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
              "https://euis.ulbi.ac.id/hris-dev/app/Honor/honor-master.html"),
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
      "Jabatan",
      "Phone Number",
      "Honor Ajar",
      "Jam",
      "Jam Dibayar",
      "Jumlah Dibayar",
      "Jumlah Kelas",
      "Jumlah Temu",
      "Jurusan",
      "Kelas",
      "Maks KJM",
      "Nama Mata Kuliah",
      "PPH",
      "Total Honor",
    ],
  ];

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet(ws_data);
  XLSX.utils.book_append_sheet(wb, ws, "Template");
  XLSX.writeFile(wb, "Honor_Template.xlsx");
  Swal.fire("Unduh!", "Template Berhasil di Unduh.", "success");
}