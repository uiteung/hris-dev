document.addEventListener("DOMContentLoaded", function () {
    const addButton = document.getElementById("addButton");
    const courseList = document.getElementById("courseList");
  
    if (addButton) {
      addButton.onclick = function () {
        addCourse(courseList);
      };
    }
  
    courseList.addEventListener("click", function (event) {
      if (event.target.classList.contains("removeButton")) {
        removeCourse(event.target);
      }
    });
  });
  
  function addCourse(courseList) {
    if (courseList.children.length > 0) {
      const newCourse = courseList.children[0].cloneNode(true);
      newCourse.querySelectorAll("input").forEach((input) => (input.value = ""));
      courseList.appendChild(newCourse);
    } else {
      Swal.fire(
        "Gagal!",
        "Setidaknya Masukkan 1 Kelas Walian Untuk Diinputkan.",
        "info"
      );
    }
  }
  
  function removeCourse(button) {
    const courseItem = button.parentNode;
    if (courseItem.parentNode.children.length > 1) {
      courseItem.parentNode.removeChild(courseItem);
    } else {
      Swal.fire("Gagal!", "Setidaknya Masukkan 1 Kelas Walian.", "info");
    }
  }
  