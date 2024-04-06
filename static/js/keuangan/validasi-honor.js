// Import function & library yang dibutuhkan
import { CihuyId } from "https://c-craftjs.github.io/element/element.js";
import { CihuyDomReady } from "https://c-craftjs.github.io/table/table.js";
import { UrlDetailHonor, ValidasiHonor } from "../controller/template.js";

// Untuk Autentifikasi Login User Tertentu
import { token } from "../controller/cookies.js";
import { BatchValidateHonor, CancelHonor, ModalUpdate, getLastMonth } from "../controller/control.js";
import { getBadgeMarkup } from "../style/badge.js";

var header = new Headers();
header.append("login", token);
header.append("Content-Type", "application/json");

const requestOptions = {
  method: "GET",
  headers: header
};
  
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
  let halamannow = 1;
  let filteredData = []; // To store the filtered data for search
  let totalData = 0;
  // Ambil data masuk
  fetch(UrlDetailHonor  + date, requestOptions)
    .then((result) => result.json())
    .then((rekapharian) => {
        let rkp = rekapharian.data

        if (rkp.length === 0 ) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Data Honor Bulan Ini belum ada',
          });
        }

        // console.log(rkp)

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
            }
          });

          // Button Pagination (Selanjutnya)
          buttonselanjutnya.addEventListener("click", () => {
            const totalPages = Math.ceil(totalData / itemperpage);
            if (halamannow < totalPages) {
              halamannow++;
              displayData(halamannow);
              updatePagination();
            }
          })
        //   console.log(rekapharian)
    });

  // Fungsi Untuk Menampilkan Data
  function displayData(page) {
    const mulaiindex = (page - 1) * itemperpage;
    const akhirindex = mulaiindex + itemperpage;
    const rowsToShow = filteredData.slice(mulaiindex, akhirindex);;
    document.getElementById("tablebody").innerHTML = "";

    // Iterasi melalui rowsToShow dan membangun baris tabel
    rowsToShow.forEach((combinedEntry) => {
      console.log(combinedEntry)
      // Ekstrak data yang relevan
      const nama = combinedEntry['nama'];
      const pph = combinedEntry['pph'];
      const totalhonor = combinedEntry['total-honor'];
      const totaldibayarkan = combinedEntry['total-dibayarkan'];
      const Validasi = combinedEntry['validasi'];
    //   console.log(struk)

      const barisBaru = document.createElement("tr");
        barisBaru.innerHTML= `
        <tr>
        <td>
            <div class="d-flex align-items-center">
                <div class="ms-3">
                    <p class="fw-bold mb-1">${nama}</p>
                </div>
            </div>
        </td>
        <td style="text-align: center; vertical-align: middle">
            <p class="fw-normal mb-1">${pph}</p>
        </td>
        <td style="text-align: center; vertical-align: middle">
            <p class="fw-normal mb-1"><b>${totalhonor}</b></p>
        </td>
        <td style="text-align: center; vertical-align: middle">
            <p class="fw-normal mb-1">${totaldibayarkan}</p>
        </td>
        <td style="text-align: center; vertical-align: middle">
            <p class="fw-normal mb-1">${getBadgeMarkup(Validasi)}</p>
        </td>
        <td style="text-align: center; vertical-align: middle">
            <a href="#" class="edit" data-email-id="${nama}">
                <svg class="feather feather-check" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                    <polyline points="20 6 9 17 4 12"/>
                </svg>
            </a>
            <a href="#" class="remove" data-email-i="${nama}">
                <svg class="feather feather-x" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                    <line x1="18" x2="6" y1="6" y2="18"/>
                    <line x1="6" x2="18" y1="6" y2="18"/>
                </svg>
            </a>
        </td>
      `;


      document.getElementById("tablebody").appendChild(barisBaru);
      // const updatebutton = barisBaru.querySelector(".update");
      // updatebutton.addEventListener("click", () => {
      //   const dataemail = updatebutton.getAttribute("data-email-u");
      //   if (dataemail) {
      //     header.append("email", dataemail);
      //     // ModalUpdate(header, date);
      //   } else {
      //     console.error("Data gaji dengan email " + dataemail + " tidak ditemukan");
      //   }
      // });


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
                  BatchValidateHonor(dataemail, header, date);   
                  localStorage.setItem('currentPage', halamannow);
                
                }
              });
        } else {
          console.error("Data Honor dengan nama " + dataemail + " tidak ditemukan");
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
                  CancelHonor(dataemail, header, date); 
                  localStorage.setItem('currentPage', halamannow);
               }
              });
        } else {
          console.error("Data Honor dengan nama " + dataemail + " tidak ditemukan");
        }
      });
    });
  
      // document.getElementById("tablebody").innerHTML = tableData;
      updatePagination()
    }


  // Fungsi Untuk Update Pagination
  function updatePagination() {
    halamansaatini.textContent = `Halaman ${halamannow}`;
  }
});