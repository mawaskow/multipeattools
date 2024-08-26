function logout() {
        // Make an AJAX request to the logout route on the server
        fetch('/logout', {
            method: 'GET',  // You might need to adjust this based on your server implementation
            credentials: 'same-origin'  // Send cookies (including session cookie) with the request
        })
        .then(response => {
            if (response.ok) {
                // Redirect to the main screen URL after successful logout
                window.location.href = '/';
            } else {
                // Handle error if logout request fails
                console.error('Logout failed');
            }
        })
        .catch(error => {
            console.error('Error during logout:', error);
        });
    }

