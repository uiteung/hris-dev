import { token } from "../controller/cookies.js";
//
let generated = false
document.addEventListener("DOMContentLoaded", function () {
  const email = localStorage.getItem("editingEmail");
  if (email) {
    fetchUserDataByEmail(email);
    // fetchstrukturalOptions();
  } else {
    console.error("No email found in localStorage.");
    Swal.fire("Error", "Email tidak ditemukan di penyimpanan lokal.", "error");
  }
});

const waktu = localStorage.getItem("editingWaktu");

function fetchUserDataByEmail(email) {
  const url = `https://hris_backend.ulbi.ac.id/api/v2/wage/byemail/${waktu}?email=${encodeURIComponent(
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
        const userPangkat = data.data.pangkat;
        fetchPangkatOptions(userPangkat);
        const userKelompok = data.data.kelompok;
        fetchKelompokOptions(userKelompok);
        fetchstrukturalOptions(data.data.jabatan);
        generated = data.data.generated
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
  const pangkatDropdown = document.getElementById("rank");
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

function formatRupiah(number) {
  const format = number.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });
  return format;
}
function formatAsRupiah(input) {
  let value = input.value;
  // Remove all characters except digits and comma
  value = value.replace(/[^0-9]/g, "");
  // Convert string to an integer
  let number = parseInt(value, 10);
  if (isNaN(number)) {
    number = 0;
  }
  // Format the number with Indonesian locale to add thousand separators
  value = number.toLocaleString("id-ID");
  // Prepend 'Rp' and a space to denote Rupiah
  input.value = `Rp ${value}`;
}

// Attach event listeners to the input fields
document.addEventListener("DOMContentLoaded", function () {
  const currencyFields = [
    "basicSalary",
    "rapel_gaji",
    "familyAllowance",
    "foodAllowance",
    "performanceAllowance",
    "expertiseAllowance",
    "structuralAllowance",
    "transportationAllowance",
    "attendanceAllowance",
    "kopkarDeduction",
    "bankJabarDeduction",
    "arisanDeduction",
    "bpjsDeduction",
    "baukDeduction",
    "otherDeductions",
    "pphDeduction",
  ];
  currencyFields.forEach((fieldId) => {
    const inputField = document.getElementById(fieldId);
    inputField.addEventListener("input", () => formatAsRupiah(inputField));
  });
});
function populateForm(userData) {
  document.getElementById("name").value = userData.nama || "";
  document.getElementById("email").value = userData.email || "";
  document.getElementById("rank").value = userData.pangkat || "";
  document.getElementById("position").value = userData.jabatan || "";
  document.getElementById("waktu").value = userData.waktu || "";
  document.getElementById("validasi").value = userData.validasi || "";
  document.getElementById("basicSalary").value = formatRupiah(
    userData.pokok || 0
  );
  document.getElementById("rapel_gaji").value = formatRupiah(
    userData.rapel_gaji || 0
  );
  document.getElementById("familyAllowance").value = formatRupiah(
    userData.keluarga || 0
  );
  document.getElementById("foodAllowance").value = formatRupiah(
    userData.pangan || 0
  );
  document.getElementById("performanceAllowance").value = formatRupiah(
    userData.kinerja || 0
  );
  document.getElementById("expertiseAllowance").value = formatRupiah(
    userData.keahlian || 0
  );
  document.getElementById("structuralAllowance").value = formatRupiah(
    userData["fgs-struk"] || 0
  );
  document.getElementById("transportationAllowance").value = formatRupiah(
    userData.transportasi || 0
  );
  document.getElementById("attendanceAllowance").value = formatRupiah(
    userData.kehadiran || 0
  );
  document.getElementById("kopkarDeduction").value = formatRupiah(
    userData.kopkar || 0
  );
  document.getElementById("bankJabarDeduction").value = formatRupiah(
    userData.bankJabar || 0
  );
  document.getElementById("arisanDeduction").value = formatRupiah(
    userData.arisan || 0
  );
  document.getElementById("bpjsDeduction").value = formatRupiah(
    userData.bpjs || 0
  );
  document.getElementById("baukDeduction").value = formatRupiah(
    userData.bauk || 0
  );
  document.getElementById("otherDeductions").value = formatRupiah(
    userData.lain2 || 0
  );
  document.getElementById("pphDeduction").value = formatRupiah(
    userData.pph || 0
  );
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
  const url = `https://hris_backend.ulbi.ac.id/api/v2/wage/update/${waktu}?email=${encodeURIComponent(
    email
  )}`;
  const parseRupiahToFloat = (value) => {
    return parseFloat(value.replace(/[^0-9]/g, ""));
  };
  let validasi = false
  let val = document.getElementById("validasi").value
  if (val !== "true") {
    validasi = false
  } else {
    validasi = true

  }
  const formData = {
    nama: document.getElementById("name").value,
    email: document.getElementById("email").value,
    pangkat: document.getElementById("rank").value,
    jabatan: document.getElementById("position").value,
    kelompok: document.getElementById("kelompok").value,
    pokok: parseRupiahToFloat(document.getElementById("basicSalary").value),
    rapel_gaji: parseRupiahToFloat(document.getElementById("rapel_gaji").value),
    keluarga: parseRupiahToFloat(
      document.getElementById("familyAllowance").value
    ),
    pangan: parseRupiahToFloat(document.getElementById("foodAllowance").value),
    kinerja: parseRupiahToFloat(
      document.getElementById("performanceAllowance").value
    ),
    keahlian: parseRupiahToFloat(
      document.getElementById("expertiseAllowance").value
    ),
    ["fgs-struk"]: parseRupiahToFloat(
      document.getElementById("structuralAllowance").value
    ),
    transportasi: parseRupiahToFloat(
      document.getElementById("transportationAllowance").value
    ),
    kehadiran: parseRupiahToFloat(
      document.getElementById("attendanceAllowance").value
    ),
    kopkar: parseRupiahToFloat(
      document.getElementById("kopkarDeduction").value
    ),
    bankJabar: parseRupiahToFloat(
      document.getElementById("bankJabarDeduction").value
    ),
    arisan: parseRupiahToFloat(
      document.getElementById("arisanDeduction").value
    ),
    bpjs: parseRupiahToFloat(document.getElementById("bpjsDeduction").value),
    bauk: parseRupiahToFloat(document.getElementById("baukDeduction").value),
    lain2: parseRupiahToFloat(document.getElementById("otherDeductions").value),
    pph: parseRupiahToFloat(document.getElementById("pphDeduction").value),
    waktu: document.getElementById("waktu").value,
    validasi: validasi,
    generated: generated,
  };

  console.log(document.getElementById("validasi").value)
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
                "https://euis.ulbi.ac.id/hris-dev/app/history-slip-gaji-bulanan.html"),
            1000
          );
        });
      } else {
        Swal.fire("Error", "Gagal memperbarui data: " + data.status, "error");
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
