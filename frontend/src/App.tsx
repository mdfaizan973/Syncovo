import Login from "./Pages/auth/Login";
import Showcase from "./Pages/showcase/Showcase";
import UnderConstruction from "./Pages/showcase/UnderConstruction";

function App() {
  const underConstruction = false;
  return (
    <>
      {underConstruction ? <Showcase /> : <Login />}
    </>
  );
}

export default App;