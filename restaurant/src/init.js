// get image
import styles from './init.css';
import { TabList } from './TabList';

const init = () => {
  // get container div
  const content = document.getElementById('content');

  // header
  const header = document.createElement('header');
  header.classList.add('header');

  // add brand name / logo to header
  // no logo yet
  const brand = document.createElement('div');
  const brand_text = document.createElement('span');
  brand_text.textContent = "Houdini's";
  brand.classList.add('brand')
  brand.appendChild(brand_text);
  header.appendChild(brand);

  // get TabList
  const tab_list = TabList();

  header.appendChild(tab_list);  
  content.appendChild(header);

  return content;
};

export { init };