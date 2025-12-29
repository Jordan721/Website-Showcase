// Library data - matching the Java application with genres
const library = [
    { id: 1, isbn: "9780061120084", title: "To Kill a Mockingbird", genre: "Classic", author: "Harper Lee" },
    { id: 2, isbn: "9780451524935", title: "1984", genre: "Dystopian", author: "George Orwell" },
    { id: 3, isbn: "9780743273565", title: "The Great Gatsby", genre: "Classic", author: "F. Scott Fitzgerald" },
    { id: 4, isbn: "9780141439518", title: "Pride and Prejudice", genre: "Romance", author: "Jane Austen" },
    { id: 5, isbn: "9780316769488", title: "The Catcher in the Rye", genre: "Classic", author: "J.D. Salinger" },
    { id: 6, isbn: "9780547928227", title: "The Hobbit", genre: "Fantasy", author: "J.R.R. Tolkien" },
    { id: 7, isbn: "9781451673319", title: "Fahrenheit 451", genre: "Dystopian", author: "Ray Bradbury" },
    { id: 8, isbn: "9781503280786", title: "Moby-Dick", genre: "Adventure", author: "Herman Melville" },
    { id: 9, isbn: "9780141441146", title: "Jane Eyre", genre: "Romance", author: "Charlotte Brontë" },
    { id: 10, isbn: "9780060850524", title: "Brave New World", genre: "Dystopian", author: "Aldous Huxley" },
    { id: 11, isbn: "9780451526342", title: "Animal Farm", genre: "Dystopian", author: "George Orwell" },
    { id: 12, isbn: "9780141439556", title: "Wuthering Heights", genre: "Romance", author: "Emily Brontë" },
    { id: 13, isbn: "9780544003415", title: "The Lord of the Rings", genre: "Fantasy", author: "J.R.R. Tolkien" },
    { id: 14, isbn: "9780066238500", title: "The Chronicles of Narnia", genre: "Fantasy", author: "C.S. Lewis" },
    { id: 15, isbn: "9780439023528", title: "The Hunger Games", genre: "Young Adult", author: "Suzanne Collins" },
    { id: 16, isbn: "9780590353427", title: "Harry Potter and the Sorcerer's Stone", genre: "Fantasy", author: "J.K. Rowling" },
    { id: 17, isbn: "9780142424179", title: "The Fault in Our Stars", genre: "Young Adult", author: "John Green" },
    { id: 18, isbn: "9780062315006", title: "The Alchemist", genre: "Adventure", author: "Paulo Coelho" },
    { id: 19, isbn: "9780375842207", title: "The Book Thief", genre: "Historical", author: "Markus Zusak" },
    { id: 20, isbn: "9780544336261", title: "The Giver", genre: "Dystopian", author: "Lois Lowry" }
];

// Initialize books with checkout status
let books = library.map(book => ({
    ...book,
    isCheckedOut: false,
    checkedOutTo: ""
}));

// Load data from localStorage
function loadFromStorage() {
    const stored = localStorage.getItem('neighborhoodLibrary');
    if (stored) {
        const storedBooks = JSON.parse(stored);

        // Merge stored data with library data to ensure all fields exist
        books = storedBooks.map(storedBook => {
            const libraryBook = library.find(b => b.id === storedBook.id);
            return {
                ...libraryBook, // Get author and genre from library
                ...storedBook,  // Override with stored checkout data
                // Ensure these fields always exist
                author: storedBook.author || libraryBook?.author || 'Unknown',
                genre: storedBook.genre || libraryBook?.genre || 'Other'
            };
        });
    }
}

// Save data to localStorage
function saveToStorage() {
    localStorage.setItem('neighborhoodLibrary', JSON.stringify(books));
}

// Search state
let currentSearchTerm = '';
let currentGenre = 'all';

// Admin state
let isAdminMode = false;
const ADMIN_PASSWORD = 'library2025'; // Change this to a secure password

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    loadFromStorage();
    renderAvailableBooks();
    renderCheckedOutBooks();
    setupNavigation();
    setupModal();
    setupAboutModal();
    setupSearch();
    setupGenreFilters();
    setupStatsToggle();
    setupDonateModal();
    setupAdminMode();
    updateStats();
});

