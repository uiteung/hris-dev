import { token } from "../../controller/cookies.js"; // Adjust path as needed

document.addEventListener("DOMContentLoaded", function () {
  const bulkUploadButton = document.getElementById("bulkUploadButton");
  bulkUploadButton.addEventListener("click", handleFileUpload);
});
function handleFileUpload() {
  const fileInput = document.getElementById("fileUpload");
  const file = fileInput.files[0];
  if (file) {
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
    alert("Please select a file to upload.");
  }
}

function groupCoursesByInstructor(data) {
  const instructors = {};

  data.forEach((row) => {
    const key = row["Phone Number"]; // Use phone number as the unique identifier
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
      console.log("Success:", data);
      alert("Data successfully uploaded and processed.");
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Failed to upload data.");
    });
}
