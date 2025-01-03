const SECRET_KEY = "!uLBi123!"; // Pastikan kunci sama dengan yang digunakan untuk enkripsi

function decryptRole() {
  const encryptedRole = getCookieValue("hris-role");
  if (!encryptedRole) {
    console.error("No encrypted role found in cookies.");
    return null;
  }

  try {
    // Dekripsi nilai dari cookie
    const bytes = CryptoJS.AES.decrypt(encryptedRole, SECRET_KEY);
    const decryptedRole = bytes.toString(CryptoJS.enc.Utf8);

    // Kembalikan role yang didekripsi
    return decryptedRole;
  } catch (error) {
    console.error("Failed to decrypt role:", error);
    return null;
  }
}

// Fungsi untuk membaca cookie
function getCookieValue(cookieName) {
  const cookies = document.cookie.split("; ");
  const cookie = cookies.find((row) => row.startsWith(`${cookieName}=`));
  return cookie ? cookie.split("=")[1] : null;
}

// Dekripsi dan cetak hasilnya
const role = decryptRole();

const sidebarMenus = document.getElementById("sidebar-menus");

if (role === "DTI" || role === "keuangan") {
  sidebarMenus.innerHTML = `
   <li class="sidebar-header">
		Master
		<i
		  class="fa fa-fw fa-check-square-o"
		  style="
			background-color: #ffffff;
			color: rgb(255, 0, 0);
			padding: 2px 5px;
			border-radius: 5px;
			font-size: 6.5px;
		  "
		  >On Progress</i
		>
	  </li>
	  <li class="sidebar-item">
		<a
		  class="sidebar-link"
		  href="https://euis.ulbi.ac.id/hris-dev/app/Biodata/biodata-master.html"
		>
		  <i class="align-middle" data-feather="user"></i>
		  <span class="align-middle">Master Biodata</span>
		</a>
		<ul class="sub-menu">
		  <li class="sidebar-item">
			<a
			  class="sidebar-link"
			  href="https://euis.ulbi.ac.id/hris-dev/app/Biodata/keluarga-master.html"
			>
			  <i class="align-middle" data-feather="users"></i>
			  <span class="align-middle">Komponen Keluarga</span>
			</a>
		  </li>
		  <li class="sidebar-item">
			<a
			  class="sidebar-link"
			  href="https://euis.ulbi.ac.id/hris-dev/app/Biodata/pangkat-master.html"
			>
			  <i class="align-middle" data-feather="user-check"></i>
			  <span class="align-middle">Pangkat/Golongan</span>
			</a>
		  </li>
		  <li class="sidebar-item">
			<a
			  class="sidebar-link"
			  href="https://euis.ulbi.ac.id/hris-dev/app/Biodata/jabatan-fungsional-master.html"
			>
			  <i class="align-middle" data-feather="award"></i>
			  <span class="align-middle">Jabatan Fungsional</span>
			</a>
		  </li>
		  <li class="sidebar-item">
			<a
			  class="sidebar-link"
			  href="https://euis.ulbi.ac.id/hris-dev/app/dikjar/dikjar-master.html"
			>
			  <i class="align-middle" data-feather="book"></i>
			  <span class="align-middle">Maksimal Mengajar</span>
			</a>
		  </li>
		</ul>
	  </li>
	  <li class="sidebar-item">
		<a
		  class="sidebar-link"
		  href="https://euis.ulbi.ac.id/hris-dev/app/Tunjangan/tunjangan-master.html"
		>
		  <i class="align-middle" data-feather="activity"></i>
		  <span class="align-middle">Master Tunjangan</span>
		</a>
	  </li>
	  <li class="sidebar-item">
		<a
		  class="sidebar-link"
		  href="https://euis.ulbi.ac.id/hris-dev/app/Potongan/potongan-master.html"
		>
		  <i class="align-middle" data-feather="credit-card"></i>
		  <span class="align-middle">Master Potongan</span>
		</a>
		<ul class="sub-menu">
		  <li class="sidebar-item">
			<a
			  class="sidebar-link"
			  href="https://euis.ulbi.ac.id/hris-dev/app/Biodata/pph-master.html"
			>
			  <i class="align-middle" data-feather="dollar-sign"></i>
			  <span class="align-middle">Master Pph</span>
			</a>
		  </li>
		</ul>
	  </li>
	  <li class="sidebar-item">
		<a
		  class="sidebar-link"
		  href="https://euis.ulbi.ac.id/hris-dev/app/Doktor/doktor-master.html"
		>
		  <i class="align-middle" data-feather="check"></i>
		  <span class="align-middle">Master Doktor</span>
		</a>
	  </li>
	  <li class="sidebar-header">
		Penggajian
		<i
		  class="fa fa-fw fa-check-square-o"
		  style="
			background-color: #ffffff;
			color: rgb(255, 0, 0);
			padding: 2px 5px;
			border-radius: 5px;
			font-size: 6.5px;
		  "
		  >Testing BETA</i
		>
	  </li>
	  <li class="sidebar-item">
		<a
		  class="sidebar-link"
		  href="https://euis.ulbi.ac.id/hris-dev/app/master-data.html"
		>
		  <i class="align-middle" data-feather="bar-chart-2"></i>
		  <span class="align-middle">Detail Gaji</span>
		</a>
	  </li>
	  <li class="sidebar-item">
		<a
		  class="sidebar-link"
		  href="https://euis.ulbi.ac.id/hris-dev/app/validasi-data.html"
		>
		  <i class="align-middle" data-feather="check"></i>
		  <span class="align-middle">Dashboard Validasi Data</span>
		</a>
	  </li>
	  <li class="sidebar-item">
		<a
		  class="sidebar-link"
		  href="https://euis.ulbi.ac.id/hris-dev/app/history-data.html"
		>
		  <i class="align-middle" data-feather="file-text"></i>
		  <span class="align-middle">History Slip Gaji</span>
		</a>
	  </li>
	  <li class="sidebar-item">
		<a
		  class="sidebar-link"
		  href="https://euis.ulbi.ac.id/hris-dev/app/history-slip-gaji-bulanan.html"
		>
		  <i class="align-middle" data-feather="file-text"></i>
		  <span class="align-middle">History Slip Gaji Perbulan</span>
		</a>
	  </li>
	  <li class="sidebar-header">
		Honor Ajar
		<i
		  class="fa fa-fw fa-check-square-o"
		  style="
			background-color: #ffffff;
			color: rgb(255, 0, 0);
			padding: 2px 5px;
			border-radius: 5px;
			font-size: 6.5px;
		  "
		  >On Progress</i
		>
	  </li>
	  <li class="sidebar-item">
		<a
		  class="sidebar-link"
		  href="https://euis.ulbi.ac.id/hris-dev/app/honor/honor-master.html"
		>
		  <i class="align-middle" data-feather="bar-chart-2"></i>
		  <span class="align-middle">Detail Honor Ajar</span>
		</a>
	  </li>
	  <li class="sidebar-item">
		<a
		  class="sidebar-link"
		  href="https://euis.ulbi.ac.id/hris-dev/app/honor/honor-validasi.html"
		>
		  <i class="align-middle" data-feather="check"></i>
		  <span class="align-middle">Dashboard Validasi Data</span>
		</a>
	  </li>
	  <li class="sidebar-item">
		<a
		  class="sidebar-link"
		  href="https://euis.ulbi.ac.id/hris-dev/app/honor/honor-histori.html"
		>
		  <i class="align-middle" data-feather="file-text"></i>
		  <span class="align-middle">History Slip Honor Ajar</span>
		</a>
	  </li>
	  <li class="sidebar-header">
		Honor Assessment
		<i
		  class="fa fa-fw fa-check-square-o"
		  style="
			background-color: #ffffff;
			color: rgb(255, 0, 0);
			padding: 2px 5px;
			border-radius: 5px;
			font-size: 6.5px;
		  "
		  >On Progress</i
		>
	  </li>
	  <li class="sidebar-item">
		<a
		  class="sidebar-link"
		  href="https://euis.ulbi.ac.id/hris-dev/app/honor/honor-assessment.html"
		>
		  <i class="align-middle" data-feather="bar-chart-2"></i>
		  <span class="align-middle">Detail Honor Assessment</span>
		</a>
	  </li>
	  <li class="sidebar-item">
		<a
		  class="sidebar-link"
		  href="https://euis.ulbi.ac.id/hris-dev/app/honor/assessment-validasi.html"
		>
		  <i class="align-middle" data-feather="check"></i>
		  <span class="align-middle"
			>Dashboard Validasi Honor Assessment</span
		  >
		</a>
	  </li>
	  <li class="sidebar-header">
		Honor Dosen Wali
		<i
		  class="fa fa-fw fa-check-square-o"
		  style="
			background-color: #ffffff;
			color: rgb(255, 0, 0);
			padding: 2px 5px;
			border-radius: 5px;
			font-size: 6.5px;
		  "
		  >On Progress</i
		>
	  </li>
	  <li class="sidebar-item">
		<a
		  class="sidebar-link"
		  href="https://euis.ulbi.ac.id/hris-dev/app/dosenwali/dosenwali-master.html"
		>
		  <i class="align-middle" data-feather="activity"></i>
		  <span class="align-middle">Detail Honor Dosen Wali</span>
		</a>
	  </li>
	  <li class="sidebar-header">
		Honor Prodi
		<i
		  class="fa fa-fw fa-check-square-o"
		  style="
			background-color: #ffffff;
			color: rgb(255, 0, 0);
			padding: 2px 5px;
			border-radius: 5px;
			font-size: 6.5px;
		  "
		  >On Progress</i
		>
	  </li>
	  <li class="sidebar-item">
		<a
		  class="sidebar-link"
		  href="https://euis.ulbi.ac.id/hris-dev/app/prodi/primbon-prodi.html"
		>
		  <i class="align-middle" data-feather="box"></i>
		  <span class="align-middle">Detail Primbon Honor Prodi</span>
		</a>
	  </li>
	  <li class="sidebar-item">
		<a
		  class="sidebar-link"
		  href="https://euis.ulbi.ac.id/hris-dev/app/prodi/prodi-master.html"
		>
		  <i class="align-middle" data-feather="briefcase"></i>
		  <span class="align-middle">Detail Honor Prodi</span>
		</a>
	  </li>
  `;
} else {
  sidebarMenus.innerHTML = `
   <li class="sidebar-header">
		Penggajian
		<i
		  class="fa fa-fw fa-check-square-o"
		  style="
			background-color: #ffffff;
			color: rgb(255, 0, 0);
			padding: 2px 5px;
			border-radius: 5px;
			font-size: 6.5px;
		  "
		  >Testing BETA</i
		>
	  </li>
	  <li class="sidebar-item">
		<a
		  class="sidebar-link"
		  href="https://euis.ulbi.ac.id/hris-dev/app/history-slip-gaji-bulanan.html"
		>
		  <i class="align-middle" data-feather="file-text"></i>
		  <span class="align-middle">History Slip Gaji Perbulan</span>
		</a>
	  </li>
  `;
}

