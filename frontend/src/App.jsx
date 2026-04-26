import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Verify from "./pages/Verify";
import { useUserData } from "./context/UserContext";
import Loading from "./components/Loading";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import SingleProduct from "./pages/SingleProduct";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import OrderProcessing from "./pages/OrderProcessing";

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
            <Route path="/verify" element={ isAuth ? <Home/> : <Verify />}></Route>
            <Route path="/cart" element={ isAuth ? <Cart/> : <Login/> }></Route>
            <Route path="/checkout" element={ isAuth ? <Checkout/> : <Login/> }></Route>
            <Route path="/payment/:id" element={ isAuth ? <Payment/> : <Login/> }></Route>
            <Route path="/ordersuccess" element={ isAuth ? <OrderProcessing/> : <Login/> }></Route>
            <Route path="*" element={ <NotFound/> }></Route>
            <Route path="/products" element={<Products />}></Route>
            <Route path="/product/:id" element={<SingleProduct/>}></Route>
          </Routes>
          <Footer />
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
