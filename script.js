document.addEventListener("DOMContentLoaded", () => {

  // ==========================================
  // 1. TOOL 01: ORDER STATUS LOOKUP
  // ==========================================
  const orderForm = document.getElementById("order-form");
  const orderResult = document.getElementById("order-result");

  if (orderForm) {
    orderForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const orderNumber = document.getElementById("order-number").value.trim();
      const orderEmail = document.getElementById("order-email").value.trim();

      // Simple handling - replace with your actual lookup function/data
      orderResult.innerHTML = `
        <div style="margin-top: 16px; padding: 12px; border-left: 4px solid #1e9488; background: #f4f6f8;">
          <p style="margin: 0;"><strong>Status for ${orderNumber}:</strong> In Transit</p>
          <p style="margin: 4px 0 0 0; font-size: 0.9em; color: #555;">Updates sent to ${orderEmail}</p>
        </div>
      `;
    });
  }

  // ==========================================
  // 2. TOOL 02: PRODUCT AVAILABILITY
  // ==========================================
  const stockForm = document.getElementById("stock-form");
  const stockResult = document.getElementById("stock-result");

  if (stockForm) {
    stockForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const query = document.getElementById("stock-query").value.trim();
      const location = document.getElementById("stock-location").value;

      // Simple handling - replace with your actual searchInventory() function
      stockResult.innerHTML = `
        <div style="margin-top: 16px; padding: 12px; border-left: 4px solid #1e9488; background: #f4f6f8;">
          <p style="margin: 0;"><strong>Searching for:</strong> "${query}"</p>
          <p style="margin: 4px 0 0 0; font-size: 0.9em; color: #555;">Location Filter: ${location.toUpperCase()}</p>
        </div>
      `;
    });
  }

  // ==========================================
  //  TOOL 03: RETURNS & REFUND REQUEST
  // ==========================================
  const fallbackForm = document.getElementById("support-fallback-form");
  const fallbackConfirmation = document.getElementById("fallback-confirmation");

  if (fallbackForm) {
    fallbackForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const order = document.getElementById("fallback-order").value.trim();
      const item = document.getElementById("fallback-item").value.trim();

      fallbackConfirmation.innerHTML = `
        <div style="margin-top: 16px; padding: 12px; border-left: 4px solid #e05d38; background: #f4f6f8;">
          <p style="margin: 0;"><strong>Return Request Submitted!</strong></p>
          <p style="margin: 4px 0 0 0; font-size: 0.9em; color: #555;">Ticket opened for order #${order} (${item}). Check your email for confirmation.</p>
        </div>
      `;

      fallbackForm.reset();
    });
  }
  // FAQ Accordion Toggle Listener
const faqQuestions = document.querySelectorAll(".faq-question");

  faqQuestions.forEach((button) => {
    button.addEventListener("click", () => {
      const faqItem = button.closest(".faq-item");

      // Optional: Close other open accordion items for a clean UI
      document.querySelectorAll(".faq-item").forEach((item) => {
        if (item !== faqItem) {
          item.classList.remove("active");
        }
      });

      // Toggle the active class on the clicked item
      if (faqItem) {
        faqItem.classList.toggle("active");
      }
    });
  });

})

});
