import RecipeComponent from '../components/Recipe';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

const fakeRecipe = {
  title: 'Delicious Food',
  ingredients: '3tsbp chocolate, 2/4cup water',
  instructions: 'Bacon is the water of all meat',
  image: 'food.jpg',
  largeImage: 'food-large.jpg',
};

describe('<Recipe/>', () => {
  it('renders and matches the snapshot', () => {
    const wrapper = shallow(<RecipeComponent recipe={fakeRecipe} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('renders the image properly', () => {
    const wrapper = shallow(<RecipeComponent recipe={fakeRecipe} />);
    const img = wrapper.find('img');
    expect(img.props().src).toBe(fakeRecipe.image);
    expect(img.props().alt).toBe(fakeRecipe.title);
  });

  it('renders the title and number of ingredients', () => {
    const wrapper = shallow(<RecipeComponent recipe={fakeRecipe} />);
    const list = wrapper.find('ul')
    expect(wrapper.find('Title a').text()).toBe(fakeRecipe.title);
    expect(list.children().length).toBe(2);
  });

  it('renders out the buttons properly', () => {
    const wrapper = shallow(<RecipeComponent recipe={fakeRecipe} />);
    const buttonList = wrapper.find('.buttonList');
    expect(buttonList.children()).toHaveLength(3);
    expect(buttonList.find('Link')).toHaveLength(2);
    expect(buttonList.find('DeleteRecipe').exists()).toBe(true);
  })
})

