(() => {
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  const themeToggle = document.getElementById('themeToggle');
  const progressBar = document.getElementById('progressBar');
  const year = document.getElementById('year');
  const search = document.getElementById('publicationSearch');
  const publications = [...document.querySelectorAll('.publication')];
  const publicationCount = document.getElementById('publicationCount');
  const noResults = document.getElementById('noResults');

  year.textContent = new Date().getFullYear();

  menuToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open navigation');
    });
  });

  themeToggle.addEventListener('click', () => {
    const light = document.body.classList.toggle('light-theme');
    themeToggle.textContent = light ? '☾' : '☼';
    themeToggle.setAttribute('aria-label', light ? 'Switch to dark theme' : 'Switch to light theme');
  });

  const updateProgress = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    progressBar.style.width = `${progress}%`;
  };
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
  } else {
    document.querySelectorAll('.reveal').forEach(element => element.classList.add('visible'));
  }

  const filterPublications = () => {
    const query = search.value.trim().toLowerCase();
    let visible = 0;
    publications.forEach(item => {
      const match = item.textContent.toLowerCase().includes(query);
      item.hidden = !match;
      if (match) visible++;
    });
    publicationCount.textContent = `${visible} of ${publications.length} publications shown`;
    noResults.hidden = visible !== 0;
  };
  search.addEventListener('input', filterPublications);
})();