// Fungsi umum untuk penyortiran tabel
function sortTable(table, columnIndex, ascending) {
  const tableBody = table.querySelector("tbody");
  const rows = Array.from(tableBody.querySelectorAll("tr"));

  rows.sort((a, b) => {
    const aValue = a.cells[columnIndex].textContent;
    const bValue = b.cells[columnIndex].textContent;
    return aValue.localeCompare(bValue, undefined, { numeric: true });
  });

  if (!ascending) {
    rows.reverse();
  }

  tableBody.innerHTML = "";

  rows.forEach((row) => tableBody.appendChild(row));
}

// Pasang pendengar acara untuk tombol penyortiran di setiap kolom
const table = document.getElementById("example");
const headerCells = table.querySelectorAll("th");

headerCells.forEach((cell, index) => {
  // Tambahkan tombol arah penyortiran pada setiap header kolom
  cell.innerHTML += '<span class="sort-icon">&#8595;</span>';

  let ascending = true;

  cell.addEventListener("click", () => {
    // Toggle arah penyortiran saat tombol di klik
    ascending = !ascending;

    // Hapus tombol arah penyortiran pada semua kolom
    headerCells.forEach((headerCell) => {
      headerCell.querySelector(".sort-icon").textContent = "";
    });

    // Tambahkan tombol arah penyortiran pada kolom yang di-klik
    cell.querySelector(".sort-icon").textContent = ascending ? "↓" : "↑";

    // Panggil fungsi penyortiran dengan arah yang sesuai
    sortTable(table, index, ascending);
  });
});

