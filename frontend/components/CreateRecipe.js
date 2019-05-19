import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Router from "next/router";
import Form from "./styles/Form";
import Error from "./ErrorMessage";
import { ALL_RECIPES_QUERY } from "./Recipes";

const CREATE_RECIPE_MUTATION = gql`
  mutation CREATE_RECIPE_MUTATION(
    $title: String!
    $ingredients: String!
    $instructions: String!
    $image: String
    $largeImage: String
  ) {
    createRecipe(
      title: $title
      ingredients: $ingredients
      instructions: $instructions
      image: $image
      largeImage: $largeImage
    ) {
      id
      title
    }
  }
`;

class CreateRecipe extends Component {
  state = {
    title: "",
    instructions: "",
    ingredients: "",
    image: "",
    largeImage: ""
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  uploadFile = async e => {
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'recipeapp');
    const res = await fetch("https://api.cloudinary.com/v1_1/cawo/image/upload", {
      method: 'POST',
      body: data,
    });
    const file = await res.json();
    console.log(file)
    this.setState({
      image: file.secure_url,
      largeImage: file.eager[0].secure_url
    })
  }

  render() {
    return (
      <Mutation
        mutation={CREATE_RECIPE_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: ALL_RECIPES_QUERY }]}
      >
        {(createRecipe, { loading, error }) => (
          <Form
            data-test="form"
            onSubmit={async e => {
              e.preventDefault();
              const res = await createRecipe();
              Router.push({
                pathname: "/recipe",
                query: { id: res.data.createRecipe.id }
              });
            }}
          >
            <Error error={error} />
            <fieldset disabled={loading} aria-busy={loading}>
              <label htmlFor="file">
                Image
                <input
                  type="file"
                  id="file"
                  name="file"
                  placeholder="Upload an image"
                  // required
                  onChange={this.uploadFile}
                />
                {this.state.image && (
                  <img src={this.state.image} alt="Upload Preview" />
                )}
              </label>

              <label htmlFor="title">
                Title
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Title"
                  required
                  defaultValue={this.state.title}
                  onChange={this.handleChange}
                />
              </label>

              <label htmlFor="ingredients">
                Ingredients
                <input
                  type="text"
                  id="ingredients"
                  name="ingredients"
                  placeholder="Ingredients..."
                  required
                  defaultValue={this.state.ingredients}
                  onChange={this.handleChange}
                />
              </label>

              <label htmlFor="instructions">
                Instructions
                <textarea
                  id="instructions"
                  name="instructions"
                  placeholder="Instructions..."
                  required
                  defaultValue={this.state.instructions}
                  onChange={this.handleChange}
                />
              </label>
              <button type="sumbit">Create</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default CreateRecipe;
export { CREATE_RECIPE_MUTATION };