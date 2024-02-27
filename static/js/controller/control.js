export function ModalUpdate(email, waktu) {
    Swal.fire({
        title: "<strong>Form Update <b>Data Gaji</b></strong>",
        html: `
        <h3>Silahkan Update data yang perlu diupdate</h3>
        <input type="text" id="gajipokok" class="swal2-input" placeholder="Gaji Pokok">
        <input type="text" id="keluarga" class="swal2-input" placeholder="Keluarga">
        <input type="text" id="pangan" class="swal2-input" placeholder="Pangan">
        <input type="text" id="keahlian" class="swal2-input" placeholder="Keahlian">
        <input type="text" id="fgs/struk" class="swal2-input" placeholder="FGS/Struk">
        <input type="text" id="transport" class="swal2-input" placeholder="Transport">
        <input type="text" id="kehadiran" class="swal2-input" placeholder="Kehadiran">
        <input type="text" id="kopkar" class="swal2-input" placeholder="Kopkar">
        <input type="text" id="bankjabar" class="swal2-input" placeholder="Bank Jabar">
        <input type="text" id="arisan" class="swal2-input" placeholder="Arisan">
        <input type="text" id="bpjstk" class="swal2-input" placeholder="BPJS TK">
        <input type="text" id="bauk" class="swal2-input" placeholder="BAUK">
        <input type="text" id="lain-lain" class="swal2-input" placeholder="Lain - Lain">
        `,
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: `
           Update
        `,
        confirmButtonAriaLabel: "Berhasil",
        cancelButtonText: `
          Cancel
        `,
        cancelButtonAriaLabel: "Gagal"
      })
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


export function validate(email) {
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
