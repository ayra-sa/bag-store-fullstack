/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import instance from "../services/instance";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState(0);
  const [showModal, setShowModal] = useState(false);
  // const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const res = await instance.get("/products");
      setProducts(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpenModal = (id) => {
    setProductId(id);
    setShowModal(true);
  };

  const deleteProduct = async (id) => {
    try {
      await instance.delete(`/products/${id}`);
      fetchProducts();
      setShowModal(false);
      toast.success("Product deleted successfully");
    } catch (error) {
      toast.error(error.response.data.msg)
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <section className="py-10">
      <div className="container">
        <h2 className="text-4xl mb-5">Welcome to Bag Store</h2>
        <Button onClick={() => navigate("add")} variant="primary">
          Add
        </Button>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
          {products.map((product) => (
            <div key={product.id} className="rounded-md shadow-md">
              <div className="p-5">
                <img
                  src={product.url}
                  alt={product.name}
                  className="w-full h-56"
                />
                <p className="mt-5 font-semibold text-2xl">{product.name}</p>
              </div>
              <div className="flex items-center">
                <button
                  className="flex-1 p-5 border border-neutral-200 font-semibold transition duration-300 hover:bg-blue-500 hover:text-white"
                  onClick={() => navigate(`/edit/${product.id}`)}
                >
                  Edit
                </button>
                <button
                  className="flex-1 p-5 border border-neutral-200 font-semibold transition duration-300 hover:bg-red-500 hover:text-white"
                  onClick={() => handleOpenModal(product.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

          {showModal ? (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex place-content-center items-center justify-center">
              <div className="bg-white p-5 rounded-md shadow-md w-[30%] flex flex-col items-center place-content-center space-y-5 h-[250px]">
                <p>Are you sure want to delete this item?</p>
                <div className="flex items-center gap-x-2">
                  <Button
                    variant={"secondary"}
                    onClick={() => setShowModal(false)}
                  >
                    No
                  </Button>
                  <Button
                    variant={"primary"}
                    onClick={() => deleteProduct(productId)}
                  >
                    Yes
                  </Button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default Product;
