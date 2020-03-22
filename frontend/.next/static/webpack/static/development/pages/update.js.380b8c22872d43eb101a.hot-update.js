webpackHotUpdate("static/development/pages/update.js",{

/***/ "./components/Recipe.js":
/*!******************************!*\
  !*** ./components/Recipe.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _DeleteRecipe__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./DeleteRecipe */ "./components/DeleteRecipe.js");
/* harmony import */ var _components_styles_RecipeStyles__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../components/styles/RecipeStyles */ "./components/styles/RecipeStyles.js");
/* harmony import */ var _components_styles_Title__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../components/styles/Title */ "./components/styles/Title.js");






var _jsxFileName = "/Users/jenny/Sites/portfolio/recipeGraphQL/frontend/components/Recipe.js";







var Recipe =
/*#__PURE__*/
function (_Component) {
  Object(_babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__["default"])(Recipe, _Component);

  function Recipe() {
    Object(_babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, Recipe);

    return Object(_babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__["default"])(this, Object(_babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__["default"])(Recipe).apply(this, arguments));
  }

  Object(_babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(Recipe, [{
    key: "render",
    value: function render() {
      var recipe = this.props.recipe;
      console.log("user", this.props);
      var recipeSplit = recipe.ingredients.split(", ");
      return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_components_styles_RecipeStyles__WEBPACK_IMPORTED_MODULE_10__["default"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 18
        },
        __self: this
      }, recipe.image ? react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("img", {
        src: recipe.image,
        alt: recipe.title,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 20
        },
        __self: this
      }) : react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("img", {
        src: "../static/no-image.png",
        alt: "no image",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 22
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_components_styles_Title__WEBPACK_IMPORTED_MODULE_11__["default"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 24
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_8___default.a, {
        href: {
          pathname: "/recipe",
          query: {
            id: recipe.id
          }
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 25
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("a", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 31
        },
        __self: this
      }, recipe.title))), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("ul", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 34
        },
        __self: this
      }, recipeSplit.map(function (ingredient, index) {
        return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("li", {
          key: index,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 36
          },
          __self: this
        }, ingredient);
      })), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("div", {
        className: "buttonList",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 39
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_8___default.a, {
        href: {
          pathname: "/recipe",
          query: {
            id: recipe.id
          }
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 40
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("a", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 46
        },
        __self: this
      }, "Read Recipe")), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_8___default.a, {
        href: {
          pathname: "/update",
          query: {
            id: recipe.id
          }
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 48
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("a", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 54
        },
        __self: this
      }, "Edit")), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_DeleteRecipe__WEBPACK_IMPORTED_MODULE_9__["default"], {
        id: recipe.id,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 56
        },
        __self: this
      }, "Delete Recipe")));
    }
  }]);

  return Recipe;
}(react__WEBPACK_IMPORTED_MODULE_6__["Component"]);

Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_5__["default"])(Recipe, "propTypes", {
  recipe: prop_types__WEBPACK_IMPORTED_MODULE_7___default.a.object.isRequired
});

/* harmony default export */ __webpack_exports__["default"] = (Recipe);

/***/ })

})
//# sourceMappingURL=update.js.380b8c22872d43eb101a.hot-update.js.map