import React, { Component } from "react";
import { Mutation, Query } from "react-apollo";
import Router from "next/router";
import gql from "graphql-tag";
import { SINGLE_RECIPE_QUERY } from "./SingleRecipe";
import Error from "./ErrorMessage";
import Form from "../components/styles/Form";

//
import User from './User';

const UPDATE_RECIPE_MUTATION = gql`
  mutation UPDATE_RECIPE_MUTATION(
    $id: ID!
    $title: String
    $ingredients: String
    $instructions: String
  ) {
    updateRecipe(
      id: $id
      title: $title
      ingredients: $ingredients
      instructions: $instructions
    ) {
      id
      title
      ingredients
      instructions
    }
  }
`;

class UpdateRecipe extends Component {
  state = {};

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  updateRecipe = async (e, updateRecipeMutation) => {
    e.preventDefault();
    console.log("Updating Recipe...");
    console.log(this.state);
    const res = await updateRecipeMutation({
      variables: {
        id: this.props.id,
        ...this.state
      }
    });
    Router.push({
      pathname: "/recipe",
      query: { id: res.data.updateRecipe.id }
    });
    console.log("Updated!");
  };

  uploadFile = async e => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "recipeapp");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/cawo/image/upload",
      {
        method: "POST",
        body: data
      }
    );
    const file = await res.json();
    console.log(file);
    this.setState({
      image: file.secure_url,
      largeImage: file.eager[0].secure_url
    });
  };

  render() {
    return (
      <Query
        query={SINGLE_RECIPE_QUERY}
        variables={{
          id: this.props.id
        }}
      >
        {({ data, loading, error }) => {
          if (loading) return <p>Loading...</p>;
          if (error)
            return (
              <p>
                <Error error={error} />
              </p>
            );
          if (!data.recipe) return <p>No recipe found...</p>;
          return (
            <Mutation
              mutation={UPDATE_RECIPE_MUTATION}
              variables={this.state}
            >
              {(updateRecipe, { loading, error }) => (
                <Form
                  onSubmit={e => this.updateRecipe(e, updateRecipe)}
                >
                  <Error error={error} />
                  <label htmlFor="title">
                    Title
                    <input
                      type="text"
                      id="title"
                      name="title"
                      placeholder="Title"
                      required
                      defaultValue={data.recipe.title}
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
                      defaultValue={data.recipe.ingredients}
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
                      defaultValue={data.recipe.instructions}
                      onChange={this.handleChange}
                    />
                  </label>
                    <button type="sumbit">Update</button>
                    <button>Back</button>
                </Form>
              )}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

export default UpdateRecipe;
export { UPDATE_RECIPE_MUTATION };
