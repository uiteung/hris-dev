import { getBadgeMarkup } from "../style/badge.js";
import { token } from "./cookies.js";
import { GetdatabyEmail, URLUpdategaji, UrlDetailHonor, ValidasiData } from "./template.js";


let nama1 , pangkat1 , jabatan1 , email1 , gaji1 , keluarga1 , pangan1, kinerja1 , keahlian1 , fgsstruk1 ,  transport1 , kehadiran1 ,  kopkar1 , bankjabar1 , arisan1 , bpjstk1 , bauk1 , lain21 , pph1 
let nama2, email2, pangkat2,jabatan2,gajiPokok2,keluarga2,pangan2,keahlian2,kinerja2,transport2,kehadiran2,kopkar2,arisan2,bankjabar2,bpjstk2,bauk2,pph2,lain22,fgsstruk2, datas

var header = new Headers();
header.append("login", token);
header.append("Content-Type", "application/json");

export function ModalUpdate(header, waktu) {
    fetch(GetdatabyEmail + waktu, {
        method: 'GET',
        headers: header
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
            const nama = data.data['nama'];
            const email = data.data['email'];
            const pangkat = data.data['pangkat']
            const jabatan = data.data['jabatan']
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
            const validasi = data.data['validasi'];
            const kelompok = data.data['kelompok'];

            Swal.fire({
                title: "<strong>Form Update <b>Data Gaji</b></strong>",
                html:` 
                <input type="text" id="nama" class="swal2-input" placeholder="Gaji Pokok" value="${nama}"disabled><br><br>
                <input type="text" id="email" class="swal2-input" placeholder="Gaji Pokok" value="${email}"disabled><br><br>
                <span style="text-align: left; position: relative;">Pangkat</span>
                <input type="text" id="pangkat" class="swal2-input" placeholder="Gaji Pokok" value="${pangkat}"disabled><br><br>
                <span style="text-align: left; position: relative;">Jabatan</span>
                <input type="text" id="jabatan" class="swal2-input" placeholder="Gaji Pokok" value="${jabatan}"disabled><br><br>
                <span style="text-align: left; position: relative;">Gaji Pokok</span>
                <input type="number" id="gajipokok" class="swal2-input" placeholder="Gaji Pokok" value="${pokok}"><br><br>
                <span style="text-align: left; position: relative;">Tunjangan Keluarga</span>
                <input type="number" id="keluarga" class="swal2-input" placeholder="Keluarga" value="${keluarga}"><br><br>
                <span style="text-align: left; position: relative;">Tunjangan Pangan</span>
                <input type="number" id="pangan" class="swal2-input" placeholder="Pangan" value="${pangan}"><br><br>
                <span style="text-align: left; position: relative;">Tunjangan Kinerja</span>
                <input type="number" id="kinerja" class="swal2-input" placeholder="kinerja" value="${kinerja}"><br><br>
                <span style="text-align: left; position: relative;">Tunjangan Keahlian</span>
                <input type="number" id="keahlian" class="swal2-input" placeholder="keahlian" value="${keahlian}"><br><br>
                <span style="text-align: left; position: relative;">Tunjangan Stuktural/Fungsional</span>
                <input type="number" id="fgs" class="swal2-input" placeholder="FGS/Struk" value="${struk}"><br><br>
                <span style="text-align: left; position: relative;">Tunjangan Transportasi</span>
                <input type="number" id="transport" class="swal2-input" placeholder="Transport" value="${transportasi}"><br><br>
                <span style="text-align: left; position: relative;">Tunjangan Kehadiran</span>
                <input type="number" id="kehadiran" class="swal2-input" placeholder="Kehadiran" value="${kehadiran}"><br><br>
                <span style="text-align: left; position: relative;">Potongan Kopkar</span>
                <input type="number" id="kopkar" class="swal2-input" placeholder="Kopkar" value="${kopkar}"><br><br>
                <span style="text-align: left; position: relative;">Potongan Bank Jabar</span>
                <input type="number" id="bankjabar" class="swal2-input" placeholder="Bank Jabar" value="${bankJabar}"><br><br>
                <span style="text-align: left; position: relative;">Potongan Arisan</span>
                <input type="number" id="arisan" class="swal2-input" placeholder="Arisan" value="${arisan}"><br><br>
                <span style="text-align: left; position: relative;">Potongan BPJS</span>
                <input type="number" id="bpjstk" class="swal2-input" placeholder="BPJS TK" value="${bpjs}"><br><br>
                <span style="text-align: left; position: relative;">Potongan BAUK</span>
                <input type="number" id="bauk" class="swal2-input" placeholder="BAUK" value="${bauk}"><br><br>
                <span style="text-align: left; position: relative;">Potongan Lain - lain</span>
                <input type="number" id="lain-lain" class="swal2-input" placeholder="Lain - Lain" value="${lain2}"><br><br>
                <span style="text-align: left; position: relative;">Potongan PPH</span>
                <input type="number" id="pph" class="swal2-input" placeholder="pph" value="${pph}"><br><br>
                `,
                showCloseButton: true,
                showCancelButton: true,
                focusConfirm: false,
                didOpen:() => {
                  const popup = Swal.getPopup();
                   nama1 = popup.querySelector("#nama")
                   pangkat1 = popup.querySelector("#pangkat")
                   jabatan1 = popup.querySelector("#jabatan")
                   email1 = popup.querySelector("#email")
                   gaji1 = popup.querySelector("#gajipokok") // Define gaji here
                   keluarga1 = popup.querySelector("#keluarga")
                   pangan1= popup.querySelector("#pangan")
                   kinerja1 = popup.querySelector("#kinerja")
                    keahlian1 = popup.querySelector("#keahlian")
                   fgsstruk1 = popup.querySelector("#fgs")
                    transport1 = popup.querySelector("#transport")
                   kehadiran1 = popup.querySelector("#kehadiran")
                    kopkar1 = popup.querySelector("#kopkar")
                   bankjabar1 = popup.querySelector("#bankjabar")
                   arisan1 = popup.querySelector("#arisan")
                   bpjstk1 = popup.querySelector("#bpjstk")
                   bauk1 = popup.querySelector("#bauk")
                   lain21 = popup.querySelector("#lain-lain")
                   pph1 = popup.querySelector("#pph")
                  nama1.addEventListener('keyup', (event) => {
                    if (event.key === 'Enter') Swal.clickConfirm();
                  });
                  pangkat1.addEventListener('keyup', (event) => {
                    if (event.key === 'Enter') Swal.clickConfirm();
                  });
                  jabatan1.addEventListener('keyup', (event) => {
                    if (event.key === 'Enter') Swal.clickConfirm();
                  });
                  email1.addEventListener('keyup', (event) => {
                    if (event.key === 'Enter') Swal.clickConfirm();
                  });
                  gaji1.addEventListener('keyup', (event) => { // Add event listener for gaji
                    if (event.key === 'Enter') Swal.clickConfirm();
                  });
                  pangan1.addEventListener('keyup', (event) => {
                    if (event.key === 'Enter') Swal.clickConfirm();
                  });
                  keluarga1.addEventListener('keyup', (event) => {
                    if (event.key === 'Enter') Swal.clickConfirm();
                  });
                  kinerja1.addEventListener('keyup', (event) => {
                    if (event.key === 'Enter') Swal.clickConfirm();
                  });
                  keahlian1.addEventListener('keyup', (event) => {
                    if (event.key === 'Enter') Swal.clickConfirm();
                  });
                  fgsstruk1.addEventListener('keyup', (event) => {
                    if (event.key === 'Enter') Swal.clickConfirm();
                  });
                  transport1.addEventListener('keyup', (event) => {
                    if (event.key === 'Enter') Swal.clickConfirm();
                  });
                  kehadiran1.addEventListener('keyup', (event) => {
                    if (event.key === 'Enter') Swal.clickConfirm();
                  });
                  kopkar1.addEventListener('keyup', (event) => {
                    if (event.key === 'Enter') Swal.clickConfirm();
                  });
                  bankjabar1.addEventListener('keyup', (event) => {
                    if (event.key === 'Enter') Swal.clickConfirm();
                  });
                  arisan1.addEventListener('keyup', (event) => {
                    if (event.key === 'Enter') Swal.clickConfirm();
                  });
                  bpjstk1.addEventListener('keyup', (event) => {
                    if (event.key === 'Enter') Swal.clickConfirm();
                  });
                  bauk1.addEventListener('keyup', (event) => {
                    if (event.key === 'Enter') Swal.clickConfirm();
                  });
                  lain21.addEventListener('keyup', (event) => {
                    if (event.key === 'Enter') Swal.clickConfirm();
                  });
                  pph1.addEventListener('keyup', (event) => {
                    if (event.key === 'Enter') Swal.clickConfirm();
                  });
                },
                preConfirm: () => {
                   nama2 = nama1.value;
                   email2 = email1.value;
                   pangkat2 = pangkat1.value;
                   jabatan2 = jabatan1.value;
                   gajiPokok2 = gaji1.value;
                   keluarga2 = keluarga1.value;
                   pangan2 = pangan1.value;
                   keahlian2 = keahlian1.value;
                   kinerja2 = kinerja1.value;
                   transport2 = transport1.value;
                   kehadiran2 = kehadiran1.value;
                   kopkar2 = kopkar1.value;
                   arisan2 = arisan1.value;
                   bankjabar2 = bankjabar1.value;
                   bpjstk2 = bpjstk1.value;
                   bauk2 = bauk1.value;
                   pph2 = pph1.value;
                   lain22 = lain21.value;
                   fgsstruk2 = fgsstruk1.value;
                    datas = {
                    nama: nama2,
                    email: email2,
                    pangkat: pangkat2,
                    jabatan: jabatan2,
                    pokok: parseFloat(gajiPokok2),
                    keluarga: parseFloat(keluarga2),
                    pangan: parseFloat(pangan2),
                    kinerja: parseFloat(kinerja2),
                    'fgs-struk': parseFloat(fgsstruk2),
                    keahlian: parseFloat(keahlian2),
                    transportasi: parseFloat(transport2),
                    kehadiran: parseFloat(kehadiran2),
                    kopkar: parseFloat(kopkar2),
                    bank_jabar: parseFloat(bankjabar2),
                    bpjs: parseFloat(bpjstk2),
                    bauk: parseFloat(bauk2),
                    pph: parseFloat(pph2),
                    lain2: parseFloat(lain22),
                    arisan: parseFloat(arisan2),
                    validasi: validasi,
                    kelompok: kelompok
                };
                // console.log(data);
                },
                showCancelButton: true,
                confirmButtonText: "Update",
                cancelButtonText: "Batal",
              }).then((result) => {
                if (result.isConfirmed) {
                  UpdateGaji(email2, header, getLastMonth(), datas);
              }
            })
            }
        }).catch(error => {
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


  export function UpdateGaji(email, header, date, data) {
    fetch(URLUpdategaji + date, {
        method: 'PUT',
        headers: header,
        body: JSON.stringify(data)
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
    data.data.forEach((item) => {
      const barisBaru = document.createElement("tr");
  
      barisBaru.innerHTML = `
      <td>
      <div class="d-flex align-items-center">
          <div class="ms-3">
              <p class="fw-bold mb-1">${item.nama}</p>
              <p class="text-muted mb-0">${item.email}</p>
          </div>
      </div>
  </td>
  <td style="text-align: center; vertical-align: middle">
    <p class="fw-normal mb-1">${getLastMonth()}</p>
  </td>
  <td style="text-align: center; vertical-align: middle">
    <p class="fw-normal mb-1"><b>${item['gaji-pokok']}</b></p>
  </td>
  <td style="text-align: center; vertical-align: middle">
      <p class="fw-normal mb-1">${item.keluarga}</p>
  </td>
  <td style="text-align: center; vertical-align: middle">
      <p class="fw-normal mb-1">${item.pangan}</p>
  </td>
  <td style="text-align: center; vertical-align: middle">
    <p class="fw-normal mb-1">${item.kinerja}</p>
  </td>
  <td style="text-align: center; vertical-align: middle">
    <p class="fw-normal mb-1">${item.keahlian}</p>
  </td>
  <td style="text-align: center; vertical-align: middle">
    <p class="fw-normal mb-1"><b>${item['struk']}</b></p>
  </td>
  <td style="text-align: center; vertical-align: middle">
  <p class="fw-normal mb-1">${item.transportasi}</p>
  </td>
    <td style="text-align: center; vertical-align: middle">
    <p class="fw-normal mb-1">${item.kehadiran}</p>
    </td>
    <td style="text-align: center; vertical-align: middle">
    <p class="fw-normal mb-1">${item.kopkar}</p>
    </td>
    <td style="text-align: center; vertical-align: middle">
    <p class="fw-normal mb-1">${item.bankJabar}</p>
    </td>
    <td style="text-align: center; vertical-align: middle">
    <p class="fw-normal mb-1">${item.arisan}</p>
    </td>
    <td style="text-align: center; vertical-align: middle">
    <p class="fw-normal mb-1">${item.bpjs}</p>
    </td>
    <td style="text-align: center; vertical-align: middle">
    <p class="fw-normal mb-1">${item.bauk}</p>
    </td>
    <td style="text-align: center; vertical-align: middle">
    <p class="fw-normal mb-1">${item.lain2}</p>
    </td>
    <td style="text-align: center; vertical-align: middle">
    <p class="fw-normal mb-1">${item.pph}</p>
    </td>
    <td style="text-align: center; vertical-align: middle">
    <p class="fw-normal mb-1">${item['totalgaji']}</p>
    </td>
    <td style="text-align: center; vertical-align: middle">
    <p class="fw-normal mb-1">${item['totalpotongan']}</p>
    </td>
    <td style="text-align: center; vertical-align: middle">
    <p class="fw-normal mb-1">${item['totalgajibersih']}</p>
    </td>
    <td style="text-align: center; vertical-align: middle">
    <p class="fw-normal mb-1">${getBadgeMarkup(item.validasi)}</p>
    </td>
    <td style="text-align: center; vertical-align: middle">
    <a href="#" class="edit" data-email-id="${item.email}">
    <svg class="feather feather-check" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
    <polyline points="20 6 9 17 4 12"/>
    </svg>
    </a>
    <a href="#" class="remove" data-email-i="${item.email}">
    <svg class="feather feather-x" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
    <line x1="18" x2="6" y1="6" y2="18"/>
    <line x1="6" x2="18" y1="6" y2="18"/>
  </svg>
  </a>
    <a href="#" class="update" data-email-u="${item.email}">
      <svg class="feather feather-edit" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
      </svg
    </a>
    </td>
      `;
  
      // Append the newly created row to your table
      inhtm.appendChild(barisBaru);

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
                validate(dataemail, header, getLastMonth());   
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
        header.append("email", dataemail);
        ModalUpdate(header, getLastMonth());
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
                Batal(dataemail, header, getLastMonth()); 
                localStorage.setItem('currentPage', halamannow);
             }
            });
      } else {
        console.error("Data gaji dengan email " + dataemail + " tidak ditemukan");
      }
    });
  });
  }


  export function responseFilter(data) {
    Swal.fire({
      title: data.success,
      text: "Berhasil Mencari data",
      icon: "success"
    });

    console.log(data)

    let inhtm = document.getElementById("tablebody")

    inhtm.innerHTML = "";
    data.data.forEach((item) => {
      const barisBaru = document.createElement("tr");
  
      barisBaru.innerHTML = `
      <td>
      <div class="d-flex align-items-center">
          <div class="ms-3">
              <p class="fw-bold mb-1">${item.nama}</p>
              <p class="text-muted mb-0">${item.email}</p>
          </div>
      </div>
  </td>
  <td style="text-align: center; vertical-align: middle">
    <p class="fw-normal mb-1">${getLastMonth()}</p>
  </td>
  <td style="text-align: center; vertical-align: middle">
    <p class="fw-normal mb-1"><b>${item.pokok}</b></p>
  </td>
  <td style="text-align: center; vertical-align: middle">
      <p class="fw-normal mb-1">${item.keluarga}</p>
  </td>
  <td style="text-align: center; vertical-align: middle">
      <p class="fw-normal mb-1">${item.pangan}</p>
  </td>
  <td style="text-align: center; vertical-align: middle">
    <p class="fw-normal mb-1">${item.kinerja}</p>
  </td>
  <td style="text-align: center; vertical-align: middle">
    <p class="fw-normal mb-1">${item.keahlian}</p>
  </td>
  <td style="text-align: center; vertical-align: middle">
    <p class="fw-normal mb-1"><b>${item['fgs-struk']}</b></p>
  </td>
  <td style="text-align: center; vertical-align: middle">
  <p class="fw-normal mb-1">${item.transportasi}</p>
  </td>
    <td style="text-align: center; vertical-align: middle">
    <p class="fw-normal mb-1">${item.kehadiran}</p>
    </td>
    <td style="text-align: center; vertical-align: middle">
    <p class="fw-normal mb-1">${item.kopkar}</p>
    </td>
    <td style="text-align: center; vertical-align: middle">
    <p class="fw-normal mb-1">${item.bankJabar}</p>
    </td>
    <td style="text-align: center; vertical-align: middle">
    <p class="fw-normal mb-1">${item.arisan}</p>
    </td>
    <td style="text-align: center; vertical-align: middle">
    <p class="fw-normal mb-1">${item.bpjs}</p>
    </td>
    <td style="text-align: center; vertical-align: middle">
    <p class="fw-normal mb-1">${item.bauk}</p>
    </td>
    <td style="text-align: center; vertical-align: middle">
    <p class="fw-normal mb-1">${item.lain2}</p>
    </td>
    <td style="text-align: center; vertical-align: middle">
    <p class="fw-normal mb-1">${item.pph}</p>
    </td>
    <td style="text-align: center; vertical-align: middle">
    <p class="fw-normal mb-1">${item['totalgaji']}</p>
    </td>
    <td style="text-align: center; vertical-align: middle">
    <p class="fw-normal mb-1">${item['totalpotongan']}</p>
    </td>
    <td style="text-align: center; vertical-align: middle">
    <p class="fw-normal mb-1">${item['totalgajibersih']}</p>
    </td>
    <td style="text-align: center; vertical-align: middle">
    <p class="fw-normal mb-1">${getBadgeMarkup(item.validasi)}</p>
    </td>
    <td style="text-align: center; vertical-align: middle">
    <a href="#" class="edit" data-email-id="${item.email}">
    <svg class="feather feather-check" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
    <polyline points="20 6 9 17 4 12"/>
    </svg>
    </a>
    <a href="#" class="remove" data-email-i="${item.email}">
    <svg class="feather feather-x" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
    <line x1="18" x2="6" y1="6" y2="18"/>
    <line x1="6" x2="18" y1="6" y2="18"/>
  </svg>
  </a>
    <a href="#" class="update" data-email-u="${item.email}">
      <svg class="feather feather-edit" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
      </svg
    </a>
    </td>
      `;
  
      // Append the newly created row to your table
      inhtm.appendChild(barisBaru);

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
                validate(dataemail, header, getLastMonth());   
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
        header.append("email", dataemail);
        ModalUpdate(header, getLastMonth());
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
                Batal(dataemail, header, getLastMonth()); 
                localStorage.setItem('currentPage', halamannow);
             }
            });
      } else {
        console.error("Data gaji dengan email " + dataemail + " tidak ditemukan");
      }
    });
  });
  // updatePagination()
  }

    // Fungsi Untuk Update Pagination
