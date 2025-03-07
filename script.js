document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.createElement("input");
    searchInput.setAttribute("type", "text");
    searchInput.setAttribute("id", "search-box");
    searchInput.setAttribute("placeholder", "Search for a subject...");
    searchInput.addEventListener("input", filterSubjects);

    const coursesContainer = document.getElementById("courses");
    coursesContainer.prepend(searchInput);

    fetch("courses.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to load JSON file");
            }
            return response.json();
        })
        .then(data => {
            displayCourses(data.courses);
        })
        .catch(error => {
            console.error("Error fetching JSON:", error);
            coursesContainer.innerHTML = "<p>Failed to load courses.</p>";
        });
});

function displayCourses(courses) {
    const coursesContainer = document.getElementById("courses");
    coursesContainer.innerHTML += "<h2>My Finished Courses</h2>";

    courses.forEach(course => {
        const courseDiv = document.createElement("div");
        courseDiv.classList.add("course");

        courseDiv.innerHTML = `
            <h3>${course.year} - ${course.semester}</h3>
            <ul>
                ${course.subjects.map(subject => `<li class="subject">${subject}</li>`).join("")}
            </ul>
        `;

        coursesContainer.appendChild(courseDiv);
    });
}

function filterSubjects() {
    const searchTerm = document.getElementById("search-box").value.toLowerCase();
    const subjects = document.querySelectorAll(".subject");

    subjects.forEach(subject => {
        if (subject.textContent.toLowerCase().includes(searchTerm)) {
            subject.style.display = "list-item";
        } else {
            subject.style.display = "none";
        }
    });
}
