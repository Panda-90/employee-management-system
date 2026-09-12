const employeeTableBody = document.getElementById("employeeTableBody");
const searchInput = document.getElementById("searchInput");

let employees = [];


// Fetch employees from backend
async function loadEmployees() {

    try {
        let response;
        try {
            response = await fetch("http://127.0.0.1:8000/employees");
            if (!response.ok) throw new Error("Failed to fetch from backend");
        } catch(err) {
            console.warn("Backend offline, falling back to static data.");
            response = await fetch("../data/employees.json");
            if (!response.ok) throw new Error("Failed to fetch static data");
        }

        employees = await response.json();

        displayEmployees(employees);

    } catch (error) {

        console.error("Error:", error);

        employeeTableBody.innerHTML = `
            <tr>
                <td colspan="7">
                    Unable to load employees.
                </td>
            </tr>
        `;
    }
}


// Display employees in table
function displayEmployees(employeeList) {

    employeeTableBody.innerHTML = "";

    if (employeeList.length === 0) {

        employeeTableBody.innerHTML = `
            <tr>
                <td colspan="7">
                    No employees found.
                </td>
            </tr>
        `;

        return;
    }


    employeeList.forEach((employee, index) => {

        const row = document.createElement("tr");

        const firstLetter = employee.fullName
            .charAt(0)
            .toUpperCase();


        row.innerHTML = `
            <td>${index + 1}</td>

            <td>
                <div class="table-name">

                    <div class="table-avatar blue-avatar">
                        ${firstLetter}
                    </div>

                    <strong>${employee.fullName}</strong>

                </div>
            </td>

            <td>${employee.employeeId}</td>

            <td>${employee.department}</td>

            <td>${employee.position}</td>

            <td>${employee.joiningDate}</td>

            <td>

                <div class="action-buttons">

                    <button class="edit-btn">
                        <i class="fa-solid fa-pen"></i>
                    </button>

                    <button class="delete-btn">
                        <i class="fa-solid fa-trash"></i>
                    </button>

                </div>

            </td>
        `;

        employeeTableBody.appendChild(row);

    });
}


// Search employees
searchInput.addEventListener("input", function () {

    const searchText = searchInput.value.toLowerCase();

    const filteredEmployees = employees.filter(employee => {

        return (
            employee.fullName.toLowerCase().includes(searchText) ||
            employee.employeeId.toLowerCase().includes(searchText) ||
            employee.department.toLowerCase().includes(searchText)
        );

    });

    displayEmployees(filteredEmployees);

});


// Load data when page opens
loadEmployees();