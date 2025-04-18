console.log('IT’S ALIVE!');

function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}
// const navLinks = $$("nav a");
// let currentLink = navLinks.find(
//     (a) => a.host === location.host && a.pathname === location.pathname,
//   );
// currentLink?.classList.add("current");
let pages = [
    { url: '', title: 'Home' },
    { url: 'projects/', title: 'Projects' },
    {url: 'contact/', title:'Contact'},
    {url: 'resume/', title: 'Resume'},
    { url: 'https://github.com/SriSupratikTalari', title: 'GitHub', external: true}
  ];
let nav = document.createElement('nav');
document.body.prepend(nav);
for (let p of pages) {
    let url = p.url;
    let title = p.title;
    let a = document.createElement('a');
    a.href = url;
    a.textContent = title;
    nav.append(a);

  }
const BASE_PATH = (location.hostname === "localhost" || location.hostname === "127.0.0.1")
? "/"                  // Local server
: "/portfolio/";         // GitHub Pages repo name
url = !url.startsWith('http') ? BASE_PATH + url : url;
if (a.host === location.host && a.pathname === location.pathname) {
    a.classList.add('current');
  }
  document.body.insertAdjacentHTML(
    'afterbegin',
    `
    <label class="color-scheme">
      Theme:
      <select id="theme-switcher">
        <option value="light dark">Automatic</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </label>
  `
  );
const select = document.querySelector(selector);
select.addEventListener('input', function (event) {
    console.log('color scheme changed to', event.target.value);
  });
document.documentElement.style.setProperty('color-scheme', event.target.value);