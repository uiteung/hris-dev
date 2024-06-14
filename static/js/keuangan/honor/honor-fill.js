import { token } from "../../controller/cookies.js";
document.addEventListener("DOMContentLoaded", function () {
  const inputName = document.getElementById("name");
  const dropdown = document.getElementById("customDropdown");

  inputName.addEventListener("input", function () {
    const key = this.value;
    if (key.length < 1) {
      dropdown.style.display = "none";
      return;
    }

    fetch(
      `https://hris_backend.ulbi.ac.id/api/v2/master/bio/pilihan?nama=${key}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          login: token,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        dropdown.innerHTML = "";
        if (data.data.length) {
          dropdown.style.display = "block";
          data.data.forEach((item) => {
            const optionDiv = document.createElement("div");
            optionDiv.textContent = item.nama;
            optionDiv.dataset.phone_number = item.phone_number;
            optionDiv.dataset.jafung = item.jafung;
            optionDiv.onclick = function () {
              inputName.value = this.textContent;
              document.getElementById("phone_number").value =
                this.dataset.phone_number;
              document.getElementById("jabatan").value = this.dataset.jafung;

              dropdown.style.display = "none";
            };
            dropdown.appendChild(optionDiv);
          });
        } else {
          dropdown.style.display = "none";
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        dropdown.style.display = "none";
      });
  });

  // Hide dropdown when clicking outside
  document.addEventListener("click", function (event) {
    if (!inputName.contains(event.target)) {
      dropdown.style.display = "none";
    }
  });
});
