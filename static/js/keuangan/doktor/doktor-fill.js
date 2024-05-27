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
      `https://hris_backend.ulbi.ac.id/api/v2/master/bio/search?key=${key}`,
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
        if (data.data.data_query.length) {
          dropdown.style.display = "block";
          data.data.data_query.forEach((item) => {
            const optionDiv = document.createElement("div");
            optionDiv.textContent = item.nama;
            optionDiv.dataset.email = item.email;
            optionDiv.dataset.jafung = item.jafung;
            optionDiv.dataset.jabatan = item.jabatan;
            optionDiv.onclick = function () {
              inputName.value = this.textContent;
              document.getElementById("email").value = this.dataset.email;
              document.getElementById("jafung").value = this.dataset.jafung;
              document.getElementById("jabatan_struktural").value =
                this.dataset.jabatan;
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
