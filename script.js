document.addEventListener("DOMContentLoaded", function () {
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
            document.getElementById("courses").innerHTML = "<p>Failed to load courses.</p>";
        });
});

function displayCourses(courses) {
    const coursesContainer = document.getElementById("courses");
    coursesContainer.innerHTML = `
        <h2>My Finished Courses</h2>
        <input type="text" id="search-input" placeholder="Search subjects..." />
        <ul id="course-list"></ul>
    `;

    const searchInput = document.getElementById("search-input");
    const courseList = document.getElementById("course-list");

    function updateCourseList(filteredCourses) {
        courseList.innerHTML = "";
        filteredCourses.forEach(course => {
            const courseDiv = document.createElement("div");
            courseDiv.classList.add("course");
            courseDiv.innerHTML = `
                <h3>${course.year} - ${course.semester}</h3>
                <ul>
                    ${course.subjects.map(subject => `<li>${subject}</li>`).join("")}
                </ul>
            `;
            courseList.appendChild(courseDiv);
        });
    }

    updateCourseList(courses);

    searchInput.addEventListener("input", () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredCourses = courses.filter(course =>
            course.subjects.some(subject => subject.toLowerCase().includes(searchTerm))
        );
        updateCourseList(filteredCourses);
    });
}
