import './Tablist.css';

const TabList = () => {
  // tabs / navigation (maybe make nav element?)
  const tab_list = document.createElement('ul');
  tab_list.classList.add('tab-list');

  const tab_names = ['Home', 'Menu', 'Contact'];

  for (const tab_name of tab_names) {
    const tab = document.createElement('li');
    tab.classList.add('tab-item');
    tab.textContent = tab_name;

    tab_list.appendChild(tab);
  }

  return tab_list;
}

export { TabList };