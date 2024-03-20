import { getBadgeMarkup } from "../style/badge.js";
import { GetdatabyEmail, ValidasiData } from "./template.js";


export function ModalUpdate(header, waktu) {
    fetch(GetdatabyEmail + waktu, {
        method: 'GET',
        headers: header
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
            const pokok = data.data['pokok'];
            const keluarga = data.data['keluarga'];
            const pangan = data.data['pangan'];
            const kinerja = data.data['kinerja'];
            const keahlian = data.data['keahlian'];
            const struk = data.data['fgs-struk'];
            const transportasi = data.data['transportasi'];
            const kehadiran = data.data['kehadiran'];
            const kopkar = data.data['kopkar'];
            const bankJabar = data.data['bankJabar'];
            const arisan = data.data['arisan'];
            const bpjs = data.data['bpjs'];
            const bauk = data.data['bauk'];
            const pph = data.data['pph'];
            const lain2 = data.data['lain2'];

            Swal.fire({
                title: "<strong>Form Update <b>Data Gaji</b></strong>",
                html:` 
                <span style="text-align: left; position: relative;">Gaji Pokok</span>
                <input type="text" id="gajipokok" class="swal2-input" placeholder="Gaji Pokok" value="${pokok}"><br><br>
                <span style="text-align: left; position: relative;">Tunjangan Keluarga</span>
                <input type="text" id="keluarga" class="swal2-input" placeholder="Keluarga" value="${keluarga}"><br><br>
                <span style="text-align: left; position: relative;">Tunjangan Pangan</span>
                <input type="text" id="pangan" class="swal2-input" placeholder="Pangan" value="${pangan}"><br><br>
                <span style="text-align: left; position: relative;">Tunjangan Kinerja</span>
                <input type="text" id="kinerja" class="swal2-input" placeholder="kinerja" value="${kinerja}"><br><br>
                <span style="text-align: left; position: relative;">Tunjangan Keahlian</span>
                <input type="text" id="keahlian" class="swal2-input" placeholder="keahlian" value="${keahlian}"><br><br>
                <span style="text-align: left; position: relative;">Tunjangan Stuktural/Fungsional</span>
                <input type="text" id="fgs/struk" class="swal2-input" placeholder="FGS/Struk" value="${struk}"><br><br>
                <span style="text-align: left; position: relative;">Tunjangan Transportasi</span>
                <input type="text" id="transport" class="swal2-input" placeholder="Transport" value="${transportasi}"><br><br>
                <span style="text-align: left; position: relative;">Tunjangan Kehadiran</span>
                <input type="text" id="kehadiran" class="swal2-input" placeholder="Kehadiran" value="${kehadiran}"><br><br>
                <span style="text-align: left; position: relative;">Potongan Kopkar</span>
                <input type="text" id="kopkar" class="swal2-input" placeholder="Kopkar" value="${kopkar}"><br><br>
                <span style="text-align: left; position: relative;">Potongan Bank Jabar</span>
                <input type="text" id="bankjabar" class="swal2-input" placeholder="Bank Jabar" value="${bankJabar}"><br><br>
                <span style="text-align: left; position: relative;">Potongan Arisan</span>
                <input type="text" id="arisan" class="swal2-input" placeholder="Arisan" value="${arisan}"><br><br>
                <span style="text-align: left; position: relative;">Potongan BPJS</span>
                <input type="text" id="bpjstk" class="swal2-input" placeholder="BPJS TK" value="${bpjs}"><br><br>
                <span style="text-align: left; position: relative;">Potongan BAUK</span>
                <input type="text" id="bauk" class="swal2-input" placeholder="BAUK" value="${bauk}"><br><br>
                <span style="text-align: left; position: relative;">Potongan Lain - lain</span>
                <input type="text" id="lain-lain" class="swal2-input" placeholder="Lain - Lain" value="${lain2}"><br><br>
                <span style="text-align: left; position: relative;">Potongan PPH</span>
                <input type="text" id=pph" class="swal2-input" placeholder="pph" value="${pph}"><br><br>
                `,
                showCloseButton: true,
                showCancelButton: true,
                focusConfirm: false,
                confirmButtonText: `
                   Update
                `,
                confirmButtonAriaLabel: data.success,
                cancelButtonText: `
                  Cancel
                `,
                cancelButtonAriaLabel: "Gagal"
              })
            }
        })
      .catch(error => {
        console.error("Error while updating data:", error);
      });
}

