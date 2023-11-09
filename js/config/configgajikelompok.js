import { addChild } from "https://jscroot.github.io/element/croot.js";
import { tabletag, templategaji, modaltemp } from "../template/url.js";
import { getRandomClass } from "./config.js";
export const itemsPerPage = 10;
export let currentPage = 1;

export function rendertablekelompok(pageNumber, data) {
  const start = (pageNumber - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const tableBody = document.getElementById('bodycihuy');
  tableBody.innerHTML = ''; // Clear the table body

  for (let i = start; i < end && i < data.length; i++) {
    IsirowHonorProdi(data[i]);
  }
}

export function renderpagingkelompok(data) {
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
      rendertablekelompok(currentPage, data);
      renderpagingkelompok(data);
    });
    pagination.appendChild(previousButton);
  }

  for (let i = startPage; i <= endPage; i++) {
    const pageButton = document.createElement('button');
    pageButton.textContent = i;
    pageButton.addEventListener('click', () => {
      currentPage = i;
      rendertablekelompok(currentPage, data);
      renderpagingkelompok(data);
    });
    pagination.appendChild(pageButton);
  }

  // Add "Next" button
  if (currentPage < totalPages) {
    const nextButton = document.createElement('button');
    nextButton.textContent = 'Next';
    nextButton.addEventListener('click', () => {
      currentPage++;
      rendertablekelompok(currentPage, data);
      renderpagingkelompok(data);
    });
    pagination.appendChild(nextButton);
  }
}
export function IsirowHonorProdi(value) {
    const content = templategaji
      .replace("#nama#", value.nama)
      .replace("#GajiKotor#", value.totalgaji)
      .replace("#TotalPotongan#", value.totalpotongan)
      .replace("#dibayarkan#", value.totalgajibersih);
    addChild("bodycihuy", tabletag, getRandomClass(), content);
  }

export function showSuccessModal(res) {
    const content = modaltemp
    // Assuming you have a modal element with an id "successModal"
    let modal = document.getElementById("successModal");
    let modalContent = modal.querySelector(".modal-content");
    // Display the modal
    modal.style.display = "block";
    modalContent.innerHTML = content;
    // You may want to add additional logic to hide the modal after a certain duration
    setTimeout(() => {
      modal.style.display = "none";
    }, 3000); // Hide the modal after 3 seconds (adjust as needed)
  }