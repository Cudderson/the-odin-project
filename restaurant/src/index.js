import { init } from './init.js';
import { Home } from './home.js';
import { Menu } from './Menu.js';
import { Contact } from './Contact.js';


const main = () => {
  // initial page styles and container div
  const container = init();

  // next, let's load the home page we had before
  const HomeTab = Home();
  container.appendChild(HomeTab);
  const MenuTab = Menu();
  container.appendChild(MenuTab);
  const ContactTab = Contact();
  container.appendChild(ContactTab);

  for (const tab of tab_links) {
    console.log(tab.textContent);
    tab.addEventListener('click', ((e) => {
      openTab(e, tab);
    }));
  }
}

const openTab = (e, tabToOpen) => {
  console.log(e, tabToOpen.textContent)
  // hide all tab pages
  for (const page of tab_pages) {
    page.style.display = 'none';
  }
  // make tab links inactive
  for (const tab of tab_links) {
    tab.className = tab.className.replace('active', '');
  }
  // add display: flex and add 'active' to tab
  document.getElementById(tabToOpen.textContent).style.display = 'flex';
  tabToOpen.classList.add('active');
}

const tab_pages = document.getElementsByClassName('tab');
const tab_links = document.getElementsByClassName('tab-item');
main();