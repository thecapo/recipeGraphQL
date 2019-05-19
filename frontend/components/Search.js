import React, { Component } from "react";
import Downshift, { resetIdCounter } from "downshift";
import Router from "next/router";
import { ApolloConsumer } from "react-apollo";
import gql from "graphql-tag";
import debounce from "lodash.debounce";
import { DropDown, DropDownRecipe, SearchStyles } from "./styles/DropDown";

const SEARCH_ITEMS_QUERY = gql`
  query SEARCH_ITEMS_QUERY($searchTerm: String!) {
    recipes(where: { OR: [{ title_contains: $searchTerm }] }) {
      id
      title
      ingredients
      image
      largeImage
    }
  }
`;

function routeToRecipe(recipe) {
  Router.push({
    pathname: "/recipe",
    query: {
      id: recipe.id
    }
  });
}

class AutoComplete extends Component {
  state = {
    recipes: [],
    loading: false
  };
  onChange = debounce(async (e, client) => {
    console.log('Searching...');
    this.setState({ loading: true });
    const res = await client.query({
      query: SEARCH_ITEMS_QUERY,
      variables: { searchTerm: e.target.value }
    });
    this.setState({
      recipes: res.data.recipes,
      loading: false
    })
  }, 350)
  render() {
    resetIdCounter();
    return (
      <SearchStyles>
        <Downshift
          onChange={routeToRecipe}
          itemToString={item => (item === null ? "" : item.title)}
        >
          {({
            getInputProps,
            getItemProps,
            isOpen,
            inputValue,
            highlightedIndex
          }) => (
            <div>
              <ApolloConsumer>
                {client => (
                  <input
                    {...getInputProps({
                      type: "search",
                      placeholder: "Search your favorite recipe...",
                      id: "search",
                      className: this.state.loading ? "loading" : "",
                      onChange: e => {
                        e.persist();
                        this.onChange(e, client);
                      }
                    })}
                  />
                )}
              </ApolloConsumer>
              {isOpen && (
                <DropDown>
                  {this.state.recipes.map((item, index) => (
                    <DropDownRecipe
                      {...getItemProps({ item })}
                      key={item.id}
                      highlighted={index === highlightedIndex}
                    >
                      <img width="50" src={item.image} alt={item.title} />
                      {item.title}
                    </DropDownRecipe>
                  ))}
                  {!this.state.recipes.length && !this.state.loading && (
                    <DropDownRecipe>
                      No Recipe Found {inputValue}
                    </DropDownRecipe>
                  )}
                </DropDown>
              )}
            </div>
          )}
        </Downshift>
      </SearchStyles>
    );
  }
}

export default AutoComplete;
