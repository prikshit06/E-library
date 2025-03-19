from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
import datetime

# Initialize WebDriver
driver = webdriver.Chrome()
driver.get("http://127.0.0.1:5500/")  # Update if needed
driver.maximize_window()

# ✅ Verify Page Load
print("📌 Verifying Page Load...")
print("URL:", driver.current_url)
print("Title:", driver.title)
time.sleep(2)

# ✅ Search for a Book
def search_for_book(book_title):
    print(f"📌 Searching for '{book_title}'...")

    search_box = driver.find_element(By.ID, "searchInput")
    search_box.clear()
    search_box.send_keys(book_title)
    search_box.send_keys(Keys.RETURN)

    # ✅ Ensure search results appear
    WebDriverWait(driver, 3).until(
        EC.text_to_be_present_in_element((By.ID, "bookList"), book_title)
    )
    print(f"✅ '{book_title}' search completed!")
    time.sleep(2)

search_for_book("Harry Potter")

# ✅ Borrow a Book
def borrow_book(book_title):
    print(f"📌 Borrowing '{book_title}'...")

    try:
        borrow_button = WebDriverWait(driver, 3).until(
            EC.element_to_be_clickable((By.XPATH, f"//h3[contains(text(), '{book_title}')]/following-sibling::button[contains(text(), 'Borrow')]"))
        )
        borrow_button.click()
        print(f"✅ Successfully borrowed '{book_title}'!")
    except:
        print(f"❌ Borrow button not found for '{book_title}'")

    time.sleep(2)

borrow_book("Harry Potter")

# ✅ Borrow More Books (Up to 3)
borrow_book("The Great Gatsby")
borrow_book("1984")
borrow_book("To Kill a Mockingbird")  # This should trigger an alert

# ✅ Check Borrow Limit Alert
def check_borrow_limit_alert():
    print("📌 Checking for borrow limit alert...")

    try:
        alert = WebDriverWait(driver, 3).until(
            EC.visibility_of_element_located((By.XPATH, "//div[contains(text(), 'You cannot borrow more than 3 books!')]"))
        )
        print(f"✅ Borrow limit alert displayed: {alert.text}")
    except:
        print("❌ Borrow limit alert not found.")

check_borrow_limit_alert()

# ✅ Return a Book
def return_book(book_title):
    print(f"📌 Returning '{book_title}'...")

    try:
        return_button = WebDriverWait(driver, 3).until(
            EC.element_to_be_clickable((By.XPATH, f"//h3[contains(text(), '{book_title}')]/following-sibling::button[contains(text(), 'Return')]"))
        )
        return_button.click()
        print(f"✅ '{book_title}' returned successfully!")
    except:
        print(f"❌ Return button not found for '{book_title}'")

    time.sleep(2)

return_book("Harry Potter")

# ✅ Fix: Simulate 3-Day Reminder Alert
def check_3_day_alert():
    print("📌 Simulating a book due in 3 days...")

    # Calculate a due date **3 days from today**
    three_days_later = (datetime.date.today() + datetime.timedelta(days=3)).strftime('%Y-%m-%d')

    # Inject borrowed book with a **3-day due date**
    script = f"""
    localStorage.setItem("borrowedBooks", JSON.stringify([
        {{"id": 2, "title": "The Great Gatsby", "author": "F. Scott Fitzgerald", "category": "Classic", "dueDate": "{three_days_later}"}}
    ]));
    """
    driver.execute_script(script)
    driver.refresh()
    time.sleep(2)

    # ✅ Check for Reminder Alert
    print("📌 Checking for 3-day reminder alert...")

    try:
        alert = WebDriverWait(driver, 3).until(
            EC.presence_of_element_located((By.CLASS_NAME, "alert-warning"))
        )
        if "due in 3 days" in alert.text:
            print(f"✅ 3-day reminder alert found: {alert.text}")
        else:
            print("❌ 3-day reminder alert text incorrect.")
    except:
        print("❌ No 3-day reminder alert found.")

check_3_day_alert()

# ✅ Fix: Check Overdue Alerts
def check_due_date_alerts():
    print("📌 Simulating an overdue book...")

    # Simulate an **overdue book** by setting an old due date
    past_due_date = (datetime.date.today() - datetime.timedelta(days=5)).strftime('%Y-%m-%d')

    script = f"""
    localStorage.setItem("borrowedBooks", JSON.stringify([
        {{"id": 3, "title": "1984", "author": "George Orwell", "category": "Dystopian", "dueDate": "{past_due_date}"}}
    ]));
    """
    driver.execute_script(script)
    driver.refresh()
    time.sleep(2)

    # ✅ Check for Overdue Alert
    print("📌 Checking for overdue alerts...")

    try:
        alerts = WebDriverWait(driver, 3).until(
            EC.presence_of_all_elements_located((By.CLASS_NAME, "alert-danger"))
        )

        if alerts:
            for alert in alerts:
                print(f"✅ Overdue alert found: {alert.text}")
        else:
            print("❌ Overdue alert message incorrect.")
    except:
        print("❌ No overdue alerts found.")

check_due_date_alerts()

# ✅ Close the browser
driver.quit()
print("✅ All tests completed!")
