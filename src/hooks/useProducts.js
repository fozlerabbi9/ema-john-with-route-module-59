import { useEffect, useState } from "react"

const useProducts = () =>{
    
    const [products, setProducts] = useState([]);

    useEffect( () =>{
        fetch('http://localhost:5000/products')
        // fetch('products.json')
        .then(res => res.json())
        .then(data => setProducts(data));
    }, []);

    return [products, setProducts];
}

export default useProducts;