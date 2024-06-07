async function fetchData() {
  try {
    const response = await fetch('coffeSales.json');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error: ', error);
  }
}

function processData(data) {
  const salesByCategory = {};

  data.forEach(item => {
    const saleDate = new Date(item.transaction_date).toLocaleDateString();
    const productCategory = item.product_category;
    const transactionQty = parseInt(item.transaction_qty);

    // Group data by saleDate and productCategory
    if (!salesByCategory[saleDate]) {
      salesByCategory[saleDate] = {};
    }
    if (!salesByCategory[saleDate][productCategory]) {
      salesByCategory[saleDate][productCategory] = 0;
    }

    salesByCategory[saleDate][productCategory] += transactionQty;
  });

  // Prepare labels (unique sale dates) and datasets (objects for each category)
  const labels = Object.keys(salesByCategory);
  const datasets = [];
  for (const category in salesByCategory[labels[0]]) {  // Use first date to get categories
    datasets.push({
      label: category,
      data: labels.map(date => salesByCategory[date][category] || 0),  // Handle missing data
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
      borderWidth: 1
    });
  }

  return { labels, datasets };
}

async function renderChart() {
  const data = await fetchData();
  if (!data) {
    console.error('No data found');
    return;
  }
  const { labels, datasets } = processData(data);

  const ctx = document.getElementById('salesLineChart2').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: datasets
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      },
      elements: {
        line: {
          borderWidth: 1,
          hidden: false // Ensure all lines are displayed
        }
      }
    }
  });
}

renderChart();
