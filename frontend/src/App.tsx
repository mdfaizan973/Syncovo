import Login from "./Pages/auth/Login";
import SignUp from "./Pages/auth/SignUp";
import UnderConstruction from "./components/showcase/UnderConstruction";
import Showcase from "./components/showcase/Showcase";
import Language from "./components/widgets/Language";

function App() {
  // const underConstruction = false;
  return (
    <>
    <div className="">
      <UnderConstruction />
      {/* {underConstruction ? <Showcase /> : <Login />} */}
    </div>
    <Language />
    </>
  );
}

export default App;