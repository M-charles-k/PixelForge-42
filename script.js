// Task 6: Build Order Lookup Handler

document.addEventListener('DOMContentLoaded', () => {
    const orderForm = document.getElementById('order-form');
    
    if (orderForm) {
        orderForm.addEventListener('submit', async (e) => {
            // Prevent default form submit page reload
            e.preventDefault();

            const orderInput = document.getElementById('order-number').value.trim();
            const resultDiv = document.getElementById('orderResult');

            if (!orderInput) {
                resultDiv.innerHTML = "<p style='color: #e11d48; margin-top: 12px;'>Please enter an order number.</p>";
                return;
            }

            try {
                // Fetch order data from JSON database
                const response = await fetch('orders.json');
                const orders = await response.json();

                // Find matching order ID
                const foundOrder = orders.find(o => o.OrderId.toLowerCase() === orderInput.toLowerCase());

                if (foundOrder) {
                    resultDiv.innerHTML = `
                        <div style="border: 1px solid #e2e8f0; padding: 16px; margin-top: 16px; border-radius: 8px; background-color: #f8fafc;">
                            <h4 style="margin: 0 0 8px 0;">Order #${foundOrder.OrderId}</h4>
                            <p style="margin: 4px 0;"><strong>Status:</strong> ${foundOrder.Status}</p>
                            <p style="margin: 4px 0;"><a href="${foundOrder.Tracking_link}" target="_blank" style="color: #1e9488;">Track Shipment &rarr;</a></p>
                        </div>`;
                } else {
                    resultDiv.innerHTML = `<p style="color: #e11d48; margin-top: 12px;">No order found matching "${orderInput}". Try ORD-6001.</p>`;
                }
            } catch (error) {
                console.error("Error fetching order status:", error);
                resultDiv.innerHTML = "<p style='color: #e11d48; margin-top: 12px;'>Error loading order data.</p>";
            }
        });
    }
});