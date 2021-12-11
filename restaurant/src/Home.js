// home tab
import styles from './Home.css';
import HeroImage from './../houdinis-hero.jpg';

const Home = () => {
  const container = document.createElement('div');
  container.classList.add('home-container', 'tab');
  container.setAttribute('id', 'Home');

  const hero = document.createElement('div');
  hero.classList.add('hero');

  const hero_text_top = document.createElement('h1');
  const hero_text_bottom = document.createElement('h1');
  hero_text_top.textContent = "Delicious dishes";
  hero_text_bottom.textContent = "with nothing to hide.";

  hero.appendChild(hero_text_top);
  hero.appendChild(hero_text_bottom);
  container.appendChild(hero);

  const hero_image = document.createElement('img');
  hero_image.src = HeroImage;
  hero_image.classList.add('hero-image');
  container.appendChild(hero_image);

  return container;
}

export { Home };