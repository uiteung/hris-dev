import { token } from "../../controller/cookies.js";
//
document.addEventListener("DOMContentLoaded", function () {
  const email = localStorage.getItem("editingEmail");
  if (email) {
    fetchUserDataByEmail(email);
    fetchPangkatOptions();
    // fetchstrukturalOptions();
  } else {
    console.error("No email found in localStorage.");
    Swal.fire("Error", "Email tidak ditemukan di penyimpanan lokal.", "error");
  }
});

function fetchUserDataByEmail(email) {
  const url = `https://hris_backend.ulbi.ac.id/api/v2/master/bio/email?email=${encodeURIComponent(
    email
  )}`;
  fetch(url, {
    method: "GET",
    headers: {
      login: token,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.code === 200 && data.success) {
        populateForm(data.data);
        const userJafung = data.data.jafung || "-";
        fetchJafungOptions(userJafung);
        const userPangkat = data.data.pangkat;
        fetchPangkatOptions(userPangkat);
        const userKelompok = data.data.kelompok;
        fetchKelompokOptions(userKelompok);
      } else {
        Swal.fire(
          "Informasi",
          "Gagal mengambil data: " + (data.status || "Status tidak diketahui"),
          "error"
        );
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      Swal.fire(
        "Error",
        "Terjadi kesalahan saat mengambil data: " + error.message,
        "error"
      );
    });
}
function fetchPangkatOptions(userPangkat) {
  const url = "https://hris_backend.ulbi.ac.id/api/v2/master/pangkat";
  fetch(url, {
    method: "GET",
    headers: {
      login: token,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.code === 200 && data.success) {
        populatePangkatDropdown(data.data, userPangkat);
      } else {
        Swal.fire(
          "Informasi",
          "Gagal mengambil data pangkat: " +
            (data.status || "Status tidak diketahui"),
          "error"
        );
      }
    })
    .catch((error) => {
      console.error("Error fetching pangkat options:", error);
      Swal.fire(
        "Error",
        "Terjadi kesalahan saat mengambil data pangkat: " + error.message,
        "error"
      );
    });
}

function populatePangkatDropdown(pangkatData, userPangkat) {
  const pangkatDropdown = document.getElementById("pangkat");
  pangkatDropdown.innerHTML = "";
  const userPangkatOption = document.createElement("option");
  userPangkatOption.textContent = `${userPangkat} `;
  userPangkatOption.value = userPangkat;
  pangkatDropdown.appendChild(userPangkatOption);
  pangkatData.forEach((pangkat) => {
    if (pangkat.jenis_pangkat !== userPangkat) {
      const option = document.createElement("option");
      option.text = `${pangkat.jenis_pangkat} `;
      option.value = pangkat.jenis_pangkat;
      pangkatDropdown.appendChild(option);
    }
  });
}

function fetchJafungOptions(userJafung) {
  const url = "https://hris_backend.ulbi.ac.id/api/v2/master/jafung";
  fetch(url, {
    method: "GET",
    headers: {
      login: token,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.code === 200 && data.success) {
        populateJafungDropdown(data.data, userJafung);
      } else {
        Swal.fire(
          "Informasi",
          "Gagal mengambil data jafung: " +
            (data.status || "Status tidak diketahui"),
          "error"
        );
      }
    })
    .catch((error) => {
      console.error("Error fetching jafung options:", error);
      Swal.fire(
        "Error",
        "Terjadi kesalahan saat mengambil data jafung: " + error.message,
        "error"
      );
    });
}

function populateJafungDropdown(jafungData, userJafung) {
  const jafungDropdown = document.getElementById("jafung");
  jafungDropdown.innerHTML = "";
  const userJafungOption = document.createElement("option");
  if (userJafung) {
    userJafungOption.textContent = `${userJafung}`;
  } else {
    userJafungOption.textContent = "";
  }
  userJafungOption.value = userJafung;
  jafungDropdown.appendChild(userJafungOption);
  jafungData.forEach((jafung) => {
    if (jafung.nama_jafung !== userJafung) {
      const option = document.createElement("option");
      option.text = `${jafung.nama_jafung} - ${jafung.singkatan}`;
      option.value = jafung.nama_jafung;
      jafungDropdown.appendChild(option);
    }
  });
}

function fetchstrukturalOptions(userstruktural) {
  const url =
    "https://hris_backend.ulbi.ac.id/api/v2/master/jabatan/struktural";
  fetch(url, {
    method: "GET",
    headers: {
      login: token,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.code === 200 && data.success) {
        populatestrukturalDropdown(data.data, userstruktural);
      } else {
        Swal.fire(
          "Informasi",
          "Gagal mengambil data struktural: " +
            (data.status || "Status tidak diketahui"),
          "error"
        );
      }
    })
    .catch((error) => {
      console.error("Error fetching struktural options:", error);
      Swal.fire(
        "Error",
        "Terjadi kesalahan saat mengambil data struktural: " + error.message,
        "error"
      );
    });
}

function populatestrukturalDropdown(strukturalData, userstruktural) {
  const strukturalDropdown = document.getElementById("jabatan");
  strukturalDropdown.innerHTML = "";
  const userstrukturalOption = document.createElement("option");
  if (userstruktural) {
    userstrukturalOption.textContent = `${userstruktural}`;
  } else {
    userstrukturalOption.textContent = "";
  }
  userstrukturalOption.value = userstruktural;
  strukturalDropdown.appendChild(userstrukturalOption);
  strukturalData.forEach((struktural) => {
    if (struktural.nama !== userstruktural) {
      const option = document.createElement("option");
      option.text = `${struktural.nama} - ${struktural.singkatan}`;
      option.value = struktural.nama;
      strukturalDropdown.appendChild(option);
    }
  });
}

function fetchKelompokOptions(userKelompok) {
  const url = "https://hris_backend.ulbi.ac.id/api/v2/master/kelompok";
  fetch(url, {
    method: "GET",
    headers: {
      login: token,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.code === 200 && data.success) {
        populateKelompokDropdown(data.data, userKelompok);
      } else {
        Swal.fire(
          "Informasi",
          "Gagal mengambil data kelompok: " +
            (data.status || "Status tidak diketahui"),
          "error"
        );
      }
    })
    .catch((error) => {
      console.error("Error fetching kelompok options:", error);
      Swal.fire(
        "Error",
        "Terjadi kesalahan saat mengambil data kelompok: " + error.message,
        "error"
      );
    });
}

function populateKelompokDropdown(kelompokData, userKelompok) {
  const kelompokDropdown = document.getElementById("kelompok");
  kelompokDropdown.innerHTML = "";
  const userKelompokOption = document.createElement("option");
  userKelompokOption.textContent = `${userKelompok} `;
  userKelompokOption.value = userKelompok;
  kelompokDropdown.appendChild(userKelompokOption);
  kelompokData.forEach((kelompok) => {
    if (kelompok !== userKelompok) {
      const option = document.createElement("option");
      option.text = kelompok.nama_kelompok;
      option.value = kelompok.nama_kelompok;
      kelompokDropdown.appendChild(option);
    }
  });
}

function populateForm(userData) {
  document.getElementById("nama").value = userData.nama || "-";
  document.getElementById("email").value = userData.email || "-";
  document.getElementById("pangkat").value = userData.pangkat || "-";
  document.getElementById("jabatan").value = userData.jabatan || "-";
  document.getElementById("jafung").value = userData.jafung || "-";
  document.getElementById("status_keluarga").value = userData.status_keluarga;
  document.getElementById("suskel_dirisendiri").value =
    userData.suskel.dirisendiri;
  document.getElementById("suskel_suamiistri").value =
    userData.suskel.suamiistri;
  document.getElementById("suskel_anak").value = userData.suskel.anak;
  document.getElementById("kelompok").value = userData.kelompok;
}

// function populatePangkatDropdown(pangkat) {
//   const pangkatDropdown = document.getElementById("pangkat");
//   const pangkatValue = pangkat.pangkat || "-";
//   const option = document.createElement("option");
//   option.text = pangkatValue;
//   option.value = pangkatValue;
//   pangkatDropdown.appendChild(option);
// }

// function populateJabatanFungsional(userData) {
//   const pangkatDropdown = document.getElementById("jafung");
//   const pangkatValue = userData.jafung || "-";
//   const option = document.createElement("option");
//   option.text = pangkatValue;
//   option.value = pangkatValue;
//   pangkatDropdown.appendChild(option);
// }

// function polpulateKelompok(userData) {
//   const pangkatDropdown = document.getElementById("kelompok");
//   const pangkatValue = userData.kelompok || "-";
//   const option = document.createElement("option");
//   option.text = pangkatValue;
//   option.value = pangkatValue;
//   pangkatDropdown.appendChild(option);
// // }
// function populateKelompokDropdown(selectedKelompok) {
//   const kelompokDropdown = document.getElementById("kelompok");

//   // Mengecek apakah nilai yang diget sudah ada di dropdown
//   const existingOption = Array.from(kelompokDropdown.options).find(
//     (option) => option.value === selectedKelompok
//   );

//   if (existingOption) {
//     existingOption.selected = true;
//   } else {
//     const newOption = document.createElement("option");
//     newOption.value = selectedKelompok;
//     newOption.textContent = selectedKelompok;
//     newOption.selected = true;
//     kelompokDropdown.appendChild(newOption);
//   }
// }

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("editForm");
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    Swal.fire({
      title: "Konfirmasi",
      text: "Apakah Anda yakin ingin memperbarui data ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, perbarui data!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.value) {
        updateUserData();
      }
    });
  });
});

