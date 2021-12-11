import './Menu.css';
import { getMenuListData } from './utils/menu-list.js';

const Menu = () => {
  const container = document.createElement('div');
  container.classList.add('menu-container', 'tab');
  container.setAttribute('id', "Menu");

  const menu_header = document.createElement('h2');
  menu_header.textContent = "Houdini's Menu";
  container.appendChild(menu_header);




  // next, let's create a div for each menu item (ul > li)?
  const menu_list = document.createElement('ul');

  const menu_list_items = getMenuListData();

  for (const menu_item of menu_list_items) {
    let list_item_element = document.createElement('li');
  
    let img = document.createElement('img');
    img.src = menu_item.image;
    list_item_element.appendChild(img);

    // contains the text for each menu item
    let info_div = document.createElement('div');
    info_div.classList.add('info-div');

    let name = document.createElement('h3');
    name.textContent = menu_item.name;
    info_div.appendChild(name);

    let description = document.createElement('p');
    description.textContent = menu_item.description;
    info_div.appendChild(description);

    let price = document.createElement('span');
    price.textContent = `Price: ${menu_item.price}~`;
    info_div.appendChild(price);

    list_item_element.appendChild(info_div);
    menu_list.appendChild(list_item_element);
  }

  container.appendChild(menu_list);




  return container;
}

export { Menu };