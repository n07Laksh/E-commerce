import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'


function UpdateProduct(props) {
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("")
  const navigate = useNavigate()
  const { id } = useParams();



  const product = async () => {
    let data = await fetch("http://localhost:5000/api/products/findproduct", {
      method: "POST",
      body: JSON.stringify({ id: id }),
      headers: {
        "Content-Type": "Application/json",
        "jw-token": localStorage.getItem("jw-token")
      }
    });

    data = await data.json();
    setName(data.name);
    setPrice(data.price);
    setCategory(data.category);
  }

  useEffect(() => {
    product();
  }, []);

  const handleUpdate = async () => {
    let data = await fetch("http://localhost:5000/api/products/updateProduct", {
      method: "PUT",
      headers: {
        "Content-Type": "Application/json",
        "jw-token": localStorage.getItem("jw-token")
      },
      body: JSON.stringify({ name: name, price: price, category: category, id: id })
    });

    data = await data.json();
    if (!data.error) {
      navigate("/");
      props.showAlert("Product upudated successfully", "success")
    } else {
      props.showAlert(data.error[0].msg, "warning")
    }
  }
  return (

    <div className='container mt-4'>
      <h1 className="mx-5 my-3">Update Products Item</h1>

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

            <button type="button" onClick={handleUpdate} className="btn btn-primary btn-block mb-4">Update Product</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UpdateProduct
