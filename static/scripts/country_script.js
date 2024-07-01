// scripts.js

document.addEventListener('DOMContentLoaded', function() {
    // Get all the country links
    var countryLinks = document.querySelectorAll('#countries-list a');

    // Add click event listeners to each country link
    countryLinks.forEach(function(link) {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default link behavior
            
            // Extract the country name from the data-country attribute
            var country = this.getAttribute('data-country');

            // Redirect to the corresponding policy page
            window.location.href = "/policy/" + country;
        });
    });

    // Toggle countries list visibility on tooltip click
    document.getElementById('countries-tooltip').addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default link behavior
        
        var countriesList = document.getElementById('countries-list');
        countriesList.style.display = countriesList.style.display === 'block' ? 'none' : 'block';
    });

    // Hide countries list if clicked outside of the tooltip or list
    document.addEventListener('click', function(event) {
        var isClickInside = document.getElementById('countries-tooltip').contains(event.target) ||
                            document.getElementById('countries-list').contains(event.target);
        if (!isClickInside) {
            document.getElementById('countries-list').style.display = 'none';
        }
    });
});
document.addEventListener("DOMContentLoaded", function() {
    const readMoreButtons = document.querySelectorAll(".read-more-btn");
    const showLessButtons = document.querySelectorAll(".show-less-btn");
    const fullPolicyDetails = document.querySelectorAll(".full-policy-detail");

    readMoreButtons.forEach((button, index) => {
        button.addEventListener("click", () => {
            fullPolicyDetails[index].style.display = "block";
            button.style.display = "none";
            showLessButtons[index].style.display = "inline-block";
        });

        showLessButtons[index].addEventListener("click", () => {
            fullPolicyDetails[index].style.display = "none";
            button.style.display = "inline-block";
            showLessButtons[index].style.display = "none";
        });
    });
});

