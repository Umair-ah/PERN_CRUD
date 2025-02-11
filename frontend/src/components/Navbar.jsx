import axios from "axios";
import { useState } from "react";
const Navbar = ({fetchProducts})=>{


  const [productValues, setProductValues] = useState({
    name:"",
    price: 0,
    image_url: ""
  });

  const handleSubmit = async()=>{
    try {
      await axios.post("http://localhost:5000/products/", productValues)
      fetchProducts();
      document.getElementById('my_modal_create').close()
      setProductValues({
        name:"",
        price: 0,
        image_url: ""
      })
    } catch (error) {
      console.error(error.message)      
    }
  }


  return(
    <div className="navbar bg-base-100 border-b-2 border-gray-100 flex items-center justify-between">
      <a className="btn btn-ghost text-xl">PERN</a>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button className="btn btn-primary" onClick={()=>document.getElementById('my_modal_create').showModal()}>Create</button>
      <dialog id="my_modal_create" className="modal">
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
              onChange={(e) => setProductValues({...productValues, price: e.target.value})}
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
              <div className="flex justify-between items-center gap-3">

                <button
                  onClick={handleSubmit}
                  disabled={!productValues.name || !productValues.price || !productValues.image_url}
                  className="btn btn-primary my-5"
                  >
                  Create
                </button>
                <button className="btn btn-error">Close</button>
              </div>
            </form>
          </div>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  )
}

export default Navbar;