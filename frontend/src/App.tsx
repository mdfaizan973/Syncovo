// import Login from "./Pages/auth/Login";
// import SignUp from "./Pages/auth/SignUp";
// import Showcase from "./Pages/showcase/Showcase";
import UnderConstruction from "./Pages/showcase/UnderConstruction";
import Language from "./Pages/components/widgets/Language";

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