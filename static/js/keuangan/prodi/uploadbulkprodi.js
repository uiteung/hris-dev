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
    const key = row["Nama"] + "_" + row["Jenis Honor"];
    if (!instructors[key]) {
      instructors[key] = {
        nama: row["Nama"],
        bimbingan: {
          jenisBimbingan1: row["Pembimbing 1"],
          pb1: parseInt(row["Jumlah Mahasiswa PB 1"]),
          nominalPB1: parseFloat(0),
          jenisBimbingan2: row["Pembimbing 2"],
          pb2: parseInt(row["Jumlah Mahasiswa PB 2"]),
          nominalPB2: parseFloat(0)
        },
        menguji: {
          jenisMenguji1: row["Jenis Penguji Utama"],
          penguji_utama: parseInt(row["Jumlah Mahasiswa PU"]),
          nominalPU: parseFloat(0),
          jenisMenguji2: row["Jenis Penguji Pendamping"],
          penguji_pendamping: parseInt(row["Jumlah Mahasiswa PP"]),
          nominalPP: parseFloat(0)
        },
        totalHonor: parseFloat(0),
        persentasepph: parseFloat(0),
        pph: parseFloat(0),
        dibayarkan: parseFloat(0),
        jenisHonor: row["Jenis Honor"]
      };
    }
  });
  return Object.values(instructors);
}

function postInstructorData(data) {
  const url =
    "https://hris_backend.ulbi.ac.id/api/v2/prodi/insert";
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
              "https://euis.ulbi.ac.id/hris-dev/app/prodi/prodi-master.html"),
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
      "Nama",
      "Pembimbing 1",
      "Jumlah Mahasiswa PB 1",
      "Pembimbing 2",
      "Jumlah Mahasiswa PB 2",
      "Jenis Penguji Utama",
      "Jumlah Mahasiswa PU",
      "Jenis Penguji Pendamping",
      "Jumlah Mahasiswa PP",
      "Jenis Honor"
    ],
  ];

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet(ws_data);
  XLSX.utils.book_append_sheet(wb, ws, "Template");
  XLSX.writeFile(wb, "Honor_Prodi_Template.xlsx");
  Swal.fire("Unduh!", "Template Berhasil di Unduh.", "success");
}
