// SIDEBAR TOGGLE

var sidebarOpen = false;
var sidebar = document.getElementById("sidebar");

function openSidebar() {
  if (!sidebarOpen) {
    sidebar.classList.add("sidebar-responsive");
    sidebarOpen = true;
  }
}

function closeSidebar() {
  if (sidebarOpen) {
    // Ubah kondisi menjadi if (sidebarOpen)
    sidebar.classList.remove("sidebar-responsive");
    sidebarOpen = false;
  }
}

// DROPDOWN

function toggleDropdown(event) {
  document.getElementById("dropdownMenu").classList.toggle("show");
  event.stopPropagation(); // Prevent the click from closing the dropdown
}

function closeDropdown() {
  var dropdowns = document.getElementsByClassName("dropdown-content");
  for (var i = 0; i < dropdowns.length; i++) {
    var openDropdown = dropdowns[i];
    if (openDropdown.classList.contains("show")) {
      openDropdown.classList.remove("show");
    }
  }
}

// Close the dropdown if clicked outside
document.addEventListener("click", function (event) {
  var isClickInsideDropdown = document
    .getElementById("dropdownMenu")
    .contains(event.target);
  if (!isClickInsideDropdown) {
    closeDropdown();
  }
});

// Mengaktifkan menu search

document
  .getElementById("search-input")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      performSearch();
    }
  });

document.getElementById("search-icon").addEventListener("click", function () {
  performSearch();
});

function performSearch() {
  const query = document.getElementById("search-input").value.toLowerCase();
  const tableSection = document.getElementById("table-section");
  const table = document.getElementById("salesTable");
  const rows = table.getElementsByTagName("tr");
  let found = false;

  // Show table section if the search query includes 'table' or 'sales table'
  if (query.includes("table") || query.includes("sales table")) {
    tableSection.classList.remove("hidden");
    tableSection.scrollIntoView({ behavior: "smooth" });
    found = true;
  } else {
    tableSection.classList.add("hidden");
  }

  // Filter table rows based on search query
  for (let i = 1; i < rows.length; i++) {
    // Start from 1 to skip the header
    let cells = rows[i].getElementsByTagName("td");
    let rowContainsQuery = false;

    for (let j = 0; j < cells.length; j++) {
      let cellText = cells[j].textContent.toLowerCase();
      if (cellText.includes(query)) {
        rowContainsQuery = true;
      }
    }

    rows[i].style.display = rowContainsQuery ? "" : "none";
  }

  // Hide table section if no rows match the query
  if (!found) {
    let anyRowVisible = false;
    for (let i = 1; i < rows.length; i++) {
      if (rows[i].style.display !== "none") {
        anyRowVisible = true;
        break;
      }
    }
    if (!anyRowVisible) {
      tableSection.classList.add("hidden");
    }
  }
}

function prevButtonClick() {
  // Logika untuk tombol Previous
}

function nextButtonClick() {
  // Logika untuk tombol Next
}