// Untuk Sorting Data berdasarkan tanggal (start date to end date)
// Fungsi untuk memeriksa apakah suatu tanggal berada dalam rentang tertentu
function isDateInRange(date, startDate, endDate) {
  return date >= startDate && date <= endDate;
}

// Fungsi untuk menerapkan filter berdasarkan rentang tanggal
function applyDateFilter(table, startDate, endDate) {
  const tableBody = table.querySelector("tbody");
  const rows = Array.from(tableBody.querySelectorAll("tr"));

  rows.forEach((row) => {
    const dateCell = row.cells[3]; // Kolom ke-3 (Tangal)
    const dateValue = new Date(dateCell.textContent);
    row.style.display = isDateInRange(dateValue, startDate, endDate)
      ? ""
      : "none";
  });
}

// Pasang pendengar acara untuk tombol filter berdasarkan tanggal
const startDateInput = document.getElementById("startDate");
const endDateInput = document.getElementById("endDate");
// const filterButton = document.getElementById('filterButton');

// filterButton.addEventListener('click', () => {
// 	const startDateValue = new Date(startDateInput.value);
// 	const endDateValue = new Date(endDateInput.value);

// 	if (!isNaN(startDateValue) && !isNaN(endDateValue)) {
// 		applyDateFilter(table, startDateValue, endDateValue);
// 	}
// });

// Membuat fitur search
// document.addEventListener("DOMContentLoaded", function () {
//     const searchInput = document.getElementById("searchInput");
//     const tableBody = document.getElementById("tablebody").getElementsByTagName("tr");

//     searchInput.addEventListener("input", function () {
//       const searchText = searchInput.value.toLowerCase();

//       for (const row of tableBody) {
//         const cells = row.getElementsByTagName("td");
//         let rowMatchesSearch = false;

//         for (const cell of cells) {
//           if (cell.textContent.toLowerCase().includes(searchText)) {
//             rowMatchesSearch = true;
//             break;
//           }
//         }

//         row.style.display = rowMatchesSearch ? "" : "none";
//       }
//     });
//   });
