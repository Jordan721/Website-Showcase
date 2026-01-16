// ===== GOLDEN DUST PARTICLE ANIMATION =====
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

class GoldenParticle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = -Math.random() * 0.5 - 0.1;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.fadeSpeed = Math.random() * 0.005 + 0.002;
        this.growing = Math.random() > 0.5;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Gentle floating motion
        this.x += Math.sin(Date.now() * 0.001 + this.y * 0.01) * 0.1;

        // Fade in/out
        if (this.growing) {
            this.opacity += this.fadeSpeed;
            if (this.opacity >= 0.7) this.growing = false;
        } else {
            this.opacity -= this.fadeSpeed;
            if (this.opacity <= 0.1) this.growing = true;
        }

        // Reset if out of bounds
        if (this.y < -10 || this.x < -10 || this.x > canvas.width + 10) {
            this.reset();
            this.y = canvas.height + 10;
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201, 162, 39, ${this.opacity})`;
        ctx.fill();

        // Glow effect
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201, 162, 39, ${this.opacity * 0.3})`;
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    const particleCount = Math.floor((canvas.width * canvas.height) / 15000);
    for (let i = 0; i < particleCount; i++) {
        particles.push(new GoldenParticle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    requestAnimationFrame(animateParticles);
}

// Initialize particles
resizeCanvas();
initParticles();
animateParticles();

window.addEventListener('resize', () => {
    resizeCanvas();
    initParticles();
});

// ===== LIBRARY APPLICATION =====

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
    { id: 20, isbn: "9780544336261", title: "The Giver", genre: "Dystopian", author: "Lois Lowry" },
    { id: 21, isbn: "9780307277671", title: "The Road", genre: "Dystopian", author: "Cormac McCarthy" },
    { id: 22, isbn: "9780618640157", title: "Life of Pi", genre: "Adventure", author: "Yann Martel" },
    { id: 23, isbn: "9780316015844", title: "Twilight", genre: "Young Adult", author: "Stephenie Meyer" },
    { id: 24, isbn: "9780141182605", title: "Of Mice and Men", genre: "Classic", author: "John Steinbeck" },
    { id: 25, isbn: "9780525478812", title: "The Fault in Our Stars", genre: "Young Adult", author: "John Green" },
    { id: 26, isbn: "9780385490818", title: "The Handmaid's Tale", genre: "Dystopian", author: "Margaret Atwood" },
    { id: 27, isbn: "9780679783268", title: "Pride and Prejudice", genre: "Romance", author: "Jane Austen" },
    { id: 28, isbn: "9780446310789", title: "To Kill a Mockingbird", genre: "Classic", author: "Harper Lee" },
    { id: 29, isbn: "9780062316097", title: "Sapiens", genre: "Historical", author: "Yuval Noah Harari" },
    { id: 30, isbn: "9780618260300", title: "The Silmarillion", genre: "Fantasy", author: "J.R.R. Tolkien" },
    { id: 31, isbn: "9780140283334", title: "The Odyssey", genre: "Classic", author: "Homer" },
    { id: 32, isbn: "9780143039433", title: "Frankenstein", genre: "Classic", author: "Mary Shelley" },
    { id: 33, isbn: "9780385737951", title: "Gone Girl", genre: "Romance", author: "Gillian Flynn" },
    { id: 34, isbn: "9780374528379", title: "The Underground Railroad", genre: "Historical", author: "Colson Whitehead" },
    { id: 35, isbn: "9780439139595", title: "Catching Fire", genre: "Young Adult", author: "Suzanne Collins" },
    { id: 36, isbn: "9780316769174", title: "The Lightning Thief", genre: "Fantasy", author: "Rick Riordan" },
    { id: 37, isbn: "9780062024039", title: "Divergent", genre: "Young Adult", author: "Veronica Roth" },
    { id: 38, isbn: "9780743477123", title: "The Da Vinci Code", genre: "Adventure", author: "Dan Brown" },
    { id: 39, isbn: "9780525555360", title: "Educated", genre: "Historical", author: "Tara Westover" },
    { id: 40, isbn: "9780679735779", title: "The Handmaid's Tale", genre: "Dystopian", author: "Margaret Atwood" },
    { id: 41, isbn: "9780143127550", title: "The Kite Runner", genre: "Historical", author: "Khaled Hosseini" },
    { id: 42, isbn: "9780060935467", title: "A Tree Grows in Brooklyn", genre: "Classic", author: "Betty Smith" },
    { id: 43, isbn: "9780553380163", title: "A Game of Thrones", genre: "Fantasy", author: "George R.R. Martin" },
    { id: 44, isbn: "9780525479451", title: "The Seven Husbands of Evelyn Hugo", genre: "Romance", author: "Taylor Jenkins Reid" },
    { id: 45, isbn: "9780385534635", title: "The Martian", genre: "Adventure", author: "Andy Weir" },
    { id: 46, isbn: "9781250012579", title: "Red Queen", genre: "Young Adult", author: "Victoria Aveyard" },
    { id: 47, isbn: "9780316229296", title: "All the Light We Cannot See", genre: "Historical", author: "Anthony Doerr" },
    { id: 48, isbn: "9780345816023", title: "Ready Player One", genre: "Adventure", author: "Ernest Cline" }
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

        // Start with all library books
        books = library.map(libraryBook => {
            // Find if this book was stored
            const storedBook = storedBooks.find(b => b.id === libraryBook.id);

            if (storedBook) {
                // Book exists in storage - keep checkout data
                return {
                    ...libraryBook,
                    isCheckedOut: storedBook.isCheckedOut || false,
                    checkedOutTo: storedBook.checkedOutTo || ""
                };
            } else {
                // New book not in storage - add as available
                return {
                    ...libraryBook,
                    isCheckedOut: false,
                    checkedOutTo: ""
                };
            }
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

// Book color palette - Dark Academia theme
const bookColors = [
    'linear-gradient(90deg, #2d1f1f 0%, #4a3535 2%, #5c4040 5%, #6b4a4a 50%, #5c4040 95%, #4a3535 98%, #2d1f1f 100%)', // Dark Burgundy
    'linear-gradient(90deg, #1a2520 0%, #2d4035 2%, #3d5545 5%, #4a6652 50%, #3d5545 95%, #2d4035 98%, #1a2520 100%)', // Forest Green
    'linear-gradient(90deg, #1a1a2e 0%, #2d2d4a 2%, #3d3d5c 5%, #4a4a6b 50%, #3d3d5c 95%, #2d2d4a 98%, #1a1a2e 100%)', // Deep Navy
    'linear-gradient(90deg, #2e1f1f 0%, #4a2d2d 2%, #5c3535 5%, #722f37 50%, #5c3535 95%, #4a2d2d 98%, #2e1f1f 100%)', // Wine Red
    'linear-gradient(90deg, #1f1a15 0%, #3d3025 2%, #524030 5%, #6b5a40 50%, #524030 95%, #3d3025 98%, #1f1a15 100%)', // Antique Brown
    'linear-gradient(90deg, #1a1520 0%, #2d2535 2%, #3d3045 5%, #4a3d55 50%, #3d3045 95%, #2d2535 98%, #1a1520 100%)', // Dusty Purple
    'linear-gradient(90deg, #252015 0%, #403520 2%, #554528 5%, #6b5830 50%, #554528 95%, #403520 98%, #252015 100%)', // Old Gold
    'linear-gradient(90deg, #151515 0%, #252525 2%, #353535 5%, #454545 50%, #353535 95%, #252525 98%, #151515 100%)', // Charcoal
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
        background: linear-gradient(135deg, #1a3c2a, #2a5c4a);
        color: #f5e6c8;
        padding: 1.25rem 2rem;
        border-radius: 8px;
        border: 1px solid rgba(201, 162, 39, 0.3);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        z-index: 3000;
        font-family: 'EB Garamond', Georgia, serif;
        font-size: 1.05rem;
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
            <div class="book-cover">
                <h3 class="book-title">${book.title}</h3>
                <div class="book-info"><strong>Genre:</strong> ${book.genre || 'Other'}</div>
                <div class="book-info"><strong>ID:</strong> ${book.id}</div>
                <div class="book-info"><strong>ISBN:</strong> ${book.isbn}</div>
                <div class="book-status ${statusClass}">${statusText}</div>
                ${checkoutInfo}
            </div>
        </div>
    `;
}

// Setup Admin Mode
function setupAdminMode() {
    const adminToggle = document.getElementById('admin-toggle');
    const adminIcon = adminToggle.querySelector('i');
    const adminText = adminToggle.querySelector('span');

    adminToggle.addEventListener('click', () => {
        if (!isAdminMode) {
            // Prompt for password
            const password = prompt('Enter curator password:');
            if (password === ADMIN_PASSWORD) {
                isAdminMode = true;
                adminIcon.className = 'fas fa-lock-open';
                adminText.textContent = 'Exit';
                adminToggle.classList.add('active-admin');
                showNotification('Curator mode enabled');

                // Refresh the current view
                if (currentSearchTerm || currentGenre !== 'all') {
                    filterBooksByGenre();
                } else {
                    renderAvailableBooks();
                    renderCheckedOutBooks();
                }
            } else if (password !== null) {
                showNotification('Incorrect password');
            }
        } else {
            // Exit admin mode
            isAdminMode = false;
            adminIcon.className = 'fas fa-key';
            adminText.textContent = 'Curator';
            adminToggle.classList.remove('active-admin');
            showNotification('Curator mode disabled');

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
