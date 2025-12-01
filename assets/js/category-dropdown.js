// Dropdown Category Selector for Menu Page
document.addEventListener('DOMContentLoaded', () => {
    const categoryFilter = document.querySelector('.category-filter');

    if (!categoryFilter) return;

    // Create dropdown wrapper
    const dropdownWrapper = document.createElement('div');
    dropdownWrapper.className = 'category-dropdown-wrapper';

    // Create label
    const label = document.createElement('label');
    label.setAttribute('for', 'category-selector');
    label.className = 'dropdown-label';
    label.textContent = 'Select Category:';

    // Create select element
    const select = document.createElement('select');
    select.id = 'category-selector';
    select.className = 'category-dropdown';

    // Get all filter buttons and convert to options
    const filterButtons = categoryFilter.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        const option = document.createElement('option');
        const filterValue = button.getAttribute('data-filter');
        const filterText = button.querySelector('span').textContent;

        option.value = filterValue;
        option.textContent = filterText;

        if (button.classList.contains('active')) {
            option.selected = true;
        }

        select.appendChild(option);
    });

    // Assemble dropdown
    dropdownWrapper.appendChild(label);
    dropdownWrapper.appendChild(select);

    // Replace category filter with dropdown
    categoryFilter.parentNode.replaceChild(dropdownWrapper, categoryFilter);

    // Handle dropdown change
    select.addEventListener('change', (e) => {
        const selectedValue = e.target.value;
        filterMenuCategories(selectedValue);
    });

    // Filter menu categories function
    function filterMenuCategories(filter) {
        const menuCategories = document.querySelectorAll('.menu-category');

        menuCategories.forEach(category => {
            const categoryType = category.getAttribute('data-category');

            if (filter === 'all') {
                category.classList.remove('hidden');
            } else if (categoryType === filter) {
                category.classList.remove('hidden');
                // Scroll to the selected category
                setTimeout(() => {
                    category.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            } else {
                category.classList.add('hidden');
            }
        });
    }
});
