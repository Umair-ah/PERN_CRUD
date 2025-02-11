import { useEffect, useState } from "react";
import axios from "axios";

const Card = ({products, setProducts})=>{

  const [selectedProduct, setSelectedProduct] = useState(null)

  const [productValues, setProductValues] = useState({
    name:"",
    price: 0,
    image_url: ""
  });


  useEffect(()=>{
    if(selectedProduct){
      setProductValues({
        name: selectedProduct.name,
        price: Number(selectedProduct.price),
        image_url: selectedProduct.image
      })
    }

  },[selectedProduct])

  const handleUpdate = async(product_id)=>{

    const response = await axios.put(`http://localhost:5000/products/${product_id}`, productValues)
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.product_id === product_id ? response.data : product
      )
    );
    document.getElementById(`my_modal_${product_id}`).close();
    setProductValues({
      name:"",
      price: 0,
      image_url: ""
    })
    setSelectedProduct(null);
  }


  return(
    <>
      <div className="grid grid-cols-3">
      {products.map((product, index) => (

          <div key={index} className="card bg-base-200 w-96 shadow-xl my-7">
            <figure>
              <img
                src={product.image}
                alt={product.name} />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{product.name}</h2>
              <h2 className="card-title">{Number(product.price).toFixed(2)}</h2>

              <div className="card-actions justify-end">
                {/* Open the modal using document.getElementById('ID').showModal() method */}
                <button 
                  className="btn" 
                  onClick={()=>{
                    setSelectedProduct(product)
                    setTimeout(() => {
                      document.getElementById(`my_modal_${product.product_id}`).showModal();
                    }, 0);
                  }}
                >
                  Edit
                </button>
                {selectedProduct && selectedProduct.product_id === product.product_id && (

                  <dialog id={`my_modal_${product.product_id}`} className="modal">
                  <div className="modal-box">
                    <div>
                      <input
                        type="text" 
                        className="p-2 w-full bg-white text-gray-800 rounded-md border border-x-purple-600"
                        placeholder="Product Name"
                        value={productValues.name}
                        onChange={(e) => setProductValues({...productValues, name: e.target.value})}
                        />

                      <input
                        type="number" 
                        className="p-2 w-full bg-white text-gray-800 my-4 rounded-md border border-x-purple-600"
                        placeholder="Product Price"
                        step="0.1"
                        value={productValues.price}
                        onChange={(e) => setProductValues({...productValues, price: Number(e.target.value)})}
                        />

                      <input
                        type="text" 
                        className="p-2 w-full bg-white text-gray-800 rounded-md border border-x-purple-600"
                        placeholder="Product Image URL"
                        value={productValues.image_url}
                        onChange={(e) => setProductValues({...productValues, image_url: e.target.value})}
                        />
                    </div>
                    <div className="modal-action">
                      <form method="dialog">
                        <div className="flex gap-4">

                          {/* if there is a button in form, it will close the modal */}
                          <button className="btn btn-secondary" onClick={()=> handleUpdate(product.product_id)}>Update</button>

                          <button className="btn btn-error" onClick={()=> setSelectedProduct(null)}>Close</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </dialog>
                )}
              </div>
            </div>
          </div>
      ))}
      </div>
    </>
  )
}

export default Card;