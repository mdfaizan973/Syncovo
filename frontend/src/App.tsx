import MainRoutes from "./routes/MainRoutes";
import Footer from "./shared/Footer";
import Language from "./shared/Language";
import Navbar from "./shared/Navbar";

function App() {
  return (
    <>
      {/* Navbar */}
      <Navbar />

      <div>
        <MainRoutes />
      </div>

      {/* Footer */}
      <Footer />

      <Language />
    </>
  );
}

export default App;