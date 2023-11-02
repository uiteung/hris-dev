import { addChild } from "https://jscroot.github.io/element/croot.js";
import { tabletag, templatehonorprodi } from "../template/url.js";
import { getRandomClass } from "./config.js";
export const itemsPerPage = 10;
export let currentPage = 1;

export function rendertableprodi(pageNumber, data) {
  const start = (pageNumber - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const tableBody = document.getElementById('bodycihuy');
  tableBody.innerHTML = ''; // Clear the table body

  for (let i = start; i < end && i < data.length; i++) {
    IsirowHonorProdi(data[i]);
  }
}

export function renderpagingprodi(data) {
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
      rendertableprodi(currentPage, data);
      renderpagingprodi(data);
    });
    pagination.appendChild(previousButton);
  }

  for (let i = startPage; i <= endPage; i++) {
    const pageButton = document.createElement('button');
    pageButton.textContent = i;
    pageButton.addEventListener('click', () => {
      currentPage = i;
      rendertableprodi(currentPage, data);
      renderpagingprodi(data);
    });
    pagination.appendChild(pageButton);
  }

  // Add "Next" button
  if (currentPage < totalPages) {
    const nextButton = document.createElement('button');
    nextButton.textContent = 'Next';
    nextButton.addEventListener('click', () => {
      currentPage++;
      rendertableprodi(currentPage, data);
      renderpagingprodi(data);
    });
    pagination.appendChild(nextButton);
  }
}
export function IsirowHonorProdi(value) {
    const content = templatehonorprodi
      .replace("#nama#", value.nama_dosen)
      .replace("#jabatan#", value.jabatan_struktural)
      .replace("#honorkotor", value.jumlah_honor_kotor)
      .replace("#potongan#", value.pph)
      .replace("#honorbersih#", value.jumlah_honor_bersih);
    addChild("bodycihuy", tabletag, getRandomClass(), content);
  }