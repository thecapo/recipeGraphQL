import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import Recipe from "./Recipe";

const ALL_RECIPES_QUERY = gql`
  query ALL_RECIPES_QUERY {
    recipes {
      id
      title
      ingredients
      image
      largeImage
    }
  }
`;

const Center = styled.div`
  text-align: center;
`;

const RecipesList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
  max-width: 1000px;
  margin: 0 auto;
  li {
   float: left;
   padding-right: 30px;
  }
`;

class Recipes extends Component {
  render() {
    return (
      <Center>
        <Query query={ALL_RECIPES_QUERY}>
          {({ data, error, loading }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error: {error.message}</p>;
            return (
              <RecipesList>
                {data.recipes.map(recipe => (
                  <Recipe recipe={recipe} key={recipe.id} />
                ))}
              </RecipesList>
            );
          }}
        </Query>
      </Center>
    );
  }
}

export default Recipes;
export { ALL_RECIPES_QUERY };