function updateUserData() {
  const email = document.getElementById("email").value; // mendapatkan email dari form
  const url = `https://hris_backend.ulbi.ac.id/api/v2/master/bioupdate?email=${encodeURIComponent(
    email
  )}`;

  const formData = {
    nama: document.getElementById("nama").value,
    email: email,
    pangkat: document.getElementById("pangkat").value,
    jabatan: document.getElementById("jabatan").value,
    jafung:
      document.getElementById("jafung").value === "undefined"
        ? "-"
        : document.getElementById("jafung").value || "-",
    status_keluarga: document.getElementById("status_keluarga").value,
    suskel: {
      dirisendiri: parseInt(
        document.getElementById("suskel_dirisendiri").value
      ),
      suamiistri: parseInt(document.getElementById("suskel_suamiistri").value),
      anak: parseInt(document.getElementById("suskel_anak").value),
    },
    kelompok: document.getElementById("kelompok").value,
  };

  fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      login: token,
    },
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        Swal.fire({
          title: "Berhasil!",
          text: "Data telah berhasil diperbarui.",
          icon: "success",
          confirmButtonText: "OK",
        }).then((result) => {
          setTimeout(
            () =>
              (window.location.href =
                "https://euis.ulbi.ac.id/hris-dev/app/Biodata/biodata-master.html"),
            1000
          );
        });
      } else {
        Swal.fire("Error", "Gagal memperbarui data: " + data.message, "error");
      }
    })
    .catch((error) => {
      console.error("Error updating user data:", error);
      Swal.fire(
        "Error",
        "Terjadi kesalahan saat memperbarui data: " + error.message,
        "error"
      );
    });
}
