import { BrowserRouter, Routes, Route } from "react-router-dom";
import Product from "./components/Product";
import AddProduct from "./components/AddProduct";
import UpdateProduct from "./components/UpdateProduct";
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/" element={<Product />} />
        <Route path="add" element={<AddProduct />} />
        <Route path="/edit/:id" element={<UpdateProduct />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
