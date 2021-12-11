// this file will supply data for the Menu page/tab to Menu.js
import FallingBerries from '../../falling-berries.jpg';
import FallingPasta from '../../falling-pasta.jpg';
import FallingBurger from '../../houdinis-hero.jpg';


// start with 3 dishes
// (name, description, price, image)
const getMenuListData = () => {
  return [
    {
      name: 'Sweet Berries',
      description: 'A mix of local berries topped with powdered sugar',
      price: '5',
      image: FallingBerries,
    },
    {
      name: 'Garden Pasta',
      description: 'Tender pasta tossed in freshly-harvested garden vegetables and herbs',
      price: '9',
      image: FallingPasta,
    },
    {
      name: 'The Houdini',
      description: 'A delicious burger that everyone will love',
      price: '10',
      image: FallingBurger,
    }
  ];
}

export { getMenuListData };