// Navigation functionality
function setupNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.books-section');

    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const view = btn.dataset.view;

            // Skip if no view data (About button, Back button)
            if (!view) return;

            // Update active button
            navButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Update active section
            sections.forEach(section => {
                section.classList.remove('active');
            });

            if (view === 'available') {
                document.getElementById('available-books').classList.add('active');
            } else {
                document.getElementById('checkedout-books').classList.add('active');
            }
        });
    });
}

// Render available books
function renderAvailableBooks() {
    const shelf = document.getElementById('available-shelf');
    const availableBooks = books.filter(book => !book.isCheckedOut);

    if (availableBooks.length === 0) {
        shelf.innerHTML = '<div class="empty-shelf">All books are currently checked out. Please check back later!</div>';
        return;
    }

    shelf.innerHTML = availableBooks.map((book, index) => createBookCard(book, index)).join('');

    // Add click handlers
    availableBooks.forEach(book => {
        const card = shelf.querySelector(`[data-book-id="${book.id}"]`);
        card.addEventListener('click', () => openBookModal(book));
    });
}

// Render checked out books
function renderCheckedOutBooks() {
    const shelf = document.getElementById('checkedout-shelf');
    const checkedOutBooks = books.filter(book => book.isCheckedOut);

    if (checkedOutBooks.length === 0) {
        shelf.innerHTML = '<div class="empty-shelf">No books are currently checked out.</div>';
        return;
    }

    shelf.innerHTML = checkedOutBooks.map((book, index) => createBookCard(book, index)).join('');

    // Add click handlers
    checkedOutBooks.forEach(book => {
        const card = shelf.querySelector(`[data-book-id="${book.id}"]`);
        card.addEventListener('click', () => openBookModal(book));
    });
}

// Book color palette for variety
const bookColors = [
    'linear-gradient(90deg, #8b4513 0%, #a0522d 2%, #cd853f 5%, #b8860b 50%, #cd853f 95%, #a0522d 98%, #8b4513 100%)', // Brown/Gold
    'linear-gradient(90deg, #2c1810 0%, #4a2c1a 2%, #654321 5%, #8b4513 50%, #654321 95%, #4a2c1a 98%, #2c1810 100%)', // Dark Brown
    'linear-gradient(90deg, #556b2f 0%, #6b8e23 2%, #808000 5%, #9acd32 50%, #808000 95%, #6b8e23 98%, #556b2f 100%)', // Green
    'linear-gradient(90deg, #8b0000 0%, #a52a2a 2%, #cd5c5c 5%, #dc143c 50%, #cd5c5c 95%, #a52a2a 98%, #8b0000 100%)', // Red
    'linear-gradient(90deg, #191970 0%, #000080 2%, #4169e1 5%, #4682b4 50%, #4169e1 95%, #000080 98%, #191970 100%)', // Blue
    'linear-gradient(90deg, #4a2c5c 0%, #5a3c6c 2%, #7b5d8c 5%, #9370db 50%, #7b5d8c 95%, #5a3c6c 98%, #4a2c5c 100%)', // Purple
    'linear-gradient(90deg, #704214 0%, #8b5a2b 2%, #a0754e 5%, #d2691e 50%, #a0754e 95%, #8b5a2b 98%, #704214 100%)', // Tan
    'linear-gradient(90deg, #2f4f4f 0%, #3d6060 2%, #5f8a8b 5%, #708090 50%, #5f8a8b 95%, #3d6060 98%, #2f4f4f 100%)', // Slate
];

