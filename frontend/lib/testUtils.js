import casual from 'casual';

casual.seed(777);

const fakeRecipe = () => ({
  __typename: "Recipe",
  id: "abc123",
  title: "Dessert Recipe",
  ingredients: "1/3tsbp ice cream, 1cup lollipop",
  instructions: "the quick brown fox jumps over the lazy dog.",
  image: "recipe.jpg",
  largeImage: "recipe-large.jpg",
  user: null,
  updatedAt: casual.date((format = "YYYY-MM-DD")),
  createdAt: casual.date((format = "YYYY-MM-DD"))
});

const fakeUser = () => ({ 
  __typename: "User",
  id: "1234",
  name: casual.name,
  email: casual.email,
  permissions: ["ADMIN"],
  updatedAt: casual.date((format = "YYYY-MM-DD")),
  createdAt: casual.date((format = "YYYY-MM-DD"))
});

// Fake LocalStorage
class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = value.toString();
  }

  removeItem(key) {
    delete this.store[key];
  }
}

export default {
  fakeRecipe,
  fakeUser,
  LocalStorageMock
};