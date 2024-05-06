import { token } from "../controller/cookies.js";
import { getLastMonth } from "../controller/control.js";
function fetchDataFromHRIS() {
  const url =
    "https://hris_backend.ulbi.ac.id/api/v2/rkp/raw/" + getLastMonth();

  if (token) {
    fetch(url, {
      method: "GET",
      headers: {
        login: `${token}`,
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Terjadi kesalahan saat mengambil data rekapitulasi. Silakan coba lagi."
          );
        }
        return response.json();
      })
      .then((data) => {
        // Call a function to populate the table with data
        populateTableWithData(data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
        });
      });
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Anda belum login. Silakan login terlebih dahulu.",
    });
  }
}

function populateTableWithData(data) {
  const tableBody = document.getElementById("tablebody");
  tableBody.innerHTML = ""; // Clear existing table data

  // Iterate over each item in the data array
  data.forEach((item) => {
    const struk = item["fgs-struk"];
    const row = `<tr>
    
    <td style="">
    <div class="d-flex align-items-center" style="width: 100%; max-width:100%" >
        <div class="ms-3"style="width: 100%; max-width:100%" >
            <p class="fw-bold mb-3 text-left" style="font-size: 12px;  white-space: pre-line;">${
              item.nama
            }</p>
            <p class="text-muted text-left " style="font-size: 12px;  white-space: pre-line;">${
              item.email
            }</p>
        </div>
    </div>
</td>

        <td>${item.jabatan}</td> 
        <td>${item["gaji-pokok"]}</td>
        <td>${item.keluarga}</td>
        <td>${item.pangan}</td>
        <td>${item.kinerja}</td> 
        <td>${item.keahlian}</td>
        <td>${struk}</td>
        <td>${item.transportasi}</td>
        <td>${item.kehadiran}</td>
        <td>${item.kopkar}</td>
        <td>${item.bankJabar}</td>
        <td>${item.arisan}</td>
        <td>${item.bpjs}</td>
        <td>${item.bauk}</td>
        <td>${item.lain2}</td>
        <td>${item.pph}</td>
        <td>${item.totalgaji}</td>
        <td>${item.totalpotongan}</td>
        <td>${item.totalgajibersih}</td>
        <td>${item.validasi ? "Validated" : "Not Validated"}</td>
        <td><button class="btn btn-primary">Action</button></td>
      </tr>`;

    tableBody.innerHTML += row;
  });
}

// Call the function to fetch and display the data
fetchDataFromHRIS();
