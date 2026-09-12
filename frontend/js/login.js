document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            try {
                const response = await fetch("http://127.0.0.1:8000/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username: username,
                        password: password
                    })
                });

                if (response.ok) {
                    // Login successful
                    localStorage.setItem('isAdminLoggedIn', 'true');
                    window.location.href = '../index.html';
                } else {
                    // Login failed
                    errorMessage.style.display = 'block';
                }
            } catch (error) {
                console.error("Login error:", error);
                
                // Fallback for static demo
                if (username === "admin" && password === "admin123") {
                    console.log("Logged in using static fallback.");
                    localStorage.setItem('isAdminLoggedIn', 'true');
                    window.location.href = '../index.html';
                } else {
                    errorMessage.textContent = "Invalid credentials or server is offline.";
                    errorMessage.style.display = 'block';
                }
            }
        });
    }
});
