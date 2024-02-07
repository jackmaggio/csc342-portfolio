const coursesContainer = document.querySelector("#courses");
// const logoutButton = document.querySelector("#logout-button");

// logoutButton.addEventListener("click", () => {
//   document.location = "/menu";
// });

document.addEventListener("DOMContentLoaded", async () => {
  await fetch("/api/courses")
    .then((res) => res.json())
    .then((courses) => fillCourseHtml(courses));
});

function fillCourseHtml(courses) {
  courses.forEach((course) => {
    const item = document.createElement("div");
    item.classList.add("course");
    item.innerHTML = course.course_title;
    item.addEventListener("click", () => {
      sessionStorage.setItem("course", course.course_id);
      document.location = "/course";
    });
    coursesContainer.appendChild(item);
  });
}
