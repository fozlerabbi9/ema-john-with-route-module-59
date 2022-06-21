import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../../firebase.init';
import useCart from '../../hooks/useCart';
import useProducts from '../../hooks/useProducts';
import { addToDb, getStoredCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';

const Shop = () => {
    // const [products, setProducts] = useProducts();
    // const [cart, setCart] = useState([]);
    const [cart, setCart] = useCart();  // 14 no line er ( useState([]) ) poriborte  ei line
    const [user] = useAuthState(auth);
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [products, setProducts] = useState([]);  // 13 line useProducts() = er poriborte ei line

    useEffect(() => {
        fetch(`http://localhost:5000/products?page=${page}&size=${size}`)
            // fetch('products.json')
            .then(res => res.json())
            .then(data => setProducts(data));
    }, [page, size]);
    // return [products, setProducts];

    useEffect(() => {
        fetch("http://localhost:5000/productsCount")
            .then(res => res.json())
            .then(data => {
                const count = data.count;
                const pages = Math.ceil(count / 10);
                setPageCount(pages);
            })
    }, [])

    console.log(user);
    // console.log(page);

    // useEffect(() => {
    //     const storedCart = getStoredCart();
    //     const savedCart = [];
    //     for (const id in storedCart) {
    //         const addedProduct = products.find(product => product._id === id);
    //         if (addedProduct) {
    //             const quantity = storedCart[id];
    //             addedProduct.quantity = quantity;
    //             savedCart.push(addedProduct);
    //         }
    //     }
    //     setCart(savedCart);
    // }, [products])

    const handleAddToCart = (selectedProduct) => {
        console.log(selectedProduct);
        let newCart = [];
        const exists = cart.find(product => product._id === selectedProduct._id);
        if (!exists) {
            selectedProduct.quantity = 1;
            newCart = [...cart, selectedProduct];
        }
        else {
            const rest = cart.filter(product => product._id !== selectedProduct._id);
            exists.quantity = exists.quantity + 1;
            newCart = [...rest, exists];
        }

        setCart(newCart);
        addToDb(selectedProduct._id);
    }

    return (
        <div>
            <p>page Count {pageCount}</p>
            <h2>{user ? user?.user?.email : ""}</h2>
            <div className='shop-container'>

                <div className="products-container">
                    {
                        products.map(product => <Product
                            key={product._id}
                            product={product}
                            handleAddToCart={handleAddToCart}
                        ></Product>)
                    }
                </div>
                <div className="cart-container">
                    <Cart cart={cart}>
                        <Link to="/orders">
                            <button>Review Order </button>
                        </Link>
                    </Cart>
                </div>
            </div>
            <div className='pagination-style'>
                {
                    [...Array(pageCount).keys()]
                        .map(pageNumber => <button onClick={() => setPage(pageNumber)} className={page === pageNumber ? 'selected' : 'pagination-button-style'}>
                            {pageNumber + 1}</button>)
                }
                {/* <p>
                    {size}
                </p> */}

                <select onChange={e => setSize(e.target.value)}>
                    <option value="5">5</option>
                    <option value="10" selected>10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                </select>
            </div>
        </div>
    );
};

export default Shop;