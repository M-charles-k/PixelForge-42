// TOOL 02: Stock Search Handler (Task 7)
document.addEventListener('DOMContentLoaded', () => {
    const stockForm = document.getElementById('stock-form');

    if (stockForm) {
        stockForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const queryInput = document.getElementById('product-query').value.trim().toLowerCase();
            const selectedLocation = document.getElementById('store-location')?.value || 'all';
            const resultDiv = document.getElementById('stockResult');

            if (!queryInput) {
                resultDiv.innerHTML = `<p style="color: #e11d48; margin-top: 12px;">Please enter a product name or SKU to search.</p>`;
                return;
            }

            try {
                // Fetch inventory data from JSON
                const response = await fetch('inventory.json');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const inventory = await response.json();

                // Query inventory by product name or SKU (and location filter)
                const matches = inventory.filter(item => {
                    const matchesNameOrSku = item.name.toLowerCase().includes(queryInput) || 
                                             item.sku.toLowerCase().includes(queryInput);
                    const matchesLocation = selectedLocation === 'all' || item.location === selectedLocation;

                    return matchesNameOrSku && matchesLocation;
                });

                // Display live availability results
                if (matches.length > 0) {
                    let htmlOutput = `<div style="margin-top: 16px;">`;
                    
                    matches.forEach(item => {
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
                                        ${item.status} (${item.inStock})
                                    </span>
                                </div>
                            </div>
                        `;
                    });

                    htmlOutput += `</div>`;
                    resultDiv.innerHTML = htmlOutput;
                } else {
                    resultDiv.innerHTML = `<p style="color: #64748b; margin-top: 12px; font-style: italic;">No products found matching "${queryInput}".</p>`;
                }

            } catch (error) {
                console.error("Error searching inventory:", error);
                resultDiv.innerHTML = `<p style="color: #e11d48; margin-top: 12px;">Failed to load inventory data. Make sure <code>inventory.json</code> exists.</p>`;
            }
        });
    }
});   

// TASK 8: Support Fallback Form Implementation
document.addEventListener('DOMContentLoaded', () => {
    const fallbackSection = document.getElementById('support-fallback-section');
    const fallbackForm = document.getElementById('support-fallback-form');
    const fallbackConfirmation = document.getElementById('fallback-confirmation');

    // Function to show inline fallback form
    window.showSupportFallback = (reason = '') => {
        if (!fallbackSection) return;
        fallbackSection.style.display = 'block';
        if (reason) {
            const reasonInput = document.getElementById('fallback-reason');
            if (reasonInput) reasonInput.value = reason;
        }
        fallbackSection.scrollIntoView({ behavior: 'smooth' });
    };

    // Handle Help Link clicks
    document.querySelectorAll('.need-help-btn, .contact-support-link').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            showSupportFallback("Customer requested direct support assistance.");
        });
    });

    // Handle Fallback Form Submission
    if (fallbackForm) {
        fallbackForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const ticketId = 'NSR-TKT-' + Math.floor(100000 + Math.random() * 900000);
            const userEmail = document.getElementById('fallback-email')?.value || 'Customer';

            fallbackForm.reset();
            fallbackForm.style.display = 'none';

            if (fallbackConfirmation) {
                fallbackConfirmation.style.display = 'block';
                fallbackConfirmation.innerHTML = `
                    <div style="background-color: #ecfdf5; border: 1px solid #10b981; color: #065f46; padding: 16px; border-radius: 8px; margin-top: 12px;">
                        <h4 style="margin: 0 0 4px 0; font-weight: bold;">Ticket Submitted Successfully!</h4>
                        <p style="margin: 0; font-size: 0.9rem;">Thank you, <strong>${userEmail}</strong>. Reference ID: <strong>${ticketId}</strong>. Our team will get back to you within 24 hours.</p>
                    </div>
                `;
            }
        });
    }
});
