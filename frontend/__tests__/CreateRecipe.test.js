import { mount } from "enzyme";
import wait from "waait";
import toJSON from "enzyme-to-json";
import Router from "next/router";
import { MockedProvider } from "react-apollo/test-utils";
import CreateRecipe, { CREATE_RECIPE_MUTATION } from "../components/CreateRecipe";
import { fakeRecipe } from '../lib/testUtils';

const recipeImage = "https://recipe.com/recipe.jpg";

global.fetch = jest.fn().mockResolvedValue({
  json: () => ({
    secure_url: recipeImage,
    eager: [{ secure_url: recipeImage }]
  })
});

describe("<CreateRecipe/>", () => {
  it('renders and matches snapshot', async () => {
    const wrapper = mount(
      <MockedProvider>
        <CreateRecipe />
      </MockedProvider>
    )
    const form = wrapper.find('form[data-test="form"]')
    expect(toJSON(form)).toMatchSnapshot();
  });

  it('uploads a file when changed', async () => {
    const wrapper = mount(
      <MockedProvider>
        <CreateRecipe />
      </MockedProvider>
    )
    const input = wrapper.find('input[type="file"]')
    input.simulate('change', { target: { files: ['fakeRecipe.jpg'] } })
    await wait();
    const component = wrapper.find('CreateRecipe').instance()
    expect(component.state.image)
  });
});
