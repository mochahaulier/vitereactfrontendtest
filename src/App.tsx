import "@fortawesome/fontawesome-free/css/all.min.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "./App.css";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="App">
      <Toaster
        toastOptions={{
          className: "",
          style: {
            backgroundColor: "#eff1f255",
            backdropFilter: "blur(8px)",
          },
        }}
      />
      <Home />
    </div>
  );
}

export default App;
