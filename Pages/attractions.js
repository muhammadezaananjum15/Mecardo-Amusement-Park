const btns = document.querySelectorAll('.filter-btn');
const items = document.querySelectorAll('.filter-item');

btns.forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelector('.filter-btn.active').classList.remove('active');
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    items.forEach((item) => {
      item.style.display = filter === 'all' || item.classList.contains(filter) ? 'block' : 'none';
    });
  });
});
