import { token } from "../controller/cookies.js";
//
document.addEventListener("DOMContentLoaded", function () {
  const email = localStorage.getItem("editingEmail");
  if (email) {
    fetchUserDataByEmail(email);
    fetchstrukturalOptions();
  } else {
    console.error("No email found in localStorage.");
    Swal.fire("Error", "Email tidak ditemukan di penyimpanan lokal.", "error");
  }
});

function fetchUserDataByEmail(email) {
  const url = `https://hris_backend.ulbi.ac.id/api/v2/wagemst/getbyemail?email=${encodeURIComponent(
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
        // Mengisi form dengan data yang didapat
        const userKelompok = data.data.kelompok;
        fetchKelompokOptions(userKelompok);
        fetchstrukturalOptions(data.data.jabatan);
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

function fetchstrukturalOptions(currentJabatan) {
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
        populatestrukturalDropdown(data.data, currentJabatan);
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
  const strukturalDropdown = document.getElementById("position");
  strukturalDropdown.innerHTML = "";
  let foundUserStruktural = false; // Flag to check if user's position exists in the list

  strukturalData.forEach((struktural) => {
    const option = document.createElement("option");
    option.text = `${struktural.nama} - ${struktural.singkatan}`;
    option.value = struktural.nama; // Assuming the value should just be the name

    if (struktural.nama === userstruktural) {
      option.selected = true;
      foundUserStruktural = true;
    }
    strukturalDropdown.appendChild(option);
  });

  // If the user's position was not found in the list, add it and select it
  if (!foundUserStruktural && userstruktural) {
    const option = document.createElement("option");
    option.text = userstruktural; // Assuming no abbreviation is provided
    option.value = userstruktural;
    option.selected = true;
    strukturalDropdown.appendChild(option);
  }
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
  const uniqueKelompok = new Set();

  // Ensure the user's current kelompok is added first and marked as selected
  uniqueKelompok.add(userKelompok);

  kelompokData.forEach((kelompok) => {
    uniqueKelompok.add(kelompok.nama_kelompok);
  });

  uniqueKelompok.forEach((kelompok) => {
    const option = document.createElement("option");
    option.text = kelompok;
    option.value = kelompok;
    if (kelompok === userKelompok) {
      option.selected = true;
    }
    kelompokDropdown.appendChild(option);
  });
}

function populateForm(userData) {
  document.getElementById("name").value = userData.nama || "";
  document.getElementById("email").value = userData.email || "";
  document.getElementById("rank").value = userData.pangkat || "";
  document.getElementById("position").value = userData.jabatan || "";
  document.getElementById("basicSalary").value = userData.pokok;
  document.getElementById("familyAllowance").value = userData.keluarga;
  document.getElementById("foodAllowance").value = userData.pangan;
  document.getElementById("performanceAllowance").value = userData.kinerja;
  document.getElementById("expertiseAllowance").value = userData.keahlian;
  document.getElementById("structuralAllowance").value = userData["fgs-struk"];
  document.getElementById("transportationAllowance").value =
    userData.transportasi;
  document.getElementById("attendanceAllowance").value = userData.kehadiran;
  document.getElementById("kopkarDeduction").value = userData.kopkar;
  document.getElementById("bankJabarDeduction").value = userData.bankJabar;
  document.getElementById("arisanDeduction").value = userData.arisan;
  document.getElementById("bpjsDeduction").value = userData.bpjs;
  document.getElementById("baukDeduction").value = userData.bauk;
  document.getElementById("otherDeductions").value = userData.lain2;
  document.getElementById("pphDeduction").value = userData.pph;
}

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
  const url = `https://hris_backend.ulbi.ac.id/api/v2/wagemst/update?email=${encodeURIComponent(
    email
  )}`;

  const formData = {
    nama: document.getElementById("name").value,
    email: document.getElementById("email").value,
    pangkat: document.getElementById("rank").value,
    jabatan: document.getElementById("position").value,
    kelompok: document.getElementById("kelompok").value,
    pokok: parseFloat(document.getElementById("basicSalary").value),
    keluarga: parseFloat(document.getElementById("familyAllowance").value),
    pangan: parseFloat(document.getElementById("foodAllowance").value),
    kinerja: parseFloat(document.getElementById("performanceAllowance").value),
    keahlian: parseFloat(document.getElementById("expertiseAllowance").value),
    fgs_struk: parseFloat(document.getElementById("structuralAllowance").value),
    transportasi: parseFloat(
      document.getElementById("transportationAllowance").value
    ),
    kehadiran: parseFloat(document.getElementById("attendanceAllowance").value),
    kopkar: parseFloat(document.getElementById("kopkarDeduction").value),
    bankJabar: parseFloat(document.getElementById("bankJabarDeduction").value),
    arisan: parseFloat(document.getElementById("arisanDeduction").value),
    bpjs: parseFloat(document.getElementById("bpjsDeduction").value),
    bauk: parseFloat(document.getElementById("baukDeduction").value),
    lain2: parseFloat(document.getElementById("otherDeductions").value),
    pph: parseFloat(document.getElementById("pphDeduction").value),
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
                "https://euis.ulbi.ac.id/hris-dev/app/master-data.html"),
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
