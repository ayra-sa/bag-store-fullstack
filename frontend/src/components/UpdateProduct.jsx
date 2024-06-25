/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import instance from "../services/instance";
import Button from "./Button";
import InputField from "./InputField";
import axios from "axios";
import toast from "react-hot-toast";

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [file, setFile] = useState("");
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangeName = (e) => {
    setTitle(e.target.value);
  };

  const fetchDetailProduct = async () => {
    try {
      const res = await instance.get(`/products/${id}`);
      setTitle(res.data.name);
      setFile(res.data.image);
      setPreview(res.data.url);
    } catch (error) {
      console.error(error);
    }
  };

  const loadImage = (e) => {
    const image = e.target.files[0];
    setFile(image);
    setPreview(URL.createObjectURL(image));
  };

  const updateProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    setLoading(true);
    try {
      await axios.patch(`http://localhost:5000/products/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Product updated successfully")
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.msg)
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetailProduct();
  }, [id]);
  return (
    <section className="py-10">
      <div className="container">
        <form className="space-y-2 flex flex-col mt-8" onSubmit={updateProduct}>
          <InputField
            id={"product"}
            label={"Product Name"}
            type={"text"}
            value={title}
            onChange={handleChangeName}
          />

          <div className="flex flex-col gap-y-2">
            <label htmlFor="file">Image</label>
            <input type="file" name="file" id="file" onChange={loadImage} />

            {preview ? (
              <div>
                <img
                  src={preview}
                  alt="image preview"
                  className="w-32 h-3w-32"
                />
              </div>
            ) : (
              ""
            )}
          </div>

          <div className="flex gap-x-3 items-center !mt-10">
            <Button variant="primary" disabled={loading} type="submit">
              Update
            </Button>
            <Button
              variant="secondary"
              onClick={() => navigate("/")}
              type="button"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default UpdateProduct;
