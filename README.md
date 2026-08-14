# Northstar Retail Co. - Customer Support & Stock Checker Portal

A web application built for Northstar Retail Co. to streamline customer self-service, order tracking, store inventory lookups, and automated support ticket routing.

---

## 📋 Table of Contents
- [Project Summary](#-project-summary)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Local Setup Instructions](#-local-setup-instructions)

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
   git clone [https://github.com/your-username/repository-name.git](https://github.com/your-username/repository-name.git)
   cd repository-name
