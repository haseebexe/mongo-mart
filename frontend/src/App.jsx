import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Verify from "./pages/Verify";
import { useUserData } from "./context/UserContext";
import Loading from "./components/Loading";

function App() {
  const { isAuth, loading } = useUserData();

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={isAuth ? <Home/> : <Login />}></Route>
            <Route path="/verify" element={ isAuth ? <Home/> :<Verify />}></Route>
            <Route path="/products" element={<Products />}></Route>
          </Routes>
          <Footer />
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
