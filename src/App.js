import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "./components/common/Header";
import Multistepform from "./components/pages/form/Form";
import Activityplanner from "./components/pages/activityplanner/Activityplanner";

function App() {
  return (
    <div className="App">
      <div className="container">
        <Header />
        <div className="pageContainer">
          <Routes>
            <Route path="/" element={<Multistepform />} />
            <Route path="/activities" element={<Activityplanner />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
