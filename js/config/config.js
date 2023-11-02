import { addChild } from "https://jscroot.github.io/element/croot.js";
import { tabletag, templatesdm } from "../template/url.js";
export const itemsPerPage = 10;
export let currentPage = 1;

export function renderTablePage(pageNumber, data) {
  const start = (pageNumber - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const tableBody = document.getElementById('bodycihuy');
  tableBody.innerHTML = ''; // Clear the table body

  for (let i = start; i < end && i < data.length; i++) {
    IsiRowSDM(data[i]);
  }
}

export function renderPagination(data) {
  const pagination = document.getElementById('pagination');

  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Clear existing pagination buttons
  pagination.innerHTML = '';

  // Show 5 pages of pagination
  const maxButtons = 5;
  const middlePage = Math.floor(maxButtons / 2);
  let startPage = Math.max(1, currentPage - middlePage);
  let endPage = Math.min(totalPages, startPage + maxButtons - 1);

  if (endPage - startPage + 1 < maxButtons) {
    startPage = Math.max(1, endPage - maxButtons + 1);
  }

  // Add "Previous" button
  if (currentPage > 1) {
    const previousButton = document.createElement('button');
    previousButton.textContent = 'Previous';
    previousButton.addEventListener('click', () => {
      currentPage--;
      renderTablePage(currentPage, data);
      renderPagination(data);
    });
    pagination.appendChild(previousButton);
  }

  for (let i = startPage; i <= endPage; i++) {
    const pageButton = document.createElement('button');
    pageButton.textContent = i;
    pageButton.addEventListener('click', () => {
      currentPage = i;
      renderTablePage(currentPage, data);
      renderPagination(data);
    });
    pagination.appendChild(pageButton);
  }

  // Add "Next" button
  if (currentPage < totalPages) {
    const nextButton = document.createElement('button');
    nextButton.textContent = 'Next';
    nextButton.addEventListener('click', () => {
      currentPage++;
      renderTablePage(currentPage, data);
      renderPagination(data);
    });
    pagination.appendChild(nextButton);
  }
}


export function IsiRowSDM(value) {
  const content = templatesdm
    .replace("#nama#", value.full_name)
    .replace("#email#", value.email)
    .replace("#notelp#", value.nomor_telepon)
    .replace("#kelompok#", value.kelompok)
    .replace("#jabatan#", value.nama_jabatan);
  addChild("bodycihuy", tabletag, getRandomClass(), content);
}

let counter = 0;

export function getRandomClass() {
  const classes = [
    "text-xs bg-gray-50",
    "text-xs",
  ];

  const randomClass = classes[counter % classes.length];
  counter++;
  return randomClass;
}
