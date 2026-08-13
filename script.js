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
