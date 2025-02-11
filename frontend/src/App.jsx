import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Card from './components/Card'
import axios from "axios"


function App() {
  const [products, setProducts] = useState([]);

  useEffect(()=>{
    fetchProducts();
  },[])

  const fetchProducts = async()=>{
    try {
      const products = await axios.get("http://localhost:5000/products/");
      setProducts(products.data);
    } catch (error) {
      console.log(error.message)
    }

  }

  return (
    <>
      <Navbar products={products} setProducts = {setProducts} />
      <Card products = {products} setProducts= {setProducts} />
    </>
  )
}

export default App;