// Create book card HTML
function createBookCard(book, index = 0) {
    const statusClass = book.isCheckedOut ? 'status-checkedout' : 'status-available';
    const statusText = book.isCheckedOut ? 'Checked Out' : 'Available';
    const checkoutInfo = book.isCheckedOut ? `<div class="checkout-info">Checked out to: ${book.checkedOutTo}</div>` : '';

    // Assign consistent color based on book ID
    const bookColor = bookColors[book.id % bookColors.length];

    // Truncate title for spine if too long
    const spineTitle = book.title.length > 20 ? book.title.substring(0, 18) + '...' : book.title;

    return `
        <div class="book-card" data-book-id="${book.id}" style="background: ${bookColor}; --book-index: ${index}" data-spine-title="${spineTitle}">
            <div class="book-cover">📖</div>
            <h3 class="book-title">${book.title}</h3>
            <div class="book-info"><strong>ID:</strong> ${book.id}</div>
            <div class="book-info"><strong>ISBN:</strong> ${book.isbn}</div>
            <div class="book-status ${statusClass}">${statusText}</div>
            ${checkoutInfo}
        </div>
    `;
}

// Modal functionality
function setupModal() {
    const modal = document.getElementById('book-modal');
    const closeBtn = modal.querySelector('.close');

    if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            modal.style.display = 'none';
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Open book modal
function openBookModal(book) {
    const modal = document.getElementById('book-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalId = document.getElementById('modal-id');
    const modalIsbn = document.getElementById('modal-isbn');
    const modalCheckoutInfo = document.getElementById('modal-checkout-info');
    const modalActions = document.getElementById('modal-actions');

    modalTitle.textContent = book.title;
    modalId.textContent = book.id;
    modalIsbn.textContent = book.isbn;

    if (book.isCheckedOut) {
        modalCheckoutInfo.innerHTML = `<strong>Status:</strong> <span style="color: #8b1538;">Checked out to ${book.checkedOutTo}</span>`;
        modalActions.innerHTML = `
            <button class="modal-btn checkin-btn" onclick="checkInBook(${book.id})">Check In Book</button>
            ${isAdminMode ? `<button class="modal-btn delete-btn" onclick="deleteBook(${book.id})">🗑️ Delete Book</button>` : ''}
        `;
    } else {
        modalCheckoutInfo.innerHTML = `<strong>Status:</strong> <span style="color: #2d5016;">Available</span>`;
        modalActions.innerHTML = `
            <div style="width: 100%;">
                <input type="text" id="checkout-name" placeholder="Enter your name" />
                <button class="modal-btn" onclick="checkOutBook(${book.id})">Check Out Book</button>
                ${isAdminMode ? `<button class="modal-btn delete-btn" onclick="deleteBook(${book.id})">🗑️ Delete Book</button>` : ''}
            </div>
        `;
    }

    modal.style.display = 'block';
}

// Check out a book
function checkOutBook(bookId) {
    const nameInput = document.getElementById('checkout-name');
    const name = nameInput.value.trim();

    if (!name) {
        alert('Please enter your name to check out the book.');
        return;
    }

    const book = books.find(b => b.id === bookId);
    if (book && !book.isCheckedOut) {
        book.isCheckedOut = true;
        book.checkedOutTo = name;
        saveToStorage();

        // Close modal and refresh views
        document.getElementById('book-modal').style.display = 'none';

        // Refresh based on search/genre state
        if (currentSearchTerm || currentGenre !== 'all') {
            filterBooksByGenre();
        } else {
            renderAvailableBooks();
            renderCheckedOutBooks();
        }

        // Update stats if dashboard is visible
        updateStats();

        // Show success message
        showNotification(`"${book.title}" has been checked out to ${name}!`);
    }
}

// Check in a book
function checkInBook(bookId) {
    const book = books.find(b => b.id === bookId);
    if (book && book.isCheckedOut) {
        const title = book.title;
        book.isCheckedOut = false;
        book.checkedOutTo = "";
        saveToStorage();

        // Close modal and refresh views
        document.getElementById('book-modal').style.display = 'none';

        // Refresh based on search/genre state
        if (currentSearchTerm || currentGenre !== 'all') {
            filterBooksByGenre();
        } else {
            renderAvailableBooks();
            renderCheckedOutBooks();
        }

        // Update stats if dashboard is visible
        updateStats();

        // Show success message
        showNotification(`"${title}" has been checked in successfully!`);
    }
}

// Show notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #2d5016;
        color: #f5e6d3;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        z-index: 2000;
        font-family: Georgia, serif;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Setup About Modal
function setupAboutModal() {
    const aboutBtn = document.getElementById('about-btn');
    const aboutModal = document.getElementById('about-modal');
    const closeBtn = aboutModal.querySelector('.about-close');

    aboutBtn.addEventListener('click', () => {
        aboutModal.style.display = 'block';
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            aboutModal.style.display = 'none';
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === aboutModal) {
            aboutModal.style.display = 'none';
        }
    });
}

// Setup Search Functionality
function setupSearch() {
    const searchInput = document.getElementById('search-input');
    const clearBtn = document.getElementById('clear-search');
    const resultsCount = document.getElementById('search-results-count');

    // Search on input
    searchInput.addEventListener('input', (e) => {
        currentSearchTerm = e.target.value.trim();

        if (currentSearchTerm) {
            clearBtn.style.display = 'flex';
            performSearch();
        } else {
            clearBtn.style.display = 'none';
            clearSearch();
        }
    });

    // Clear search
    clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        currentSearchTerm = '';
        clearBtn.style.display = 'none';
        clearSearch();
    });
}

