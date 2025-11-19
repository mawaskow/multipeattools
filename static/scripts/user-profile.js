// static/js/user-menu.js

// User Menu Management
class UserMenu {
    constructor() {
        this.initializeTooltips();
        this.bindEvents();
    }

    // Initialize Bootstrap tooltips
    initializeTooltips() {
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
    }

    // Bind event listeners
    bindEvents() {
        // Initialize user avatar when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            this.initializeUserAvatar();
        });
    }

    // Modal functions
    openPasswordResetModal() {
        const modal = new bootstrap.Modal(document.getElementById('passwordResetModal'));
        modal.show();
    }
    
    openProfileModal() {
        const modal = new bootstrap.Modal(document.getElementById('profileModal'));
        modal.show();
    }

    // Password reset functionality
    async resetPassword() {
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        if (!this.validatePasswordForm(newPassword, confirmPassword)) {
            return;
        }
        
        const resetBtn = document.querySelector('#passwordResetModal .btn-primary-custom');
        this.setButtonLoading(resetBtn, true);
        
        try {
            const userLogin = this.getUserLogin();
            
            if (!userLogin) {
                alert('User login information not found. Please log in again.');
                return;
            }
            
            await this.callPasswordResetAPI(userLogin, newPassword);
            
            alert('Password updated successfully!');
            bootstrap.Modal.getInstance(document.getElementById('passwordResetModal')).hide();
            document.getElementById('passwordResetForm').reset();
            
        } catch (error) {
            console.error('Error:', error);
            this.handlePasswordResetError(error);
        } finally {
            this.setButtonLoading(resetBtn, false);
        }
    }

    // Profile update functionality
    updateProfile() {
        const fullName = document.getElementById('fullName').value;
        const email = document.getElementById('email').value;
        
        // You can implement actual profile update API call here
        alert('Profile update functionality would be implemented here!');
        bootstrap.Modal.getInstance(document.getElementById('profileModal')).hide();
    }

    // Initialize user avatar with initials
    initializeUserAvatar() {
        // Get username from a global variable or data attribute
        const username = window.currentUser?.username || 
                        document.body.dataset.username || 
                        this.getUserLogin();
        
        if (username) {
            const avatars = document.querySelectorAll('.user-avatar');
            const initials = this.generateInitials(username);
            
            avatars.forEach(avatar => {
                if (avatar.textContent.trim() === '') {
                    avatar.textContent = initials;
                }
            });
        }
    }

    // Helper methods
    validatePasswordForm(newPassword, confirmPassword) {
        if (!newPassword || !confirmPassword) {
            alert('Please fill in all fields');
            return false;
        }
        
        if (newPassword !== confirmPassword) {
            alert('New passwords do not match');
            return false;
        }
        
        if (newPassword.length < 4) {
            alert('Password must be at least 4 characters long');
            return false;
        }
        
        return true;
    }

    setButtonLoading(button, isLoading) {
        if (isLoading) {
            button.originalText = button.innerHTML;
            button.innerHTML = '<i class="fas fa-spinner fa-spin me-1"></i>Updating...';
            button.disabled = true;
        } else {
            button.innerHTML = button.originalText || 'Update';
            button.disabled = false;
        }
    }

    getUserLogin() {
        // Try multiple sources for user login
        return window.currentUser?.email || 
               window.currentUser?.username || 
               document.body.dataset.userEmail ||
               document.body.dataset.username;
    }

    generateInitials(username) {
        return username.split(' ')
                      .map(name => name[0])
                      .join('')
                      .toUpperCase()
                      .substring(0, 2); // Max 2 initials
    }

    async callPasswordResetAPI(userLogin, newPassword) {
        // Configure API URL based on environment
        const apiUrl = this.getAPIUrl();
        
        console.log('Calling API:', apiUrl);
        console.log('User login:', userLogin);
        
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                login: userLogin,
                new_password: newPassword
            }),
            mode: 'cors'
        });

        console.log('Response status:', response.status);
        
        if (!response.ok) {
            this.handleAPIError(response.status);
        }
        
        // Check if response has JSON content
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            return await response.json();
        } else {
            return { success: true };
        }
    }

    getAPIUrl() {
        // You can configure this based on environment
        const hostname = window.location.hostname;
        
        if (hostname === 'localhost' || hostname === '127.0.0.1') {
            return 'http://127.0.0.1:5000/reset_password';
        } else {
            return 'http://aspect-erp.insight-centre.org:8016/aspect/reset_password';
        }
    }

    handleAPIError(status) {
        let errorMessage;
        
        switch (status) {
            case 404:
                errorMessage = 'User not found';
                break;
            case 400:
                errorMessage = 'Invalid request data';
                break;
            case 500:
                errorMessage = 'Server error occurred';
                break;
            default:
                errorMessage = `HTTP error! status: ${status}`;
        }
        
        throw new Error(errorMessage);
    }

    handlePasswordResetError(error) {
        let errorMessage = 'An error occurred while updating the password.';
        
        if (error.message.includes('Failed to fetch')) {
            errorMessage = 'Unable to connect to the server. Please check your internet connection.';
        } else if (error.message.includes('CORS')) {
            errorMessage = 'Security error. Please contact support.';
        } else if (error.message) {
            errorMessage = error.message;
        }
        
        alert(errorMessage + ' Please try again.');
    }
}

// Create global instance
const userMenu = new UserMenu();

// Global functions for onclick handlers (to maintain compatibility)
function openPasswordResetModal() {
    userMenu.openPasswordResetModal();
}

function openProfileModal() {
    userMenu.openProfileModal();
}

function resetPassword() {
    userMenu.resetPassword();
}

function updateProfile() {
    userMenu.updateProfile();
}

// Export for module use if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UserMenu;
}