import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Home(props) {
  const [products, setProducts] = useState([])
  const navigate = useNavigate()
  const getProductsItems = async () => {
    let data = await fetch("http://localhost:5000/api/products/getproducts", {
      method: "GET",
      headers: {
        "Content-Type": "Application/json",
        "jw-token": localStorage.getItem("jw-token")
      }
    })
    data = await data.json();
    setProducts(data)
  }
  useEffect(() => {
    getProductsItems();
  }, []);

  const deleteItem = async (id) => {
    let data = await fetch("http://localhost:5000/api/products/deleteProduct", {
      method: "DELETE",
      headers: {
        "Content-Type": "Application/json",
        "jw-token": localStorage.getItem("jw-token")
      },
      body: JSON.stringify({ id: id })
    })
    data = await data.json()
    if (data.success) {
      getProductsItems();
      props.showAlert("Product deleted successfully", "success");
    }
  }


  return (
    <div className='container mt-4'>
      <h1 >Products</h1>


      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Operation</th>
          </tr>
          {products.length > 0 ?
            products.map((item, index) => {
              return (<tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.category}</td>
                <td>
                  <Link to={`/UpdateProduct/${item._id}`} className='btn btn-dark mr-1 btn-sm'>Update</Link>
                  <button className='btn btn-dark btn-sm' onClick={() => deleteItem(item._id)}>Delete</button>
                </td>

              </tr>
              )
            })
            : navigate("/AddProduct")
          }
        </thead>
      </table>
    </div>
  )
}

export default Home
