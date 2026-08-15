
// 1. SAMPLE 
const inventory = [
  { id: "P001", productName: "Laptop Pro 15", category: "Electronics", location: "Nairobi", price: "$850", status: "In Stock" },
  { id: "P002", productName: "Wireless Mouse", category: "Accessories", location: "Mombasa", price: "$25", status: "In Stock" },
  { id: "P003", productName: "Mechanical Keyboard", category: "Accessories", location: "Nairobi", price: "$75", status: "In Stock" },
  { id: "P004", productName: "27-inch Monitor", category: "Electronics", location: "Kisumu", price: "$300", status: "Low Stock" },
  { id: "P005", productName: "USB-C Hub Adapter", category: "Accessories", location: "Nairobi", price: "$40", status: "In Stock" }
];

// GUARANTEED SEARCH ALGORITHM

function searchInventory(userInput, dataList) {
  const rawQuery = userInput.toLowerCase().trim();

  // If query is empty, return empty set
  if (!rawQuery) {
    return { isFallback: false, items: [] };
  }

  // Split query into individual search terms (e.g. "laptop nairobi" -> ["laptop", "nairobi"])
  const queryTokens = rawQuery.split(/\s+/);

  //  Strict/Partial Match - Matches items where ALL tokens match name, category, or location
  let results = dataList.filter(item => {
    const itemText = `${item.productName} ${item.category} ${item.location}`.toLowerCase();
    return queryTokens.every(token => itemText.includes(token));
  });

  //  Broad Match - If strict match fails, match items containing ANY of the terms
  if (results.length === 0) {
    results = dataList.filter(item => {
      const itemText = `${item.productName} ${item.category} ${item.location}`.toLowerCase();
      return queryTokens.some(token => itemText.includes(token));
    });
  }

  // Location Match - Check if any word matches a city/location name specifically
  if (results.length === 0) {
    const matchedLocation = queryTokens.find(token =>
      dataList.some(item => item.location.toLowerCase().includes(token))
    );

    if (matchedLocation) {
      results = dataList.filter(item => item.location.toLowerCase().includes(matchedLocation));
    }
  }

  //  Guaranteed Fallback - Show top featured items so the page is never blank
  if (results.length === 0) {
    return {
      isFallback: true,
      message: "No exact match found for your search. Here are popular products available:",
      items: dataList.slice(0, 3)
    };
  }

  return {
    isFallback: false,
    items: results
  };
}

function renderProducts(searchResult, containerElement) {
  containerElement.innerHTML = "";

  // Show friendly notification if using fallback recommendations
  if (searchResult.isFallback) {
    const notice = document.createElement("div");
    notice.className = "hint";
    notice.style.marginBottom = "16px";
    notice.style.color = "var(--orange)";
    notice.style.fontWeight = "500";
    notice.textContent = searchResult.message;
    containerElement.appendChild(notice);
  }

  if (searchResult.items.length === 0) {
    containerElement.innerHTML = `<p class="hint">Please enter a product name or location to search.</p>`;
    return;
  }

  // Build product cards grid
  searchResult.items.forEach(product => {
    const card = document.createElement("div");
    card.className = "tool-card";
    card.innerHTML = `
      <div class="tool-card-head">
        <div>
          <div class="tool-tag">
            <span class="dot ${product.status === 'In Stock' ? 'dot-teal' : 'dot-orange'}"></span>
            ${product.status}
          </div>
          <h2>${product.productName}</h2>
        </div>
      </div>
      <div class="tool-card-body">
        <p><strong>Category:</strong> ${product.category}</p>
        <p><strong>Location:</strong> ${product.location}</p>
        <p><strong>Price:</strong> ${product.price}</p>
      </div>
    `;
    containerElement.appendChild(card);
  });
}

// ==========================================
// 4. EVENT LISTENERS & INITIALIZATION
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  // --- SEARCH FORM HANDLER ---
  const searchForm = document.querySelector("#search-form") || document.querySelector("form");
  const searchInput = document.querySelector("#search-input") || document.querySelector("input[type='text']");
  const resultsContainer = document.querySelector("#results-container") || document.querySelector(".tools-grid");

  if (searchInput && resultsContainer) {
    // Real-time search feedback as the user types
    searchInput.addEventListener("input", (e) => {
      const query = e.target.value;
      if (query.trim().length > 0) {
        const searchResult = searchInventory(query, inventory);
        renderProducts(searchResult, resultsContainer);
      }
    });

    // Handle full form submission / enter key
    if (searchForm) {
      searchForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const searchResult = searchInventory(searchInput.value, inventory);
        renderProducts(searchResult, resultsContainer);
      });
    }
  }

  // --- FAQ ACCORDION TOGGLE HANDLER ---
  const faqQuestions = document.querySelectorAll(".faq-question");

  faqQuestions.forEach(question => {
    question.addEventListener("click", () => {
      const faqItem = question.closest(".faq-item");
      
      // Close all other accordions for clean accordion behavior
      document.querySelectorAll(".faq-item").forEach(item => {
        if (item !== faqItem) {
          item.classList.remove("active");
        }
      });

      // Toggle current accordion state
      faqItem.classList.toggle("active");
    });
  });
});
