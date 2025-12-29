// Library data - matching the Java application
const library = [
    { id: 1, isbn: "9780061120084", title: "To Kill a Mockingbird" },
    { id: 2, isbn: "9780451524935", title: "1984" },
    { id: 3, isbn: "9780743273565", title: "The Great Gatsby" },
    { id: 4, isbn: "9780141439518", title: "Pride and Prejudice" },
    { id: 5, isbn: "9780316769488", title: "The Catcher in the Rye" },
    { id: 6, isbn: "9780547928227", title: "The Hobbit" },
    { id: 7, isbn: "9781451673319", title: "Fahrenheit 451" },
    { id: 8, isbn: "9781503280786", title: "Moby-Dick" },
    { id: 9, isbn: "9780141441146", title: "Jane Eyre" },
    { id: 10, isbn: "9780060850524", title: "Brave New World" },
    { id: 11, isbn: "9780451526342", title: "Animal Farm" },
    { id: 12, isbn: "9780141439556", title: "Wuthering Heights" },
    { id: 13, isbn: "9780544003415", title: "The Lord of the Rings" },
    { id: 14, isbn: "9780066238500", title: "The Chronicles of Narnia" },
    { id: 15, isbn: "9780439023528", title: "The Hunger Games" },
    { id: 16, isbn: "9780590353427", title: "Harry Potter and the Sorcerer's Stone" },
    { id: 17, isbn: "9780142424179", title: "The Fault in Our Stars" },
    { id: 18, isbn: "9780062315006", title: "The Alchemist" },
    { id: 19, isbn: "9780375842207", title: "The Book Thief" },
    { id: 20, isbn: "9780544336261", title: "The Giver" }
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
        books = JSON.parse(stored);
    }
}

// Save data to localStorage
function saveToStorage() {
    localStorage.setItem('neighborhoodLibrary', JSON.stringify(books));
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    loadFromStorage();
    renderAvailableBooks();
    renderCheckedOutBooks();
    setupNavigation();
    setupModal();
    setupAboutModal();
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

    shelf.innerHTML = availableBooks.map(book => createBookCard(book)).join('');

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

    shelf.innerHTML = checkedOutBooks.map(book => createBookCard(book)).join('');

    // Add click handlers
    checkedOutBooks.forEach(book => {
        const card = shelf.querySelector(`[data-book-id="${book.id}"]`);
        card.addEventListener('click', () => openBookModal(book));
    });
}

// Create book card HTML
function createBookCard(book) {
    const statusClass = book.isCheckedOut ? 'status-checkedout' : 'status-available';
    const statusText = book.isCheckedOut ? 'Checked Out' : 'Available';
    const checkoutInfo = book.isCheckedOut ? `<div class="checkout-info">Checked out to: ${book.checkedOutTo}</div>` : '';

    return `
        <div class="book-card" data-book-id="${book.id}">
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
    const closeBtn = document.querySelector('.close');

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

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
        `;
    } else {
        modalCheckoutInfo.innerHTML = `<strong>Status:</strong> <span style="color: #2d5016;">Available</span>`;
        modalActions.innerHTML = `
            <div style="width: 100%;">
                <input type="text" id="checkout-name" placeholder="Enter your name" />
                <button class="modal-btn" onclick="checkOutBook(${book.id})">Check Out Book</button>
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
        renderAvailableBooks();
        renderCheckedOutBooks();

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
        renderAvailableBooks();
        renderCheckedOutBooks();

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
    const closeBtn = document.querySelector('.about-close');

    aboutBtn.addEventListener('click', () => {
        aboutModal.style.display = 'block';
    });

    closeBtn.addEventListener('click', () => {
        aboutModal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === aboutModal) {
            aboutModal.style.display = 'none';
        }
    });
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
