// Sample books
// Sample books with cover images
const books = [
    { id: 1, title: "Harry Potter", author: "J.K. Rowling", category: "Fantasy", cover: "https://images-na.ssl-images-amazon.com/images/I/81YOuOGFCJL.jpg" },
    { id: 2, title: "The Great Gatsby", author: "F. Scott Fitzgerald", category: "Classic", cover: "https://upload.wikimedia.org/wikipedia/commons/a/a0/The_Great_Gatsby_cover_1925.jpg"
 },
    { id: 3, title: "1984", author: "George Orwell", category: "Dystopian", cover: "https://images-na.ssl-images-amazon.com/images/I/71kxa1-0mfL.jpg" },
    { id: 4, title: "To Kill a Mockingbird", author: "Harper Lee", category: "Classic", cover: "https://m.media-amazon.com/images/I/81gepf1eMqL._AC_UF1000,1000_QL80_.jpg" }
];


let borrowedBooks = JSON.parse(localStorage.getItem("borrowedBooks")) || [];

// Load Books
function loadBooks() {
    const bookList = document.getElementById("bookList");
    bookList.innerHTML = "";

    books.forEach(book => {
        let bookElement = document.createElement("div");
        bookElement.classList.add("book");
        bookElement.id = `book-${book.id}`;

        bookElement.innerHTML = `
            <img src="${book.cover}" alt="${book.title}" class="book-cover">
            <h3>${book.title}</h3>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>Category:</strong> ${book.category}</p>
            <button class="borrow-btn" onclick="borrowBook(${book.id})" ${isBorrowed(book.id) ? "disabled" : ""}>Borrow</button>
        `;
        bookList.appendChild(bookElement);
    });
}



// Check if Book is Borrowed
function isBorrowed(bookId) {
    return borrowedBooks.some(b => b.id === bookId);
}

// Borrow a Book
function borrowBook(bookId) {
    if (borrowedBooks.length >= 3) {
        showAlert("⚠️ You cannot borrow more than 3 books!", "warning");
        return;
    }

    const book = books.find(b => b.id === bookId);
    if (book) {
        borrowedBooks.push({ ...book, dueDate: getDueDate() });
        localStorage.setItem("borrowedBooks", JSON.stringify(borrowedBooks));
        showAlert(`📖 You borrowed "${book.title}"`, "success");
        loadBooks();
        updateBorrowedBooks();
    }
}

// Calculate Due Date (14 Days from Now)
function getDueDate() {
    let date = new Date();
    date.setDate(date.getDate() + 14);
    return date.toISOString().split('T')[0];
}

// Return a Book
function returnBook(bookId) {
    borrowedBooks = borrowedBooks.filter(book => book.id !== bookId);
    localStorage.setItem("borrowedBooks", JSON.stringify(borrowedBooks));
    showAlert("✅ Book returned successfully!", "success");
    loadBooks();
    updateBorrowedBooks();
}

// Update Borrowed Books List
function updateBorrowedBooks() {
    const borrowedList = document.getElementById("borrowedList");
    borrowedList.innerHTML = borrowedBooks.map(book =>
        `<div class="book">
            <h3>${book.title}</h3>
            <p>Due Date: ${book.dueDate}</p>
            <button class="return-btn" onclick="returnBook(${book.id})">Return</button>
        </div>`
    ).join('');
    checkDueDates();
}

// Search Books
function searchBooks() {
    let query = document.getElementById("searchInput").value.toLowerCase();

    books.forEach(book => {
        let bookElement = document.getElementById(`book-${book.id}`);
        if (bookElement) {
            bookElement.style.display = 
                book.title.toLowerCase().includes(query) || 
                book.author.toLowerCase().includes(query) || 
                book.category.toLowerCase().includes(query) ? "block" : "none";
        }
    });
}


// Reset Search
function resetSearch() {
    document.getElementById("searchInput").value = "";
    loadBooks();
}

// Show Alert
function showAlert(message, type) {
    const alertContainer = document.getElementById("alertContainer");
    const alertBox = document.createElement("div");
    alertBox.classList.add("alert-box", type === "warning" ? "alert-warning" : "alert-danger");
    alertBox.innerHTML = `${message} <span class="close-alert" onclick="this.parentElement.remove()">✖</span>`;
    alertContainer.appendChild(alertBox);
    setTimeout(() => alertBox.remove(), 5000);
}

// Function to check and display due date alerts
function checkDueDates() {
    const today = new Date();
    borrowedBooks.forEach(book => {
        const dueDate = new Date(book.dueDate);
        const timeDiff = dueDate - today;
        const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

        if (daysLeft === 3) {
            showAlert(`🟡 Reminder: '${book.title}' is due in 3 days!`, "warning");
        } else if (daysLeft < 0) {
            showAlert(`🔴 Alert: '${book.title}' is overdue! Please return it immediately!`, "danger");
        }
    });
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
    loadBooks();
    updateBorrowedBooks();

    // ✅ Enable 'Enter' key to trigger search
    const searchInput = document.getElementById("searchInput");
    searchInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {  // Check if 'Enter' key is pressed
            event.preventDefault();   // Prevent default form behavior
            searchBooks();            // Trigger search function
        }
    });
});
