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
import Orders from "./pages/Orders"
import Manage from "./pages/Manage"

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/new-product" element={<NewProduct />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/manage/:id" element={<Manage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
