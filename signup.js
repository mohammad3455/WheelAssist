document.getElementById('signupForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the default form submission

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://127.0.0.1:3000/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        console.log(data);
        
        if (data.success) {
            alert('success '+ data.message); // Display success message
        } else {
            alert('Error: '+ data.message); // Display error message
        }
    } catch (error) {
        console.error('Error during signup:', error);
        messageDiv.textContent = 'Signup failed, please try again later.';
    }
});
