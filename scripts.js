// SIDEBAR TOGGLE

var sidebarOpen = false;
var sidebar = document.getElementById('sidebar');

function openSidebar() {
  if (!sidebarOpen) {
    sidebar.classList.add('sidebar-responsive');
    sidebarOpen = true;
  }
}

function closeSidebar() {
  if (sidebarOpen) {
    // Ubah kondisi menjadi if (sidebarOpen)
    sidebar.classList.remove('sidebar-responsive');
    sidebarOpen = false;
  }
}

// DROPDOWN

function toggleDropdown(event) {
  document.getElementById('dropdownMenu').classList.toggle('show');
  event.stopPropagation(); // Prevent the click from closing the dropdown
}

function closeDropdown() {
  var dropdowns = document.getElementsByClassName('dropdown-content');
  for (var i = 0; i < dropdowns.length; i++) {
    var openDropdown = dropdowns[i];
    if (openDropdown.classList.contains('show')) {
      openDropdown.classList.remove('show');
    }
  }
}

// Close the dropdown if clicked outside
document.addEventListener('click', function (event) {
  var isClickInsideDropdown = document.getElementById('dropdownMenu').contains(event.target);
  if (!isClickInsideDropdown) {
    closeDropdown();
  }
});