// Perform search across all books
function performSearch() {
    filterBooksByGenre();
}

// Render filtered books
function renderFilteredBooks(filteredBooks) {
    const availableShelf = document.getElementById('available-shelf');
    const checkedOutShelf = document.getElementById('checkedout-shelf');

    const availableBooks = filteredBooks.filter(book => !book.isCheckedOut);
    const checkedOutBooks = filteredBooks.filter(book => book.isCheckedOut);

    // Render available books
    if (availableBooks.length === 0) {
        availableShelf.innerHTML = '<div class="empty-shelf">No available books match your search</div>';
    } else {
        availableShelf.innerHTML = availableBooks.map((book, index) => createBookCard(book, index)).join('');
        availableBooks.forEach(book => {
            const card = availableShelf.querySelector(`[data-book-id="${book.id}"]`);
            card.addEventListener('click', () => openBookModal(book));
        });
    }

    // Render checked out books
    if (checkedOutBooks.length === 0) {
        checkedOutShelf.innerHTML = '<div class="empty-shelf">No checked out books match your search</div>';
    } else {
        checkedOutShelf.innerHTML = checkedOutBooks.map((book, index) => createBookCard(book, index)).join('');
        checkedOutBooks.forEach(book => {
            const card = checkedOutShelf.querySelector(`[data-book-id="${book.id}"]`);
            card.addEventListener('click', () => openBookModal(book));
        });
    }
}

// Clear search and show all books
function clearSearch() {
    filterBooksByGenre();
}

// Setup Genre Filters
function setupGenreFilters() {
    const genreBtns = document.querySelectorAll('.genre-btn');

    genreBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            genreBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Set current genre
            currentGenre = btn.dataset.genre;

            // Filter books
            filterBooksByGenre();
        });
    });
}

// Filter books by genre
function filterBooksByGenre() {
    let filteredBooks = books;

    // Apply genre filter
    if (currentGenre !== 'all') {
        filteredBooks = books.filter(book => book.genre === currentGenre);
    }

    // Apply search filter if active
    if (currentSearchTerm) {
        const searchTerm = currentSearchTerm.toLowerCase();
        filteredBooks = filteredBooks.filter(book => {
            return (
                book.title.toLowerCase().includes(searchTerm) ||
                book.id.toString().includes(searchTerm) ||
                book.isbn.includes(searchTerm) ||
                (book.checkedOutTo && book.checkedOutTo.toLowerCase().includes(searchTerm))
            );
        });
    }

    renderFilteredBooks(filteredBooks);
    updateSearchCount(filteredBooks.length);
}

// Update search count display
function updateSearchCount(count) {
    const resultsCount = document.getElementById('search-results-count');
    if (currentSearchTerm || currentGenre !== 'all') {
        if (count === 0) {
            resultsCount.textContent = 'No books found';
        } else if (count === 1) {
            resultsCount.textContent = '1 book found';
        } else {
            resultsCount.textContent = `${count} books found`;
        }
    } else {
        resultsCount.textContent = '';
    }
}

