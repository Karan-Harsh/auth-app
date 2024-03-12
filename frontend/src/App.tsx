import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import { useRecoilValue } from "recoil";
import { authenticatedAtom } from "./store/atoms/email";

function App() {
  const isAuthenticated = useRecoilValue(authenticatedAtom);
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={isAuthenticated ? <Home /> : <Signin />} />
          <Route
            path="/about"
            element={isAuthenticated ? <About /> : <Signin />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route
            path="/profile"
            element={isAuthenticated ? <Profile /> : <Signin />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
