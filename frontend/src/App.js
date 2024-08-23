import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Student from "./Student";
import CreateStudent from "./CreateStudent";
import UpdateStudent from "./UpdateStudent";
import ViewStudent from "./ViewStudent";
import NotFound from "./NotFound";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Student />}></Route>
          <Route path="/create" element={<CreateStudent />}></Route>
          <Route path="/update/:id" element={<UpdateStudent />}></Route>
          <Route path="/view/:id" element={<ViewStudent />}></Route>
          {/* Suggested by chatgpt */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
