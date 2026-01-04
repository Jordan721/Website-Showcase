// Account Page - Profile Customization

document.addEventListener('DOMContentLoaded', () => {
    initializeProfileCustomization();
    loadUserProfile();
});

// User profile data (stored in localStorage for mockup purposes)
function getUserProfile() {
    const defaultProfile = {
        name: 'User',
        email: 'user@socialcoms.com',
        bio: 'Welcome to my profile!',
        avatar: null // base64 image or null
    };

    const saved = localStorage.getItem('socialComsProfile');
    return saved ? JSON.parse(saved) : defaultProfile;
}

function saveUserProfile(profile) {
    localStorage.setItem('socialComsProfile', JSON.stringify(profile));
}

function loadUserProfile() {
    const profile = getUserProfile();

    // Update profile display
    const nameElement = document.querySelector('.profile-info h3');
    const emailElement = document.querySelector('.user-email');

    if (nameElement) {
        nameElement.textContent = `Welcome, ${profile.name}!`;
    }

    if (emailElement) {
        emailElement.textContent = profile.email;
    }

    // Load avatar if exists
    if (profile.avatar) {
        updateAvatarDisplay(profile.avatar);
    }
}

function initializeProfileCustomization() {
    // Avatar upload/change functionality
    const avatarContainer = document.querySelector('.avatar-container');

    if (avatarContainer) {
        // Make avatar clickable
        avatarContainer.style.cursor = 'pointer';
        avatarContainer.style.position = 'relative';

        // Add hover overlay
        const overlay = document.createElement('div');
        overlay.className = 'avatar-overlay';
        overlay.innerHTML = '<i class="fas fa-camera"></i><span>Change Photo</span>';
        avatarContainer.appendChild(overlay);

        // Create hidden file input
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        fileInput.style.display = 'none';
        avatarContainer.appendChild(fileInput);

        // Handle click
        avatarContainer.addEventListener('click', () => {
            fileInput.click();
        });

        // Handle file selection
        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                handleAvatarUpload(file);
            }
        });
    }

    // Add edit profile button
    const profileInfo = document.querySelector('.profile-info');
    if (profileInfo) {
        const editBtn = document.createElement('button');
        editBtn.className = 'edit-profile-btn';
        editBtn.innerHTML = '<i class="fas fa-edit"></i> Edit Profile';
        profileInfo.appendChild(editBtn);

        editBtn.addEventListener('click', showEditProfileModal);
    }
}

function handleAvatarUpload(file) {
    if (!file.type.startsWith('image/')) {
        showNotification('Please upload an image file', 'error');
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        const imageData = e.target.result;

        // Update display
        updateAvatarDisplay(imageData);

        // Save to profile
        const profile = getUserProfile();
        profile.avatar = imageData;
        saveUserProfile(profile);

        showNotification('Profile picture updated! 📸');
    };

    reader.readAsDataURL(file);
}

function updateAvatarDisplay(imageData) {
    const avatarContainer = document.querySelector('.avatar-container');
    const existingIcon = avatarContainer.querySelector('i.fa-user-circle');
    const existingImg = avatarContainer.querySelector('img');

    if (existingImg) {
        existingImg.src = imageData;
    } else {
        const img = document.createElement('img');
        img.src = imageData;
        img.alt = 'Profile Picture';
        img.className = 'profile-avatar-img';

        if (existingIcon) {
            existingIcon.replaceWith(img);
        } else {
            avatarContainer.insertBefore(img, avatarContainer.firstChild);
        }
    }
}

