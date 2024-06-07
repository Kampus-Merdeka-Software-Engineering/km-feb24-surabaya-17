fetch('coffeSales.json')
  .then(response => response.json())
  .then(salesData => {
    var salesperStore = {};

    salesData.forEach(function(item) {
        if (!salesperStore[item.store_location]) {
            salesperStore[item.store_location] = 0;
        }
        salesperStore[item.store_location] += parseInt(item.transaction_qty);
    });

    var labels = Object.keys(salesperStore);
    var data = Object.values(salesperStore);

    var ctx = document.getElementById('salesPieChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                label: 'Location',
                data: data,
                backgroundColor: [
                  "rgba(102, 60, 11, 0.9)", // Dark brown
                  "rgba(139, 90, 43, 0.8)", // Brown with green tint
                  "rgba(85, 107, 47, 0.8)", // Green with brown tint
                  "rgba(139, 69, 19, 1)", // Medium brown
                  "rgba(112, 82, 56, 0.8)", // Darker brown with green tint
              
                ],
                borderColor: [
                  "rgba(102, 60, 11, 0.8)", // Dark brown
                  "rgba(139, 90, 43, 0.8)", // Brown with green tint
                  "rgba(85, 107, 47, 0.8)", // Green with brown tint
                  "rgba(139, 69, 19, 0.8)", // Medium brown
                  "rgba(112, 82, 56, 0.8)", // Darker brown with green tint
                ],
                  borderWidth: 1,
                  fill: true,
                  tension: 0.4,
            }]
        },
        options: {
            responsive: true
        }
    });
  })
  .catch(error => console.error('Error fetching data:', error));