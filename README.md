# E-library
# E-Library Management System

## 📖 Overview
The **E-Library Management System** is a web-based application that helps users browse, borrow, and manage books digitally. The system allows users to search for books, borrow a maximum of three books, track due dates, and receive alerts for overdue or upcoming due books. The project also includes Selenium automation for testing the functionalities.

## 🚀 Features
- **Search Books**: Users can search for books by title, author, or category.
- **Borrow Books**: A user can borrow up to **3 books at a time**.
- **Return Books**: Users can return borrowed books anytime.
- **Due Date Tracking**: Books have a **14-day** borrowing period.
- **Alerts & Notifications**: Users receive alerts for:
  - Books **due in 3 days**.
  - **Overdue books**.
  - Borrow limit exceeded.
- **Selenium Test Automation**: Automated tests to verify search, borrow, return, and alert functionalities.

## 🏗️ Tech Stack
- **Frontend**: HTML, CSS, JavaScript
- **Automation Testing**: Python, Selenium WebDriver

## 📂 Project Structure
```
E-library/
│── index.html      # Main UI
│── styles.css      # Styling
│── script.js       # Frontend Logic
│── test_automation.py  # Selenium Test Scripts
```

## 📦 Installation & Usage
### 🔧 Prerequisites
- A modern web browser (Chrome recommended)
- Python installed (for Selenium automation)
- ChromeDriver (for Selenium automation)

### 🖥️ Run the Application
1. Clone this repository:
   ```bash
   git clone https://github.com/prikshit06/E-library.git
   ```
2. Open `index.html` in a web browser.
3. Interact with the system by searching, borrowing, and returning books.

### 🤖 Run Selenium Tests
1. Install required dependencies:
   ```bash
   pip install selenium
   ```
2. Run the test script:
   ```bash
   python test_automation.py
   ```



## 🎯 Future Enhancements
- **User Authentication**: Implement user logins to track individual borrow history.
- **Database Integration**: Store book data using MySQL or Firebase.
- **Admin Panel**: Add features to manage book inventory.

## 📜 License
This project is licensed under the MIT License.

## 🤝 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you’d like to change.


