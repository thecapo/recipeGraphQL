import React, { Component } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import DeleteRecipe from "./DeleteRecipe";
import RecipeStyles from "../components/styles/RecipeStyles";
import Title from "../components/styles/Title";

class Recipe extends Component {
  static propTypes = {
    recipe: PropTypes.object.isRequired
  };

  render() {
    const { recipe } = this.props;
    const recipeSplit = recipe.ingredients.split(", ");
    return (
      <RecipeStyles>
        {recipe.image ? (
          <img src={recipe.image} alt={recipe.title} />
        ) : (
          <img src="../static/no-image.png" alt="no image" />
        )}
        <Title>
          <Link
            href={{
              pathname: "/recipe",
              query: { id: recipe.id }
            }}
          >
            <a>{recipe.title}</a>
          </Link>
        </Title>
        <ul>
          {recipeSplit.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
        <div className="buttonList">
          <Link
            href={{
              pathname: "/recipe",
              query: { id: recipe.id }
            }}
          >
            <a>Read Recipe</a>
          </Link> 
          <Link
            href={{
              pathname: "/update",
              query: { id: recipe.id }
            }}
          >
            <a>Edit</a>
          </Link>
          <DeleteRecipe id={recipe.id}>Delete Recipe</DeleteRecipe>
        </div>
      </RecipeStyles>
    );
  }
}

export default Recipe;