// Setup Stats Toggle
function setupStatsToggle() {
    const statsToggle = document.getElementById('stats-toggle');
    const statsDashboard = document.getElementById('stats-dashboard');
    const closeStats = document.getElementById('close-stats');

    statsToggle.addEventListener('click', () => {
        if (statsDashboard.style.display === 'none') {
            statsDashboard.style.display = 'block';
            updateStats();
            generateRecommendations();
        } else {
            statsDashboard.style.display = 'none';
        }
    });

    closeStats.addEventListener('click', () => {
        statsDashboard.style.display = 'none';
    });
}

// Update Statistics
function updateStats() {
    const totalBooks = books.length;
    const availableBooks = books.filter(b => !b.isCheckedOut).length;
    const checkedOutBooks = books.filter(b => b.isCheckedOut).length;

    // Calculate most popular genre
    const genreCounts = {};
    books.forEach(book => {
        genreCounts[book.genre] = (genreCounts[book.genre] || 0) + 1;
    });
    const popularGenre = Object.entries(genreCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || '-';

    document.getElementById('total-books').textContent = totalBooks;
    document.getElementById('available-count').textContent = availableBooks;
    document.getElementById('checkedout-count').textContent = checkedOutBooks;
    document.getElementById('popular-genre').textContent = popularGenre;
}

// Generate Book Recommendations
function generateRecommendations() {
    const recommendationsList = document.getElementById('recommendations-list');

    // Get recently checked out genres
    const checkedOutBooks = books.filter(b => b.isCheckedOut);
    const checkedOutGenres = checkedOutBooks.map(b => b.genre);

    // Find available books in those genres
    let recommendations = books.filter(b =>
        !b.isCheckedOut && checkedOutGenres.includes(b.genre)
    ).slice(0, 4);

    // If not enough recommendations, add random available books
    if (recommendations.length < 4) {
        const availableBooks = books.filter(b => !b.isCheckedOut);
        const remaining = availableBooks.filter(b => !recommendations.includes(b));
        recommendations = [...recommendations, ...remaining.slice(0, 4 - recommendations.length)];
    }

    // Render recommendations
    if (recommendations.length === 0) {
        recommendationsList.innerHTML = '<p style="text-align: center; color: #654321;">No recommendations available</p>';
    } else {
        recommendationsList.innerHTML = recommendations.map(book => `
            <div class="recommendation-card" data-book-id="${book.id}">
                <div class="book-cover" style="font-size: 2rem;">📖</div>
                <div class="book-title">${book.title}</div>
                <div class="book-genre">${book.genre}</div>
            </div>
        `).join('');

        // Add click handlers
        recommendations.forEach(book => {
            const card = recommendationsList.querySelector(`[data-book-id="${book.id}"]`);
            card.addEventListener('click', () => openBookModal(book));
        });
    }
}

// Setup Donate Modal
function setupDonateModal() {
    const donateBtn = document.getElementById('donate-toggle');
    const donateModal = document.getElementById('donate-modal');
    const closeBtn = donateModal.querySelector('.donate-close');
    const cancelBtn = document.getElementById('cancel-donate');
    const donateForm = document.getElementById('donate-form');

    donateBtn.addEventListener('click', () => {
        donateModal.style.display = 'block';
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            donateModal.style.display = 'none';
            donateForm.reset();
        });
    }

    if (cancelBtn) {
        cancelBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            donateModal.style.display = 'none';
            donateForm.reset();
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === donateModal) {
            donateModal.style.display = 'none';
            donateForm.reset();
        }
    });

    // Handle form submission
    donateForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const newBook = {
            id: books.length + 1,
            isbn: document.getElementById('donate-isbn').value,
            title: document.getElementById('donate-title').value,
            author: document.getElementById('donate-author').value,
            genre: document.getElementById('donate-genre').value,
            isCheckedOut: false,
            checkedOutTo: "",
            donatedBy: document.getElementById('donor-name').value || 'Anonymous'
        };

        // Add to books array
        books.push(newBook);
        saveToStorage();

        // Close modal and reset form
        donateModal.style.display = 'none';
        donateForm.reset();

        // Refresh displays
        if (currentSearchTerm || currentGenre !== 'all') {
            filterBooksByGenre();
        } else {
            renderAvailableBooks();
            renderCheckedOutBooks();
        }
        updateStats();

        // Show success message
        showNotification(`Thank you for donating "${newBook.title}" to the library!`);
    });
}

