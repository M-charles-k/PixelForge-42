# Northstar Retail Co. - Customer Support & Stock Checker Portal

A web application built for Northstar Retail Co. to streamline customer self-service, order tracking, store inventory lookups, and automated support ticket routing.

---

## 📋 Table of Contents
- [Project Summary](#-project-summary)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Local Setup Instructions](#-local-setup-instructions)
- [Folder Structure](#-folder-structure)
- [Contributors](#-contributors)

---

## 📌 Project Summary

The **Customer Support & Stock Checker Portal** enables customers to independently check order delivery statuses, inspect item availability across local store hubs, and submit structured return or exchange requests.

By unifying order lookups, inventory search, and ticket routing into a single interface, the portal reduces direct support ticket volume while maintaining transparency and fast response times.

---

## ✨ Key Features

### Tool 01: Order Status Lookup
* **Dual Validation:** Accepts order reference numbers (e.g., `ORD-8419`, `ORD-3172`, `ORD-9504`) alongside customer email addresses.
* **Real-time Status Display:** Queries the `orders.json` dataset to display live fulfillment statuses (`Delivered`, `In Transit`, `Processing`, `Out for Delivery`, or `Cancelled`) along with direct tracking links.
* **Fallback Link:** Prompts customers to open a support ticket if an order cannot be located.

### Tool 02: Product Availability Checker
* **Multi-Attribute Search:** Search products by name or SKU.
* **Location Filtering:** Filter stock by specific retail branches (*Nairobi Central*, *Mombasa Hub*, *Kisumu Branch*) or search across *All Locations*.
* **Stock Badge Indicators:** Visual badges displaying stock availability and size availability.

### Tool 03: Returns & Refund Request Form
* **Structured Submission:** Captures order numbers, email addresses, item details, return reasons, and preferred resolutions (Full Refund, Exchange, Store Credit).
* **Automated Reference Generator:** Generates a unique tracking reference ID (`NSR-RET-XXXX`) upon submission.

### Ticket Routing & FAQ Centre
* **Routing Reference:** Directs incoming queries to appropriate support workflows.
* **Collapsible FAQs:** Interactive accordion list answering common support queries.
* **Support Banner:** Displays operating hours with a direct link to the support form.

---

## 🛠️ Tech Stack

* **Frontend:** HTML5, CSS3 (Custom variables, CSS Grid, Flexbox)
* **Scripting:** JavaScript (ES6+, Fetch API, DOM manipulation)
* **Data Sources:** Local JSON (`orders.json`, `inventory.json`)

---

## 🚀 Local Setup Instructions

### Prerequisites
* A modern web browser
* [Git](https://git-scm.com/) installed on your system
* A local HTTP server runner (e.g., VS Code *Live Server* or Python)

### Setup Steps

1. **Clone the Repository:**
   ```bash
   git clone https://github.com
   cd group-42
   ```

2. **Run Locally:**
   * Open the folder in VS Code.
   * Right-click `index.html` and select **Open with Live Server**.
   * Alternatively, use Python in your terminal:
     ```bash
     python -m http.server 8000
     ```
   * Open `http://localhost:8000` in your web browser.

---

## 📂 Folder Structure

```text
group-42/
├── index.html          # Main application portal structure
├── styles.css          # Core layouts, styles, and mobile media queries
├── app.js              # Application logic, data fetching, and form validation
├── orders.json         # Mock database for customer order tracking
└── inventory.json      # Mock database for store product inventory
```

---

## 👥 Contributors

* **alishiamungai**
* **BRAVO**
* **Sandra**
* **char**
* **George Eipa** (Me)
*