export function getLastMonth() {
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


export function validate(email, header, date) {
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

export function Batal(email, header, date) {
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


  export function responseSearch(data) {
    Swal.fire({
      title: data.success,
      text: "Berhasil Mencari data",
      icon: "success"
    });

    console.log(data)

    let inhtm = document.getElementById("tablebody")

    inhtm.innerHTML = "";

    const barisBaru = document.createElement("tr");

      barisBaru.innerHTML= `
              <td>
                  <div class="d-flex align-items-center">
                      <div class="ms-3">
                          <p class="fw-bold mb-1">${data.data[0].nama}</p>
                          <p class="text-muted mb-0">${data.data[0].email}</p>
                      </div>
                  </div>
              </td>
              <td style="text-align: center; vertical-align: middle">
                <p class="fw-normal mb-1">${getLastMonth()}</p>
              </td>
              <td style="text-align: center; vertical-align: middle">
                <p class="fw-normal mb-1"><b>${data.data[0].pokok}</b></p>
              </td>
              <td style="text-align: center; vertical-align: middle">
                  <p class="fw-normal mb-1">${data.data[0].keluarga}</p>
              </td>
              <td style="text-align: center; vertical-align: middle">
                  <p class="fw-normal mb-1">${data.data[0].pangan}</p>
              </td>
              <td style="text-align: center; vertical-align: middle">
                <p class="fw-normal mb-1">${data.data[0].kinerja}</p>
              </td>
              <td style="text-align: center; vertical-align: middle">
                <p class="fw-normal mb-1">${data.data[0].keahlian}</p>
              </td>
              <td style="text-align: center; vertical-align: middle">
                <p class="fw-normal mb-1"><b>${data.data[0]['fgs-struk']}</b></p>
              </td>
              <td style="text-align: center; vertical-align: middle">
              <p class="fw-normal mb-1">${data.data[0].transportasi}</p>
              </td>
                <td style="text-align: center; vertical-align: middle">
                <p class="fw-normal mb-1">${data.data[0].kehadiran}</p>
                </td>
                <td style="text-align: center; vertical-align: middle">
                <p class="fw-normal mb-1">${data.data[0].kopkar}</p>
                </td>
                <td style="text-align: center; vertical-align: middle">
                <p class="fw-normal mb-1">${data.data[0].bankJabar}</p>
                </td>
                <td style="text-align: center; vertical-align: middle">
                <p class="fw-normal mb-1">${data.data[0].arisan}</p>
                </td>
                <td style="text-align: center; vertical-align: middle">
                <p class="fw-normal mb-1">${data.data[0].bpjs}</p>
                </td>
                <td style="text-align: center; vertical-align: middle">
                <p class="fw-normal mb-1">${data.data[0].bauk}</p>
                </td>
                <td style="text-align: center; vertical-align: middle">
                <p class="fw-normal mb-1">${data.data[0].lain2}</p>
                </td>
                <td style="text-align: center; vertical-align: middle">
                <p class="fw-normal mb-1">${data.data[0].pph}</p>
                </td>
                <td style="text-align: center; vertical-align: middle">
                <p class="fw-normal mb-1">totalgaji</p>
                </td>
                <td style="text-align: center; vertical-align: middle">
                <p class="fw-normal mb-1">totalpotongan}</p>
                </td>
                <td style="text-align: center; vertical-align: middle">
                <p class="fw-normal mb-1">totalgajibersih</p>
                </td>
                <td style="text-align: center; vertical-align: middle">
                <p class="fw-normal mb-1">${getBadgeMarkup(data.data[0].validasi)}</p>
                </td>
                <td style="text-align: center; vertical-align: middle">
                <a href="#" class="edit" data-email-id="${data.data[0].email}">
                <svg class="feather feather-check" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                <polyline points="20 6 9 17 4 12"/>
                </svg>
                </a>
                <a href="#" class="remove" data-email-i="${data.data[0].email}">
                <svg class="feather feather-x" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                <line x1="18" x2="6" y1="6" y2="18"/>
                <line x1="6" x2="18" y1="6" y2="18"/>
              </svg>
              </a>
                <a href="#" class="update" data-email-u="${data.data[0].email}">
                  <svg class="feather feather-edit" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                  </svg
                </a>
                </td>
      `;

      inhtm.appendChild(barisBaru)
  }