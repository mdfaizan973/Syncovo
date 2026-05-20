import MainRoutes from "./routes/MainRoutes";
import Language from "./shared/Language";

function App() {
  return (
    <>
      {/* Navbar */}

      <div>
        <MainRoutes />
      </div>

      {/* Footer */}

      <Language />
    </>
  );
}

export default App;