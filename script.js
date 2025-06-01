document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const linkItems = document.querySelectorAll('.link-item');
    const categoryTitles = document.querySelectorAll('.category-title');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            let currentCategory = null;
            
            categoryTitles.forEach(title => {
                title.classList.add('hidden');
            });
            
            linkItems.forEach(item => {
                const text = item.querySelector('.link-text').textContent.toLowerCase();
                const shouldShow = text.includes(searchTerm);
                
                if (shouldShow) {
                    item.classList.remove('hidden');
                    currentCategory = findPreviousCategory(item);
                    if (currentCategory) currentCategory.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
            
            if (searchTerm === '') {
                linkItems.forEach(item => item.classList.remove('hidden'));
                categoryTitles.forEach(title => title.classList.remove('hidden'));
            }
        });
    }
    
    function findPreviousCategory(element) {
        let prev = element.previousElementSibling;
        while (prev) {
            if (prev.classList.contains('category-title')) {
                return prev;
            }
            prev = prev.previousElementSibling;
        }
        return null;
    }
    
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'k') {
            e.preventDefault();
            if (searchInput) {
                searchInput.focus();
            }
        }
    });
});