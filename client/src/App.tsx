import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Home from "./pages/Home"
import ProductList from "./pages/ProductList"
import ProductDetail from "./pages/ProductDetail"
import Checkout from "./pages/Checkout"
import NotFound from "./pages/NotFound"
import Register from "./pages/Register"
import Login from "./pages/Login"
import NewProduct from "./pages/NewProduct"
import MyProfile from "./pages/MyProfile"
import OrderDetail from "./pages/OrderDetail"

function App() {

  return (
      <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/new-product" element={<NewProduct />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders/:id" element={<OrderDetail />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
