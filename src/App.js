import "./App.css";
import Footer from "./components/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Form from "./components/Form";

function App() {
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Form/>} />
            {/* Add more routes as needed */}
          </Routes>
        </BrowserRouter>
      </div>
      <Footer />
    </>
  );
}

export default App;