function showEditProfileModal() {
    const profile = getUserProfile();

    // Create modal
    const modal = document.createElement('div');
    modal.className = 'edit-profile-modal';
    modal.innerHTML = `
        <div class="edit-profile-content">
            <div class="modal-header">
                <h2><i class="fas fa-user-edit"></i> Edit Profile</h2>
                <button class="close-modal"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label for="edit-name"><i class="fas fa-user"></i> Name</label>
                    <input type="text" id="edit-name" value="${profile.name}" placeholder="Enter your name">
                </div>
                <div class="form-group">
                    <label for="edit-email"><i class="fas fa-envelope"></i> Email</label>
                    <input type="email" id="edit-email" value="${profile.email}" placeholder="Enter your email">
                </div>
                <div class="form-group">
                    <label for="edit-bio"><i class="fas fa-align-left"></i> Bio</label>
                    <textarea id="edit-bio" rows="4" placeholder="Tell us about yourself...">${profile.bio}</textarea>
                </div>
            </div>
            <div class="modal-footer">
                <button class="cancel-btn">Cancel</button>
                <button class="save-btn"><i class="fas fa-save"></i> Save Changes</button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Animate in
    setTimeout(() => modal.classList.add('active'), 10);

    // Event listeners
    modal.querySelector('.close-modal').addEventListener('click', () => closeModal(modal));
    modal.querySelector('.cancel-btn').addEventListener('click', () => closeModal(modal));
    modal.querySelector('.save-btn').addEventListener('click', () => saveProfileChanges(modal));

    // Close on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal(modal);
    });
}

function closeModal(modal) {
    modal.classList.remove('active');
    setTimeout(() => modal.remove(), 300);
}

function saveProfileChanges(modal) {
    const name = modal.querySelector('#edit-name').value.trim();
    const email = modal.querySelector('#edit-email').value.trim();
    const bio = modal.querySelector('#edit-bio').value.trim();

    if (!name || !email) {
        showNotification('Name and email are required', 'error');
        return;
    }

    // Save profile
    const profile = getUserProfile();
    profile.name = name;
    profile.email = email;
    profile.bio = bio;
    saveUserProfile(profile);

    // Update display
    loadUserProfile();

    // Close modal
    closeModal(modal);

    showNotification('Profile updated successfully! ✨');
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        font-weight: 600;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add necessary styles
const style = document.createElement('style');
style.textContent = `
    .avatar-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(99, 102, 241, 0.9);
        border-radius: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;
        color: white;
        font-size: 0.875rem;
        gap: 0.25rem;
    }

    .avatar-container:hover .avatar-overlay {
        opacity: 1;
    }

    .avatar-overlay i {
        font-size: 1.5rem !important;
        color: white !important;
    }

    .profile-avatar-img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        object-fit: cover;
        border: 4px solid var(--primary-color);
    }

    .edit-profile-btn {
        background: var(--gradient-1);
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 600;
        margin-top: 0.75rem;
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        transition: all 0.3s ease;
    }

    .edit-profile-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
    }

    .edit-profile-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        opacity: 0;
        transition: opacity 0.3s ease;
        backdrop-filter: blur(5px);
    }

    .edit-profile-modal.active {
        opacity: 1;
    }

    .edit-profile-content {
        background: white;
        border-radius: 16px;
        max-width: 500px;
        width: 90%;
        max-height: 90vh;
        overflow-y: auto;
        transform: scale(0.9);
        transition: transform 0.3s ease;
    }

    .edit-profile-modal.active .edit-profile-content {
        transform: scale(1);
    }

    .edit-profile-content .modal-header {
        padding: 1.5rem;
        border-bottom: 1px solid var(--border-color);
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .edit-profile-content .modal-header h2 {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: var(--text-dark);
        font-size: 1.5rem;
    }

    .close-modal {
        background: none;
        border: none;
        font-size: 1.5rem;
        color: var(--text-light);
        cursor: pointer;
        padding: 0.5rem;
        border-radius: 50%;
        transition: all 0.3s ease;
    }

    .close-modal:hover {
        background: var(--light-bg);
        color: var(--text-dark);
    }

    .edit-profile-content .modal-body {
        padding: 1.5rem;
    }

    .form-group {
        margin-bottom: 1.5rem;
    }

    .form-group label {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 0.5rem;
        color: var(--text-dark);
        font-weight: 600;
    }

    .form-group input,
    .form-group textarea {
        width: 100%;
        padding: 0.75rem;
        border: 2px solid var(--border-color);
        border-radius: 8px;
        font-family: 'Poppins', sans-serif;
        font-size: 1rem;
        transition: all 0.3s ease;
    }

    .form-group input:focus,
    .form-group textarea:focus {
        outline: none;
        border-color: var(--primary-color);
    }

    .edit-profile-content .modal-footer {
        padding: 1.5rem;
        border-top: 1px solid var(--border-color);
        display: flex;
        gap: 1rem;
        justify-content: flex-end;
    }

    .cancel-btn {
        background: var(--light-bg);
        color: var(--text-dark);
        border: none;
        padding: 0.75rem 1.5rem;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 600;
        transition: all 0.3s ease;
    }

    .cancel-btn:hover {
        background: var(--border-color);
    }

    .save-btn {
        background: var(--gradient-1);
        color: white;
        border: none;
        padding: 0.75rem 1.5rem;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 600;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .save-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
    }

    .avatar-container {
        width: 100px;
        height: 100px;
        position: relative;
        margin-bottom: 1rem;
    }

    .avatar-container i.fa-user-circle {
        font-size: 100px;
    }

    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
