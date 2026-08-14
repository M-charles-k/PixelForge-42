document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. TOOL 01: ORDER STATUS LOOKUP HANDLER
  // ==========================================
  const orderForm = document.getElementById('order-form');
  if (orderForm) {
    orderForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const orderInput = document.getElementById('order-number')?.value.trim();
      const emailInput = document.getElementById('order-email')?.value.trim();
      let resultDiv = document.getElementById('order-result');

      if (!resultDiv) {
        resultDiv = document.createElement('div');
        resultDiv.id = 'order-result';
        orderForm.appendChild(resultDiv);
      }

      if (!orderInput || !emailInput) {
        resultDiv.innerHTML = `<p style="color: #e11d48; margin-top: 16px; font-size: 14.5px;">Please enter both order number and email address.</p>`;
        return;
      }

      try {
        const response = await fetch('orders.json');
        if (!response.ok) throw new Error('Failed to fetch orders dataset');
        const orders = await response.json();

        // Standardize input matching for NSR- format or ORD- format
        const cleanQuery = orderInput.replace(/^NSR-?/i, 'ORD-').toLowerCase();

        const matchedOrder = orders.find(
          (item) => item.OrderId && (
            item.OrderId.toLowerCase() === orderInput.toLowerCase() ||
            item.OrderId.toLowerCase() === cleanQuery
          )
        );

        if (matchedOrder) {
          resultDiv.innerHTML = `
            <div style="border: 1px solid #10b981; background-color: #ecfdf5; border-radius: 4px; padding: 16px; margin-top: 20px;">
              <h4 style="margin: 0 0 6px 0; color: #065f46; font-size: 16px;">Order Found: ${orderInput.toUpperCase()}</h4>
              <p style="margin: 0 0 8px 0; color: #047857; font-size: 14.5px;">Status: <strong>${matchedOrder.Status}</strong></p>
              <a href="${matchedOrder.Tracking_link}" target="_blank" style="color: #059669; font-weight: 600; text-decoration: underline; font-size: 14px;">
                Track Package →
              </a>
            </div>
          `;
        } else {
          resultDiv.innerHTML = `
            <div style="margin-top: 20px; border: 1px solid #fca5a5; background-color: #fef2f2; border-radius: 4px; padding: 16px;">
              <p style="color: #991b1b; margin: 0 0 8px 0; font-size: 14.5px;">Order "<strong>${orderInput}</strong>" not found for ${emailInput}.</p>
              <a href="#support-fallback-form" class="btn btn-teal" style="font-size: 13.5px; padding: 8px 14px; display: inline-block;">
                Submit Support Ticket
              </a>
            </div>
          `;
        }
      } catch (err) {
        console.error(err);
        resultDiv.innerHTML = `<p style="color: #e11d48; margin-top: 16px; font-size: 14.5px;">Error loading orders data. Ensure <code>orders.json</code> is present.</p>`;
      }
    });
  }

  // ==========================================
  // 2. TOOL 02: PRODUCT AVAILABILITY HANDLER
  // ==========================================
  const stockForm = document.getElementById('stock-form');
  if (stockForm) {
    stockForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const queryInput = document.getElementById('stock-query')?.value.trim().toLowerCase() || '';
      const selectedLocation = document.getElementById('stock-location')?.value || 'all';

      let resultDiv = document.getElementById('stock-result');
      if (!resultDiv) {
        resultDiv = document.createElement('div');
        resultDiv.id = 'stock-result';
        stockForm.appendChild(resultDiv);
      }

      if (!queryInput) {
        resultDiv.innerHTML = `<p style="color: #e11d48; margin-top: 16px; font-size: 14.5px;">Please enter a product name or SKU.</p>`;
        return;
      }

      try {
        const response = await fetch('inventory.json');
        if (!response.ok) throw new Error('Failed to fetch inventory dataset');
        const inventory = await response.json();

        const matches = inventory.filter((item) => {
          const matchesNameOrId =
            (item.name && item.name.toLowerCase().includes(queryInput)) ||
            (item.id && item.id.toLowerCase().includes(queryInput));

          const matchesLocation =
            selectedLocation === 'all' || (item.location && item.location.toLowerCase() === selectedLocation);

          return matchesNameOrId && matchesLocation;
        });

        if (matches.length > 0) {
          let htmlOutput = `<div style="margin-top: 20px;">`;
          matches.forEach((item) => {
            const isAvailable = item.stock_count > 0;
            const statusColor = isAvailable ? '#059669' : '#e11d48';
            const badgeBg = isAvailable ? '#ecfdf5' : '#fef2f2';

            htmlOutput += `
              <div style="border: 1px solid var(--line); border-radius: 4px; padding: 14px 18px; margin-bottom: 12px; background-color: #ffffff;">
                <div style="display: flex; justify-content: space-between; align-items: start;">
                  <div>
                    <h4 style="margin: 0 0 4px 0; font-size: 16px; color: var(--ink);">${item.name}</h4>
                    <p style="margin: 0; font-size: 13.5px; color: var(--muted);">
                      SKU: <code style="font-family: var(--font-mono);">${item.id}</code> | Size: ${item.size}
                    </p>
                  </div>
                  <span style="background-color: ${badgeBg}; color: ${statusColor}; border: 1px solid ${statusColor}; font-weight: 600; font-size: 12.5px; padding: 4px 8px; border-radius: 2px;">
                    ${isAvailable ? 'In Stock' : 'Out of Stock'} (${item.stock_count})
                  </span>
                </div>
              </div>
            `;
          });
          htmlOutput += `</div>`;
          resultDiv.innerHTML = htmlOutput;
        } else {
          resultDiv.innerHTML = `
            <div style="margin-top: 20px;">
              <p style="color: var(--muted); font-style: italic; margin-bottom: 10px; font-size: 14.5px;">No products found matching "${queryInput}".</p>
              <a href="#support-fallback-form" class="btn btn-teal" style="font-size: 13.5px; padding: 8px 14px; display: inline-block;">
                Ask Support to Check Stock
              </a>
            </div>
          `;
        }
      } catch (err) {
        console.error(err);
        resultDiv.innerHTML = `<p style="color: #e11d48; margin-top: 16px; font-size: 14.5px;">Failed to load inventory dataset. Ensure <code>inventory.json</code> is present.</p>`;
      }
    });
  }

  // ==========================================
  // 3. TOOL 03: RETURNS & REFUND FORM HANDLER
  // ==========================================
  const fallbackForm = document.getElementById('support-fallback-form');
  const fallbackConfirmation = document.getElementById('fallback-confirmation');

  if (fallbackForm) {
    fallbackForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const ticketId = 'NSR-RET-' + Math.floor(100000 + Math.random() * 900000);
      const userEmail = document.getElementById('fallback-email')?.value || 'Customer';
      const orderNum = document.getElementById('fallback-order')?.value || 'N/A';

      fallbackForm.reset();

      if (fallbackConfirmation) {
        fallbackConfirmation.style.display = 'block';
        fallbackConfirmation.innerHTML = `
          <div style="background-color: #ecfdf5; border: 1px solid #10b981; color: #065f46; padding: 20px; border-radius: 4px; margin-top: 24px;">
            <h4 style="margin: 0 0 6px 0; font-weight: 700; font-size: 17px;">Return Request Submitted!</h4>
            <p style="margin: 0; font-size: 14.5px; line-height: 1.6;">
              Thank you! We received the request for Order <strong>${orderNum}</strong> (${userEmail}). 
              Reference ID: <strong>${ticketId}</strong>. A support manager will inspect and update you within 24 hours.
            </p>
          </div>
        `;
      }
    });
  }

});
