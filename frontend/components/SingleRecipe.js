import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Head from "next/head";
import Link from "next/link";
import DeleteRecipe from "./DeleteRecipe";
import styled from "styled-components";
import Error from "./ErrorMessage";

const SingleRecipeDiv = styled.div`
  img {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 50%;
    padding-bottom: 50px;
  }
  p {
    text-align: center;
    font-size: 20px;
  }
  .buttonList {
    display: grid;
    text-align: center;
    width: 100%;
    border-top: 1px solid #e1e1e1;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    grid-gap: 1px;
    background: #e1e1e1;
    & > * {
      background: black;
      border: 0;
      font-family: "radnika_next";
      font-size: 1rem;
      padding: 0.3rem;
      text-decoration: none;
      color: white;
    }
  }
  .titleSingle {
    display: block;
    text-align: center;
    list-style: none;
    font-size: 30px;
    text-decoration-line: underline;
  }
`;

const SINGLE_RECIPE_QUERY = gql`
  query SINGLE_RECIPE_QUERY($id: ID!) {
    recipe(where: { id: $id }) {
      id
      title
      ingredients
      instructions
      image
      largeImage
      user {
        id 
        name
      }
    }
  }
`;

class SingleRecipe extends Component {
  render() {
    return (
      <Query
        query={SINGLE_RECIPE_QUERY}
        variables={{
          id: this.props.id
        }}
      >
        {({ data, loading, error }) => {
          if (error) return <Error error={error} />;
          if (loading) return <p>Loading...</p>;
          if (!data.recipe) return <p>No recipe found...</p>;
          const recipe = data.recipe;
          const ingredientSplit = data.recipe.ingredients.split(", ");
          const instructionsSplit = data.recipe.instructions.split(", ");
          return (
            <React.Fragment>
              <Head>
                <title>MyRecipe App | {recipe.title}</title>
              </Head>
              <SingleRecipeDiv>
                {recipe.image ? (
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="center"
                  />
                ) : (
                  <img src="../static/no-image.png" alt="no image" />
                )}
                <div className="titleSingle">{recipe.title.toUpperCase()}</div>
                <ul className="ingredientCenter">
                  {ingredientSplit.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
                <hr />
                <ol>
                  {instructionsSplit.map((instruction, index) => (
                    <li key={index}>{instruction}</li>
                  ))}
                </ol>
                <div className="buttonList">
                  <Link href="/">
                    <a>Back</a>
                  </Link>
                  <Link
                    href={{
                      pathname: "/update",
                      query: { id: recipe.id }
                    }}
                  >
                    <a>Edit</a>
                  </Link>
                  <DeleteRecipe id={recipe.id}>
                    Delete Recipe
                  </DeleteRecipe>
                </div>
              </SingleRecipeDiv>
            </React.Fragment>
          );
        }}
      </Query>
    );
  }
}

export default SingleRecipe;
export { SINGLE_RECIPE_QUERY };
