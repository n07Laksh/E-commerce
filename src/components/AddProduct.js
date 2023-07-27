import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function AddProduct(props) {
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("")
  const navigate = useNavigate();

  const AddProduct = async () => {
    let data = await fetch("http://localhost:5000/api/products/addproducts", {
      method: "POST",
      body: JSON.stringify({ name: name, price: price, category: category }),
      headers: {
        "Content-Type": "Application/json",
        "jw-token": localStorage.getItem("jw-token")
      }
    });
    data = await data.json();
    if (!data.error) {
      navigate("/")
      props.showAlert("Product added successfully", "success")
    } else props.showAlert(data.error[0].msg, "warning")
  }
  return (
    <div className='container mt-4'>
      <h1 className="mx-5 my-3">Add Products Item</h1>

      <div className='container my-2'>
        <div className='container'>
          <form className='container'>
            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="name">Name</label>
              <input type="text" onChange={(e) => setName(e.target.value)} value={name} id="name" className="form-control" />
            </div>

            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="email">Price</label>
              <input type="text" onChange={(e) => setPrice(e.target.value)} value={price} id="price" className="form-control" />
            </div>

            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="category">category</label>
              <input type="text" onChange={(e) => setCategory(e.target.value)} value={category} id="category" className="form-control" />
            </div>

            <button type="button" onClick={AddProduct} className="btn btn-primary btn-block mb-4">Add Product</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddProduct
