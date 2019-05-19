import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { ALL_RECIPES_QUERY } from './Recipes';

const DELETE_RECIPE_MUTATION = gql`
  mutation DELETE_RECIPE_MUTATION($id: ID!) {
    deleteRecipe(id: $id) {
      id
    }
  }
`;

class DeleteRecipe extends Component {
  update = (cache, payload) => {
    const data = cache.readQuery({ query: ALL_RECIPES_QUERY });
    data.recipes = data.recipes.filter(recipe => recipe.id !== payload.data.deleteRecipe.id);
    cache.writeQuery({ query: ALL_RECIPES_QUERY, data });
  };
  render() {
    return (
      <Mutation
        mutation={DELETE_RECIPE_MUTATION}
        variables={{ id: this.props.id }}
        update={this.update}
      >
        {(deleteRecipe, { error }) => (
          <button
            onClick={() => {
              if (confirm("Are you sure you want to delete this item?")) {
                deleteRecipe().catch(err => {
                  alert(err.message);
                });
              }
            }}
          >
            {this.props.children}
          </button>
        )}
      </Mutation>
    );
  }
}

export default DeleteRecipe;