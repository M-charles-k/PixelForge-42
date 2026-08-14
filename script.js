document.addEventListener('DOMContentLoaded', () => {

  // ORDER STATUS LOOKUP HANDLER
  
  const orderForm = document.getElementById('order-form');
  if (orderForm) {
    orderForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const orderInput = document.getElementById('order-number')?.value.trim();
      let resultDiv = document.getElementById('order-result');

      
      if (!resultDiv) {
        resultDiv = document.createElement('div');
        resultDiv.id = 'order-result';
        orderForm.appendChild(resultDiv);
      }

      if (!orderInput) {
        resultDiv.innerHTML = `<p style="color: #e11d48; margin-top: 12px;">Please enter an order number.</p>`;
        return;
      }

      try {
        const response = await fetch('orders.json');
        if (!response.ok) throw new Error('Failed to fetch orders dataset');
        const orders = await response.json();

        
          const matchedOrder = orders.find(
          (item) => item.OrderId && item.OrderId.toLowerCase() === orderInput.toLowerCase()
        );

        if (matchedOrder) {
          resultDiv.innerHTML = `
            <div style="border: 1px solid #10b981; background-color: #ecfdf5; border-radius: 8px; padding: 14px; margin-top: 16px;">
              <h4 style="margin: 0 0 6px 0; color: #065f46;">Order Found: ${matchedOrder.OrderId}</h4>
              <p style="margin: 0 0 8px 0; color: #047857;">Status: <strong>${matchedOrder.Status}</strong></p>
              <a href="${matchedOrder.Tracking_link}" target="_blank" style="color: #059669; font-weight: 600; text-decoration: underline;">
                Track Package →
              </a>
            </div>
          `;
        } else {
          resultDiv.innerHTML = `
            <div style="margin-top: 16px;">
              <p style="color: #e11d48; margin: 0 0 8px 0;">Order "<strong>${orderInput}</strong>" not found.</p>
              <button type="button" onclick="showSupportFallback('Missing order inquiry for Order ID: ${orderInput}')" class="btn btn-teal" style="font-size: 0.85rem; padding: 6px 12px;">
                Submit Support Ticket for Order
              </button>
            </div>
          `;
        }
      } catch (err) {
        console.error(err);
        resultDiv.innerHTML = `<p style="color: #e11d48; margin-top: 12px;">Error loading orders data. Ensure <code>orders.json</code> is present.</p>`;
      }
    });
  }


  //  STOCK SEARCH HANDLER //
  
  const stockForm = document.getElementById('stock-form');
  if (stockForm) {
    stockForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      /
          const queryInput = document.getElementById('stock-query')?.value.trim().toLowerCase() || '';
      const selectedLocation = document.getElementById('stock-location')?.value || 'all';

      let resultDiv = document.getElementById('stock-result');
      if (!resultDiv) {
        resultDiv = document.createElement('div');
        resultDiv.id = 'stock-result';
        stockForm.appendChild(resultDiv);
      }

      if (!queryInput) {
        resultDiv.innerHTML = `<p style="color: #e11d48; margin-top: 12px;">Please enter a product name or SKU to search.</p>`;
        return;
      }

      try {
        const response = await fetch('inventory.json');
        if (!response.ok) throw new Error('Failed to fetch inventory dataset');
        const inventory = await response.json();

        const matches = inventory.filter((item) => {
          const matchesNameOrSku =
            (item.name && item.name.toLowerCase().includes(queryInput)) ||
            (item.sku && item.sku.toLowerCase().includes(queryInput));

          const matchesLocation =
            selectedLocation === 'all' || item.location === selectedLocation;

          return matchesNameOrSku && matchesLocation;
        });

        if (matches.length > 0) {
          let htmlOutput = `<div style="margin-top: 16px;">`;
          matches.forEach((item) => {
            const isAvailable = item.inStock > 0;
            const statusColor = isAvailable ? '#059669' : '#e11d48';
            const badgeBg = isAvailable ? '#ecfdf5' : '#fef2f2';

            htmlOutput += `
              <div style="border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px 16px; margin-bottom: 10px; background-color: #ffffff;">
                <div style="display: flex; justify-content: space-between; align-items: start;">
                  <div>
                    <h4 style="margin: 0 0 4px 0; font-size: 1rem; color: #1e293b;">${item.name}</h4>
                    <p style="margin: 0; font-size: 0.85rem; color: #64748b;">SKU: <code>${item.sku}</code> | Location: ${item.location}</p>
                  </div>
                  <span style="background-color: ${badgeBg}; color: ${statusColor}; border: 1px solid ${statusColor}; font-weight: 600; font-size: 0.8rem; padding: 4px 8px; border-radius: 4px;">
                    ${item.status || (isAvailable ? 'In Stock' : 'Out of Stock')} (${item.inStock})
                  </span>
                </div>
              </div>
            `;
          });
          htmlOutput += `</div>`;
          resultDiv.innerHTML = htmlOutput;
        } else {
          resultDiv.innerHTML = `
            <div style="margin-top: 16px;">
              <p style="color: #64748b; font-style: italic; margin-bottom: 8px;">No products found matching "${queryInput}".</p>
              <button type="button" onclick="showSupportFallback('Stock inquiry for product: ${queryInput}')" class="btn btn-teal" style="font-size: 0.85rem; padding: 6px 12px;">
                Ask Support to Check Stock
              </button>
            </div>
          `;
        }
      } catch (err) {
        console.error(err);
        resultDiv.innerHTML = `<p style="color: #e11d48; margin-top: 12px;">Failed to load inventory data.</p>`;
      }
    });
  }
});
