const employeeForm = document.getElementById("employeeForm");

employeeForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const employeeData = {
        employeeId: document.getElementById("employeeId").value,
        fullName: document.getElementById("fullName").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        department: document.getElementById("department").value,
        position: document.getElementById("position").value,
        joiningDate: document.getElementById("joiningDate").value
    };

    try {

        const response = await fetch(
            "http://127.0.0.1:8000/employees",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(employeeData)
            }
        );

        const data = await response.json();

        if (response.ok) {

            alert("Employee registered successfully!");

            employeeForm.reset();

            console.log(data);

        } else {

            alert("Something went wrong!");

            console.log(data);
        }

    } catch (error) {

        console.error("Error:", error);

        alert("Could not connect to the server.");

    }

});