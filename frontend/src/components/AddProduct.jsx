// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import InputField from "./InputField";
import axios from "axios";
import toast from "react-hot-toast";

const AddProduct = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [file, setFile] = useState("");
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false)

  const loadImage = (e) => {
    const image = e.target.files[0];
    setFile(image);
    setPreview(URL.createObjectURL(image));
  };

  const saveProduct = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("file", file)
    formData.append("title", title)
    setLoading(true)
    try {
      await axios.post("http://localhost:5000/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      toast.success("Product added successfully")
      navigate("/")
    } catch (error) {
      toast.error(error.response.data.msg)
      console.error(error)
    } finally {
      setLoading(false)
    }
  }


  return (
    <section className="py-10">
      <div className="container">
        <form action="" className="flex flex-col gap-2" onSubmit={saveProduct}>
          <div className="space-y-3">
            <InputField
              id={"product"}
              label={"Product Name"}
              type={"text"}
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            <div className="flex flex-col gap-y-2">
              <label htmlFor="file">Image</label>
              <input type="file" name="file" id="file" onChange={loadImage} required />

              {preview ? (
                <div>
                  <img src={preview} alt="image preview" className="w-32 h-3w-32" />
                </div>
              ) : null}
            </div>
          </div>

          <div className="flex items-center gap-x-4 mt-5">
            <Button variant="primary" type="submit" disabled={loading}>
              Save
            </Button>
            <Button variant="secondary" onClick={() => navigate("/")} type="button">
              Back
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddProduct;
