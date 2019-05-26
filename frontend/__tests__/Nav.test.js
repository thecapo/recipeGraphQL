import { mount } from 'enzyme';
import wait from 'waait';
import toJSON from 'enzyme-to-json';
import { MockedProvider } from 'react-apollo/test-utils';
// import { fakeUser } from "../lib/testUtils";
import Nav from '../components/Nav';
import { CURRENT_USER_QUERY } from '../components/User'; 

const fakeUser = () => ({
  __typename: 'User',
  id: "1234",
  name: 'John Wick',
  email: 'email@email.com',
  permissions: ["ADMIN"]
});

const notSignedInMocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { me: null } }
  }
];

const signedInMocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { me: fakeUser() } }
  }
];

// added the data-test="nav" in the nav.js
describe('<Nav/>', () => {
  it('renders a minimal nav when signed out', async () => {
    const wrapper = mount(
      <MockedProvider mocks={notSignedInMocks}>
        <Nav/>
      </MockedProvider>
    )
    await wait();
    wrapper.update();
    const nav = wrapper.find('ul');
    expect(toJSON(nav)).toMatchSnapshot();
  });

  it('renders full nav when signed in', async () => {
    const wrapper = mount(
      <MockedProvider mocks={signedInMocks}>
        <Nav />
      </MockedProvider>
    )
    await wait();
    wrapper.update();
    const nav = wrapper.find('ul');
    const span = wrapper.find('span')
    expect(nav.children().length).toBe(4);
    expect(nav.text()).toContain("Sign Out");
    expect(span.text()).toContain(`hello, ` + fakeUser().name);
  });
})