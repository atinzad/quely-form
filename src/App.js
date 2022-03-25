import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import QueueForm from "./components/QueueForm";

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/form/:queueId" element={<QueueForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
