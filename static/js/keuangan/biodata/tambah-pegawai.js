import { token } from "../../controller/cookies.js";

function postData() {
  const url = "https://hris_backend.ulbi.ac.id/api/v2/master/insert";

  const nama = document.getElementById("nama").value;
  const pangkat = document.getElementById("pangkat").value || "0"; // Default to "0" if empty
  const jabatan = document.getElementById("jabatan").value;
  const jafung = document.getElementById("jafung").value || "0";
  const email = document.getElementById("email").value;
  const no_hp =
    document.getElementById("no_handphone").value || "6285156007137";
  const status_keluarga =
    document.getElementById("status_keluarga").value || "0";
  const kelompok = document.getElementById("kelompok").value;

  const suskel_dirisendiri =
    parseFloat(document.getElementById("suskel_dirisendiri").value) || 0;
  const suskel_suamiistri =
    parseFloat(document.getElementById("suskel_suamiistri").value) || 0;
  const suskel_anak =
    parseFloat(document.getElementById("suskel_anak").value) || 0;

  const gajiPokok = parseFloat(document.getElementById("gajiPokok").value) || 0;
  const tunjanganKeluarga =
    parseFloat(document.getElementById("keluarga").value) || 0;
  const tunjanganPangan =
    parseFloat(document.getElementById("pangan").value) || 0;
  const transportasi =
    parseFloat(document.getElementById("transportasi").value) || 0;
  const kehadiran = parseFloat(document.getElementById("kehadiran").value) || 0;

  const kopkar = parseFloat(document.getElementById("kopkar").value) || 0;
  const bankjabar = parseFloat(document.getElementById("bankjabar").value) || 0;
  const arisan = parseFloat(document.getElementById("arisan").value) || 0;
  const bpjstk = parseFloat(document.getElementById("bpjstk").value) || 0;
  const bauk = parseFloat(document.getElementById("bauk").value) || 0;
  const lain2 = parseFloat(document.getElementById("lain2").value) || 0;
  const pph = parseFloat(document.getElementById("pph").value) || 0;

  const data = {
    phone_number: no_hp,
    sub_biodata: {
      nama: nama,
      pangkat: pangkat,
      jafung: jafung,
      jabatan: jabatan,
      email: email,
      status_keluarga: status_keluarga,
      suskel: {
        dirisendiri: suskel_dirisendiri,
        suamiistri: suskel_suamiistri,
        anak: suskel_anak,
      },
      kelompok: kelompok,
    },
    sub_gaji: {
      "gaji-pokok": gajiPokok,
      keluarga: tunjanganKeluarga,
      pangan: tunjanganPangan,
      transportasi: transportasi,
      kehadiran: kehadiran,
    },
    sub_potongan: {
      kopkar: kopkar,
      bankjabar: bankjabar,
      arisan: arisan,
      bpjstk: bpjstk,
      bauk: bauk,
      lain2: lain2,
      pph: pph,
    },
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      login: `${token}`,
    },
    body: JSON.stringify(data),
  };

  Swal.fire({
    title: "Are you sure?",
    text: "Do you want to submit the data?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, submit it!",
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(url, options)
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          Swal.fire(
            "Submitted!",
            "Your data has been submitted.",
            "success"
          ).then(() => {
            window.location.href =
              "https://euis.ulbi.ac.id/hris-dev/app/Biodata/biodata-master.html";
          });
        })
        .catch((error) => {
          console.error("Error:", error);
          Swal.fire(
            "Failed!",
            "There was an issue submitting your data.",
            "error"
          );
        });
    }
  });
}

document.getElementById("submitbutton").addEventListener("click", postData);
