document.addEventListener('DOMContentLoaded', function () {
  fetch('coffeSales.json')
    .then(response => response.json())
    .then(data => { 
      const totalSales = data.reduce((acc, item) => {
        if (!acc[item.product_category]) {
          acc[item.product_category] = 0;
        }
        acc[item.product_category] += parseInt(item.transaction_qty);
        return acc;
      }, {});

      const productCategory = Object.keys(totalSales);
      const transaction = Object.values(totalSales);

      // Sort transaction in descending order for highest to lowest sales
      const sortedTransaction = transaction.sort((a, b) => b - a);

      const ctx = document.getElementById('salesBarChart').getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: { 
          labels: productCategory,
          datasets: [{
            label: 'Total Sales',
            data:sortedTransaction,
            backgroundColor: [
              "rgba(102, 60, 11, 1)", // Dark brown
              "rgba(139, 90, 43, 0.8)", // Brown with green tint
              "rgba(85, 107, 47, 0.8)", // Green with brown tint
              "rgba(139, 69, 19, 1)", // Medium brown
              "rgba(112, 82, 56, 0.8)", // Darker brown with green tint
          
            ],
            borderColor: [
              "rgba(102, 60, 11, 1)", // Dark brown
              "rgba(139, 90, 43, 0.8)", // Brown with green tint
              "rgba(85, 107, 47, 0.8)", // Green with brown tint
              "rgba(139, 69, 19, 1)", // Medium brown
              "rgba(112, 82, 56, 0.8)", // Darker brown with green tint
            ],
            borderWidth: 1,
            fill: true,
            tension: 0.4,
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    });
});
