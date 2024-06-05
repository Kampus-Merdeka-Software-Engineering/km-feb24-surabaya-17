// Fungsi untuk memuat data dari file JSON
async function loadSalesData() {
  const response = await fetch("coffeSales.json");
  const data = await response.json();
  return data;
}

// Variabel untuk melacak indeks awal dan akhir data yang ditampilkan
let startIndex = 0;
const itemsPerPage = 10;

// Fungsi untuk mengisi tabel dengan data penjualan sesuai dengan rentang indeks
async function fillSalesTable() {
  const rawData = await loadSalesData();

  const tableBody = document.querySelector("#salesTable tbody");
  tableBody.innerHTML = "";

  // Mengambil data untuk halaman saat ini berdasarkan rentang indeks
  const currentPageData = rawData.slice(startIndex, startIndex + itemsPerPage);

  currentPageData.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${item.transaction_id}</td>
            <td>${item.transaction_date}</td>
            <td>${item.transaction_time}</td>
            <td>${item.transaction_qty}</td>
            <td>${item.store_id}</td>
            <td>${item.store_location}</td>
            <td>${item.product_id}</td>
            <td>${item.unit_price}</td>
            <td>${item.product_category}</td>
            <td>${item.product_type}</td>
            <td>${item.product_detail}</td>
        `;
    tableBody.appendChild(row);
  });

  // Menampilkan atau menyembunyikan tombol panah berikutnya sesuai dengan kondisi
  const nextButton = document.getElementById("nextButton");
  if (startIndex + itemsPerPage >= rawData.length) {
    nextButton.style.display = "none";
  } else {
    nextButton.style.display = "block";
  }

  // Menampilkan atau menyembunyikan tombol panah sebelumnya sesuai dengan kondisi
  const prevButton = document.getElementById("prevButton");
  if (startIndex === 0) {
    prevButton.style.display = "none";
  } else {
    prevButton.style.display = "block";
  }
}

// Fungsi untuk menangani klik tombol panah berikutnya
function nextButtonClick() {
  startIndex += itemsPerPage;
  fillSalesTable();
}

// Fungsi untuk menangani klik tombol panah sebelumnya
function prevButtonClick() {
  startIndex -= itemsPerPage;
  fillSalesTable();
}

// Panggil fungsi untuk mengisi tabel saat halaman dimuat
document.addEventListener("DOMContentLoaded", () => {
  initChart();
  fillSalesTable();
});

// Fungsi untuk mengolah data penjualan per kategori produk
async function processCategorySalesData() {
  const rawData = await loadSalesData();
  const salesData = {};

  rawData.forEach((item) => {
    const category = item.product_category;
    const quantity = parseInt(item.transaction_qty);
    const unitPrice = parseFloat(item.unit_price.replace("$", ""));
    const totalSales = quantity * unitPrice;

    if (salesData[category]) {
      salesData[category] += totalSales;
    } else {
      salesData[category] = totalSales;
    }
  });

  const labels = Object.keys(salesData).sort(); // Mengurutkan berdasarkan kategori
  const data = labels.map((label) => salesData[label]);

  return { labels, data };
}

// Fungsi untuk menginisialisasi chart dengan data dari JSON
async function initChart() {
  const chartData = await processCategorySalesData();

  const salesData = {
    labels: chartData.labels,
    datasets: [
      {
        label: "Sales by Product Category",
        data: chartData.data,
        backgroundColor: [
          "rgba(54, 162, 235, 0.2)", // biru muda
          "rgba(255, 99, 132, 0.2)", // merah muda
          "rgba(255, 206, 86, 0.2)", // kuning
          "rgba(75, 192, 192, 0.2)", // hijau muda
          "rgba(153, 102, 255, 0.2)", // ungu
          "rgba(255, 159, 64, 0.2)", // oranye
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)", // biru
          "rgba(255, 99, 132, 1)", // merah
          "rgba(255, 206, 86, 1)", // kuning
          "rgba(75, 192, 192, 1)", // hijau
          "rgba(153, 102, 255, 1)", // ungu
          "rgba(255, 159, 64, 1)", // oranye
        ],
        borderWidth: 1,
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const config = {
    type: "line",
    data: salesData,
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  };

  const salesChart = new Chart(document.getElementById("salesChart"), config);

  const configBarChart = {
    type: "bar",
    data: salesData,
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  };

  const salesBarChart = new Chart(
    document.getElementById("salesBarChart"),
    configBarChart
  );

  const configPieChart = {
    type: "doughnut",
    data: salesData,
  };

  const salesPieChart = new Chart(
    document.getElementById("salesPieChart"),
    configPieChart
  );

  const configLineChart2 = {
    type: "line",
    data: salesData,
  };

  const salesLineChart2 = new Chart(
    document.getElementById("salesLineChart2"),
    configLineChart2
  );
}

// Panggil fungsi untuk menginisialisasi chart saat halaman dimuat
document.addEventListener("DOMContentLoaded", initChart);

// Fungsi untuk suggestion box
function output() {
  const nama = document.getElementById("nama").value;
  const alamat = document.getElementById("address").value;
  const email = document.getElementById("email").value;
  const komentar = document.getElementById("message").value;
  if (nama != "" && alamat != "" && email != "" && komentar != "") {
    alert("Form telah disimpan!");
    return true;
  } else {
    alert("Form belum lengkap!");
  }
}
