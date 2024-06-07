var jsonData; // Variable to store JSON data
    var batchSize = 10; // Number of data to load at once
    var currentIndex = 0; // Current index of data being displayed
    var filteredData = []; // Variable to store filtered data
    var storeLocations = []; // Variable to store unique store locations

    // Function to load JSON data
    function loadData() {
      var xhr = new XMLHttpRequest();
      xhr.overrideMimeType("application/json");
      xhr.open("GET", "coffeSales.json", true);
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          jsonData = JSON.parse(xhr.responseText);
          filteredData = jsonData;
          extractStoreLocations();
          displayData();
        }
      };
      xhr.send(null);
    }

    // Function to extract unique store locations
    function extractStoreLocations() {
      storeLocations = [...new Set(jsonData.map(item => item.store_location))];
      generateCheckboxes();
    }

    // Function to generate checkboxes for store locations
    function generateCheckboxes() {
      var container = document.getElementById('checkboxContainer');
      container.innerHTML = ''; // Clear previous checkboxes if any
      storeLocations.forEach(location => {
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = location;
        checkbox.id = location;
        checkbox.checked = true;
        checkbox.addEventListener('change', filterData);

        var label = document.createElement('label');
        label.htmlFor = location;
        label.innerText = location;
        label.className = 'mr-2';

        container.appendChild(checkbox);
        container.appendChild(label);
      });
    }

    // Function to display data
    function displayData() {
      var table = document.getElementById("tabelku").getElementsByTagName("tbody")[0];
      table.innerHTML = ''; // Clear previous data
      for (var i = currentIndex; i < Math.min(currentIndex + batchSize, filteredData.length); i++) {
        var row = `<tr>
                  <td>${filteredData[i].transaction_id}</td>
                  <td>${filteredData[i].transaction_date}</td>
                  <td>${filteredData[i].transaction_time}</td>
                  <td>${filteredData[i].transaction_qty}</td>
                  <td>${filteredData[i].store_id}</td>
                  <td>${filteredData[i].store_location}</td>
                  <td>${filteredData[i].product_id}</td>
                  <td>${filteredData[i].unit_price}</td>
                  <td>${filteredData[i].product_category}</td>
                  <td>${filteredData[i].product_type}</td>
                  <td>${filteredData[i].product_detail}</td>
                </tr>`;
        table.innerHTML += row;
      }
      document.getElementById("prevBtn").disabled = currentIndex === 0;
      document.getElementById("nextBtn").disabled = currentIndex + batchSize >= filteredData.length;
    }
    
    // Function to filter data based on selected checkboxes, search input, and dropdown filter
    function filterData() {
      var checkedLocations = Array.from(document.querySelectorAll('#checkboxContainer input:checked')).map(checkbox => checkbox.value);
      var searchQuery = document.getElementById('searchInput').value.toLowerCase();
      var priceFilter = document.getElementById('priceFilter').value;
      
      filteredData = jsonData.filter(item => 
        checkedLocations.includes(item.store_location) &&
        (!priceFilter || item.unit_price == priceFilter) &&
        Object.values(item).some(value => value.toString().toLowerCase().includes(searchQuery))
      );
      if (filteredData.length === 0) {
        alert('Maaf data yang kamu cari ga ada :(');
      }
      currentIndex = 0;
      displayData();
    }

    // Event listener for search button
    document.getElementById('searchBtn').addEventListener('click', filterData);
    document.getElementById('priceFilter').addEventListener('change', filterData);

    // Event listener for Next button
    document.getElementById("nextBtn").addEventListener("click", function () {
      currentIndex += batchSize;
      displayData();
    });

    // Event listener for Previous button
    document.getElementById("prevBtn").addEventListener("click", function () {
      currentIndex -= batchSize;
      displayData();
    });

    // Call load data function when the page loads
    window.onload = function () {
      loadData();
    };