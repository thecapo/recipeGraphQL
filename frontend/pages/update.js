import UpdateRecipe from "../components/UpdateRecipe";
import PleaseSignIn from "../components/PleaseSignin";

const EditRecipe = ({ query }) => (
  <div>
    <PleaseSignIn>
      <UpdateRecipe id={query.id} />
    </PleaseSignIn>
  </div>
);

export default EditRecipe;