// Update the book card to show genre
const originalCreateBookCard = createBookCard;
function createBookCard(book, index = 0) {
    const statusClass = book.isCheckedOut ? 'status-checkedout' : 'status-available';
    const statusText = book.isCheckedOut ? 'Checked Out' : 'Available';
    const checkoutInfo = book.isCheckedOut ? `<div class="checkout-info">Checked out to: ${book.checkedOutTo}</div>` : '';

    // Assign consistent color based on book ID
    const bookColor = bookColors[book.id % bookColors.length];

    // Truncate title for spine if too long
    const spineTitle = book.title.length > 20 ? book.title.substring(0, 18) + '...' : book.title;

    return `
        <div class="book-card" data-book-id="${book.id}" style="background: ${bookColor}; --book-index: ${index}" data-spine-title="${spineTitle}">
            <div class="book-cover">📖</div>
            <h3 class="book-title">${book.title}</h3>
            <div class="book-info"><strong>Genre:</strong> ${book.genre || 'Other'}</div>
            <div class="book-info"><strong>ID:</strong> ${book.id}</div>
            <div class="book-info"><strong>ISBN:</strong> ${book.isbn}</div>
            <div class="book-status ${statusClass}">${statusText}</div>
            ${checkoutInfo}
        </div>
    `;
}

// Setup Admin Mode
function setupAdminMode() {
    const adminToggle = document.getElementById('admin-toggle');
    const adminIcon = adminToggle.querySelector('.admin-icon');
    const adminText = adminToggle.querySelector('.admin-text');

    adminToggle.addEventListener('click', () => {
        if (!isAdminMode) {
            // Prompt for password
            const password = prompt('Enter admin password:');
            if (password === ADMIN_PASSWORD) {
                isAdminMode = true;
                adminIcon.textContent = '🔓';
                adminText.textContent = 'Exit Admin';
                adminToggle.classList.add('active-admin');
                showNotification('Admin mode enabled');

                // Refresh the current view
                if (currentSearchTerm || currentGenre !== 'all') {
                    filterBooksByGenre();
                } else {
                    renderAvailableBooks();
                    renderCheckedOutBooks();
                }
            } else if (password !== null) {
                alert('Incorrect password');
            }
        } else {
            // Exit admin mode
            isAdminMode = false;
            adminIcon.textContent = '🔒';
            adminText.textContent = 'Admin';
            adminToggle.classList.remove('active-admin');
            showNotification('Admin mode disabled');

            // Refresh the current view
            if (currentSearchTerm || currentGenre !== 'all') {
                filterBooksByGenre();
            } else {
                renderAvailableBooks();
                renderCheckedOutBooks();
            }
        }
    });
}

// Delete a book (admin only)
function deleteBook(bookId) {
    if (!isAdminMode) {
        alert('Admin access required to delete books');
        return;
    }

    const book = books.find(b => b.id === bookId);
    if (!book) return;

    const confirmDelete = confirm(`Are you sure you want to permanently delete "${book.title}"?\n\nThis action cannot be undone.`);

    if (confirmDelete) {
        // Remove book from array
        const index = books.findIndex(b => b.id === bookId);
        books.splice(index, 1);
        saveToStorage();

        // Close modal
        document.getElementById('book-modal').style.display = 'none';

        // Refresh views
        if (currentSearchTerm || currentGenre !== 'all') {
            filterBooksByGenre();
        } else {
            renderAvailableBooks();
            renderCheckedOutBooks();
        }
        updateStats();

        showNotification(`"${book.title}" has been removed from the library`);
    }
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
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
