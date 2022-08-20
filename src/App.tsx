import { Toaster } from "react-hot-toast";
import { Routes } from "./Routes";
import { GlobalStyle } from "./Styles";

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <Toaster />
      <Routes />
    </div>
  );
}

export default App;
