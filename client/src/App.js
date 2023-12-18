import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Dashboard, Landing, NotFound, Redirect, RegisterLogin } from "./pages";
import { AppProvider } from "./context/appContext";

function App() {
  return (
    <BrowserRouter>
      <Routes>

      <Route path="/" element={<Landing />} />
      <Route path="/register" element={<AppProvider><RegisterLogin /></AppProvider>} />
      <Route path="/dashboard" element={<AppProvider><Dashboard /></AppProvider>} />
      <Route path="/r/:c/:s" element={<Redirect />} />
      <Route path="*" element={<NotFound />}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;