document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.createElement("input");
    searchInput.setAttribute("type", "text");
    searchInput.setAttribute("id", "search-box");
    searchInput.setAttribute("placeholder", "Search for a subject...");
    searchInput.addEventListener("input", filterSubjects);

    const coursesContainer = document.getElementById("courses");
    coursesContainer.prepend(searchInput);

    fetch("courses.json")
        .then(response => response.json())
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

        const subjectList = course.subjects.map(subject => `<li class="subject">${subject}</li>`).join("");

        courseDiv.innerHTML = `
            <h3>${course.year} - ${course.semester}</h3>
            <ul>${subjectList}</ul>
        `;

        coursesContainer.appendChild(courseDiv);
    });
}

function filterSubjects() {
    const searchTerm = document.getElementById("search-box").value.toLowerCase();
    const courseDivs = document.querySelectorAll(".course");

    courseDivs.forEach(courseDiv => {
        const subjects = courseDiv.querySelectorAll(".subject");
        let courseMatches = false;

        subjects.forEach(subject => {
            if (subject.textContent.toLowerCase().includes(searchTerm)) {
                subject.style.display = "list-item";
                courseMatches = true;
            } else {
                subject.style.display = "none";
            }
        });

        // Hide the entire course div if no subjects match
        courseDiv.style.display = courseMatches ? "block" : "none";
    });
}
