import CreateRecipe from "../components/CreateRecipe";
import PleaseSignIn from "../components/PleaseSignin";

const AddRecipe = props => (
  <div>
    <p>Create Recipe</p>
    <PleaseSignIn>
      <CreateRecipe />
    </PleaseSignIn>
  </div>
);

export default AddRecipe;
