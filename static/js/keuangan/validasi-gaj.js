// Import function & library yang dibutuhkan
import { CihuyId } from "https://c-craftjs.github.io/element/element.js";
import { CihuyDomReady } from "https://c-craftjs.github.io/table/table.js";
import { getBadgeMarkup } from "../style/badge.js";
import { GetDataValidasi, ValidasiData} from "../controller/template.js";

// Untuk Autentifikasi Login User Tertentu
import { token } from "../controller/cookies.js";

var header = new Headers();
header.append("login", token);
header.append("Content-Type", "application/json");

const requestOptions = {
  method: "GET",
  headers: header
};


function getLastMonth() {
    // Get the current date
    const currentTime = new Date();
  
    // Subtract one month from the current date
    currentTime.setMonth(currentTime.getMonth() - 1);
  
    // Format the date as "YYYYMM"
    const year = currentTime.getFullYear();
    const month = (currentTime.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based, so add 1
    const formattedDate = `${year}${month}`;
  
    return formattedDate;
  }
  
  // Call the function to get the last month
  const date = getLastMonth();
  
  // Print the last month
  console.log("Last Month:", date);


// Untuk Get All data Presensi
CihuyDomReady(() => {
//   const tablebody = CihuyId("tablebody");
  const buttonsebelumnya = CihuyId("prevPageBtn");
  const buttonselanjutnya = CihuyId("nextPageBtn");
  const halamansaatini = CihuyId("currentPage");
  const itemperpage =6;
  let halamannow = localStorage.getItem('currentPage') || 1;
  let filteredData = []; // To store the filtered data for search
  let totalData = 0;
  // Ambil data masuk
  fetch(GetDataValidasi  + getLastMonth(), requestOptions)
    .then((result) => result.json())
    .then((rekapharian) => {
        let rkp = rekapharian.data

          // Inisialisasi data tabel
          totalData = rkp.length;
          filteredData = rkp;

          // Untuk Memunculkan Pagination Halamannya
          displayData(halamannow);
          updatePagination();

          // Button Pagination (Sebelumnya)
          buttonsebelumnya.addEventListener("click", () => {
            if (halamannow > 1) {
              halamannow--;
              displayData(halamannow);
              updatePagination();
              localStorage.setItem('currentPage', halamannow);
            }
          });

          // Button Pagination (Selanjutnya)
          buttonselanjutnya.addEventListener("click", () => {
            const totalPages = Math.ceil(totalData / itemperpage);
            if (halamannow < totalPages) {
              halamannow++;
              displayData(halamannow);
              updatePagination();
              localStorage.setItem('currentPage', halamannow);
            }
          })
        //   console.log(rekapharian)
    });

  // Fungsi Untuk Menampilkan Data
  function displayData(page) {
    const mulaiindex = (page - 1) * itemperpage;
    const akhirindex = mulaiindex + itemperpage;
    const rowsToShow = filteredData.slice(mulaiindex, akhirindex);

    let tableData = "";
    document.getElementById("tablebody").innerHTML = "";

    // Iterasi melalui rowsToShow dan membangun baris tabel
    rowsToShow.forEach((combinedEntry) => {

      // Ekstrak data yang relevan
      const nama = combinedEntry.nama;
      const email = combinedEntry.email;
      const waktu = date;
      const pokok = combinedEntry['gaji-pokok'];
      const keluarga = combinedEntry['keluarga'];
      const pangan = combinedEntry['pangan'];
      const kinerja = combinedEntry['kinerja'];
      const keahlian = combinedEntry['keahlian'];
      const struk = combinedEntry['struk'];
      const transportasi = combinedEntry['transportasi'];
      const kehadiran = combinedEntry['kehadiran'];
      const kopkar = combinedEntry['kopkar'];
      const bankJabar = combinedEntry['bankJabar'];
      const bpjs = combinedEntry['bpjs'];
      const bauk = combinedEntry['bauk'];
      const pph = combinedEntry['pph'];
      const lain2 = combinedEntry['lain2'];
      const arisan = combinedEntry['arisan'];
      const totalgaji = combinedEntry['totalgaji'];
      const totalgajibersih = combinedEntry['totalgajibersih'];
      const totalpotongan = combinedEntry['totalpotongan'];
      const statusvalidasi = combinedEntry['validasi'];
    //   console.log(struk)

      const barisBaru = document.createElement("tr");

      barisBaru.innerHTML= `
              <td>
                  <div class="d-flex align-items-center">
                      <div class="ms-3">
                          <p class="fw-bold mb-1">${nama}</p>
                          <p class="text-muted mb-0">${email}</p>
                      </div>
                  </div>
              </td>
              <td style="text-align: center; vertical-align: middle">
                <p class="fw-normal mb-1">${waktu}</p>
              </td>
              <td style="text-align: center; vertical-align: middle">
                <p class="fw-normal mb-1"><b>${pokok}</b></p>
              </td>
              <td style="text-align: center; vertical-align: middle">
                  <p class="fw-normal mb-1">${keluarga}</p>
              </td>
              <td style="text-align: center; vertical-align: middle">
                  <p class="fw-normal mb-1">${pangan}</p>
              </td>
              <td style="text-align: center; vertical-align: middle">
                <p class="fw-normal mb-1">${kinerja}</p>
              </td>
              <td style="text-align: center; vertical-align: middle">
                <p class="fw-normal mb-1">${keahlian}</p>
              </td>
              <td style="text-align: center; vertical-align: middle">
                <p class="fw-normal mb-1"><b>${struk}</b></p>
              </td>
              <td style="text-align: center; vertical-align: middle">
              <p class="fw-normal mb-1">${transportasi}</p>
              </td>
                <td style="text-align: center; vertical-align: middle">
                <p class="fw-normal mb-1">${kehadiran}</p>
                </td>
                <td style="text-align: center; vertical-align: middle">
                <p class="fw-normal mb-1">${kopkar}</p>
                </td>
                <td style="text-align: center; vertical-align: middle">
                <p class="fw-normal mb-1">${bankJabar}</p>
                </td>
                <td style="text-align: center; vertical-align: middle">
                <p class="fw-normal mb-1">${arisan}</p>
                </td>
                <td style="text-align: center; vertical-align: middle">
                <p class="fw-normal mb-1">${bpjs}</p>
                </td>
                <td style="text-align: center; vertical-align: middle">
                <p class="fw-normal mb-1">${bauk}</p>
                </td>
                <td style="text-align: center; vertical-align: middle">
                <p class="fw-normal mb-1">${lain2}</p>
                </td>
                <td style="text-align: center; vertical-align: middle">
                <p class="fw-normal mb-1">${pph}</p>
                </td>
                <td style="text-align: center; vertical-align: middle">
                <p class="fw-normal mb-1">${totalgaji}</p>
                </td>
                <td style="text-align: center; vertical-align: middle">
                <p class="fw-normal mb-1">${totalpotongan}</p>
                </td>
                <td style="text-align: center; vertical-align: middle">
                <p class="fw-normal mb-1">${totalgajibersih}</p>
                </td>
                <td style="text-align: center; vertical-align: middle">
                <p class="fw-normal mb-1">${getBadgeMarkup(statusvalidasi)}</p>
                </td>
                <td style="text-align: center; vertical-align: middle">
                <a href="#" class="edit" data-email-id="${email}">
                <svg class="feather feather-check" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                <polyline points="20 6 9 17 4 12"/>
                </svg>
                </a>
                <a href="#" class="remove" data-email-i="${email}">
                <svg class="feather feather-x" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                <line x1="18" x2="6" y1="6" y2="18"/>
                <line x1="6" x2="18" y1="6" y2="18"/>
              </svg>
              </a>
                <a href="#" class="update" data-email-u="${email}">
                  <svg class="feather feather-edit" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                  </svg
                </a>
                </td>
      `;

      document.getElementById("tablebody").appendChild(barisBaru);
    // Add event listeners to the buttons (outside of the loop)
    const editButton = barisBaru.querySelector(".edit");
    editButton.addEventListener("click", () => {
      const dataemail = editButton.getAttribute("data-email-id");
      if (dataemail) {
          Swal.fire({
              title: "Validasi Data Gaji?",
              text: "Apakah Anda yakin ingin menvalidasi data ini?",
              icon: "question",
              showCancelButton: true,
              confirmButtonText: "Ya, Update",
              cancelButtonText: "Batal",
            }).then((result) => {
              if (result.isConfirmed) {
                // Kirim permintaan PUT/UPDATE ke server tanpa gambar
                validate(dataemail);   
                localStorage.setItem('currentPage', halamannow);
              
              }
            });
      } else {
        console.error("Data gaji dengan email " + dataemail + " tidak ditemukan");
      }
    });



    document.getElementById("tablebody").appendChild(barisBaru);
    // Add event listeners to the buttons (outside of the loop)
    const updatebutton = barisBaru.querySelector(".update");
    updatebutton.addEventListener("click", () => {
      const dataemail = updatebutton.getAttribute("data-email-u");
      if (dataemail) {
        Swal.fire({
          title: "<strong>Form Update <b>Data Gaji</b></strong>",
          html: `
          <input type="text" id="username" class="swal2-input" placeholder="Gaji Pokok">
          <input type="text" id="password" class="swal2-input" placeholder="Keluarga">
          <input type="text" id="password" class="swal2-input" placeholder="Pangan">
          <input type="text" id="password" class="swal2-input" placeholder="Keahlian">
          <input type="text" id="password" class="swal2-input" placeholder="FGS/Struk">
          <input type="text" id="password" class="swal2-input" placeholder="Transport">
          <input type="text" id="password" class="swal2-input" placeholder="Kehadiran">
          <input type="text" id="password" class="swal2-input" placeholder="Kopkar">
          <input type="text" id="password" class="swal2-input" placeholder="Bank Jabar">
          <input type="text" id="password" class="swal2-input" placeholder="Arisan">
          <input type="text" id="password" class="swal2-input" placeholder="BPJS TK">
          <input type="text" id="password" class="swal2-input" placeholder="BAUK">
          <input type="text" id="password" class="swal2-input" placeholder="Lain - Lain">
          `,
          showCloseButton: true,
          showCancelButton: true,
          focusConfirm: false,
          confirmButtonText: `
             Confirm!
          `,
          confirmButtonAriaLabel: "Berhasil",
          cancelButtonText: `
            Cancel
          `,
          cancelButtonAriaLabel: "Gagal"
        });
      } else {
        console.error("Data gaji dengan email " + dataemail + " tidak ditemukan");
      }
    });


    const batalbutton = barisBaru.querySelector(".remove");
    batalbutton.addEventListener("click", () => {
      const dataemail = batalbutton.getAttribute("data-email-i");
      if (dataemail) {
          Swal.fire({
              title: "Batal Validasi?",
              text: "Apakah Anda yakin ingin Membatalkan Validasi?",
              icon: "question",
              showCancelButton: true,
              confirmButtonText: "Ya",
              cancelButtonText: "Batal",
            }).then((result) => {
              if (result.isConfirmed) {
                // Kirim permintaan PUT/UPDATE ke server tanpa gambar
                Batal(dataemail); 
                localStorage.setItem('currentPage', halamannow);
             }
            });
      } else {
        console.error("Data gaji dengan email " + dataemail + " tidak ditemukan");
      }
    });
  });

    // document.getElementById("tablebody").innerHTML = tableData;
    updatePagination();

  }

  function validate(email) {
    const postData = {
        nama: '',
        email: email,
        tanggal_tahun: date,
        validate : true
      };
      console.log(postData)
    fetch(ValidasiData, {
        method: 'POST',
        headers: header,
        body: JSON.stringify(postData)
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          // Display success SweetAlert
    
          Swal.fire({
            icon : 'success',
            title: 'Data Gaji Berhasil Divalidasi!',
            backdrop: `
              rgba(0,0,123,0.4)
            `
          }).
          then(() => {
            // Refresh the page after successful addition
            window.location.href = 'validasi-data.html';
          });
        } else {
          // Display error SweetAlert
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: data.status,
          });
        }
      })
      .catch(error => {
        console.error("Error while updating data:", error);
      });
  }

  function Batal(email) {
    const postData = {
        nama: '',
        email: email,
        tanggal_tahun: date,
        validate : false
      };
    fetch(ValidasiData, {
        method: 'POST',
        headers: header,
        body: JSON.stringify(postData)
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          // Display success SweetAlert
    
          Swal.fire({
            icon : 'success',
            title: 'Validasi Berhasil Dibatalkan!',
            backdrop: `
              rgba(0,0,123,0.4)
            `
          }).
          // Swal.fire({
          //   icon: 'success',
          //   title: 'Data Rekap Hari ini Berhasil Diupdate!',
          // }).
          then(() => {
            // Refresh the page after successful addition
            window.location.href = 'validasi-data.html';
          });
        } else {
          // Display error SweetAlert
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Data rekap Gagal Diupdate!',
          });
        }
      })
      .catch(error => {
        console.error("Error while updating data:", error);
      });
  }

  // Fungsi Untuk Update Pagination
  function updatePagination() {
    halamansaatini.textContent = `Halaman ${halamannow}`;
  }
});