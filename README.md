# FinanceTrackr

---

FinanceTrackr is an application where users can enter and track their income and expenses, as well as view weekly, monthly, and yearly statistics of their spending to see where their money goes. Users can also set a monthly spending limit and monitor their monthly expenses, receiving a notification message based on the percentage of their monthly limit that has been spent. In addition to these features, users can see the category and subcategory where they have spent the most money since they started using the application, as well as the percentage change of that category and subcategory compared to the previous month. Users can also view the total amount of money spent since they started using the application and the percentage change compared to the previous month, as well as the total amount spent today and the percentage change compared to yesterday. Users can export reports in Excel files for income entered this month, all income since they started using the application, expenses for this month, and expenses since they started using the application.

---

## Live Demo

Visit the production application: [link](#)

---

## Features

### Sign in with Google

- Users can sign in using their Google account.
- Signing in provides secure access to all application features.

---

### Income Management

- Users can enter income for the current month, divided into three categories: salary, part-time, and gift.
- By clicking a button, a modal opens where the user can select a category and enter the desired amount.
- Users can also open a modal to update previous income entries.
- By clicking the edit button, an update modal opens, initially displaying the last 5 income entries, with the option to load 5 more at a time.
- Each income card shows the date and time of entry, and clicking the edit button opens a form with input fields to modify the selected transaction.
- When an income entry is edited, the date and time of the transaction are updated to the current time when the change is confirmed.
- In the income breakdown section, information is displayed for each of the three categories. The total amount entered for each category this month is shown.
- The width of the bar (card) for each category depends on the percentage of that category's total amount relative to the total income for the month.

---

### Budget Control

- By clicking the settings button on this card, a modal opens where the user can select their spending limit using a range input.
- Once the limit is set, the card displays a message based on the percentage calculation of the total expenses for the current month relative to the selected limit.
- The progress bar increases or decreases based on this calculation.

---

### Recent Transactions

- In the recent transactions section, users can view their most recent income and expense transactions.
- Each transaction card displays information such as category, subcategory, date and time, and amount.
- Initially, the last 12 transactions are displayed, and scrolling to the bottom loads 6 more, up to a maximum of 18 recent transactions in this feature.
- Any income or expense entered in the current month is automatically rendered here.
- Transactions are sorted from newest to oldest.
- Users can also add an expense. By clicking "add new," a modal opens where the user can select an expense category from the database.
- Only after selecting a category does the next select field allow the user to choose a subcategory based on the selected category.
- Once both category and subcategory are selected, the user can enter the expense amount.

---

### Expense Recap

- There are three time filter options: the last seven days, the last month, or the last year.
- The initial view shows the last seven days.
- Based on the selected time filter, the statistics and donut chart update.
- This section displays the top 3 categories where the most money was spent during the selected period, showing the amount and percentage of total expenses spent on them.

---

### Expense Insights

- Consists of four cards showing:
  - The category where the most money has been spent since using the application, the total amount spent, and the percentage increase or decrease in spending for that category compared to the previous month.
  - The same information for the subcategory.
  - The total amount of money spent since starting to use the application and the percentage change compared to the previous month.
  - The total spending today and the percentage change compared to yesterday.
  - If the total amount of money spent last month is 0, then every new transaction this month is considered an increase, and the percentage change is shown as 100%.

---

### Expense History

- A table displaying all expenses since the start of using the application, sorted from newest to oldest.
- The table shows the category, subcategory, transaction ID, amount, and date.
- Users can choose how many transactions to display per page: 5, 10, or 15.

---

### Documents

- Users can export data to an xlsx file.
- It is possible to export all income or expenses for the current month, or all income or expenses since the start of using the application.

---
