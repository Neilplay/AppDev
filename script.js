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
    coursesContainer.innerHTML = "<h2>My Finished Courses</h2>";

    const searchInput = document.getElementById("search-input");
    searchInput.addEventListener("input", () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredCourses = courses.filter(course =>
            course.subjects.some(subject => subject.toLowerCase().includes(searchTerm))
        );
        displayCourses(filteredCourses);
    });



    courses.forEach(course => {


        const courseDiv = document.createElement("div");
        courseDiv.classList.add("course");

        courseDiv.innerHTML = `
            <h3>${course.year} - ${course.semester}</h3>
            <ul>
                ${course.subjects.map(subject => `<li>${subject}</li>`).join("")}
            </ul>
        `;

        coursesContainer.appendChild(courseDiv);
    });
}
