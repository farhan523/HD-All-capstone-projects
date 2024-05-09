import React, { useState } from "react";
import Navbar from "../navbar/Navbar";
import Card from "../../components/productCard/Card";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { decreaseProductCount } from "../../app/features/products/productSlice";
import { addProduct } from "../../app/features/cart/cartSlice";
import CartDetails from "../../components/cartDetails/CartDetails";

export default function Product() {
    const [quantities, setQuantities] = useState({});
    const products = useSelector((state) => state.productSlice.products);
    const dispatch = useDispatch();

    const handleQuantityChange = (productId, quantity, index) => {
        if (quantity < 0) quantity = 0;
        if (quantity > products[index].itemRemaining) {
            toast.info(`only ${quantity - 1} items remaining cannot add more`);
            return;
        }
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [productId]: { quantity }
        }));
    };

    function handleAddToCart(id, quantity, index) {
        if (quantities[id]?.quantity == 0 || quantities[id] == undefined) return toast.info("increase product count to 1 to add");

        toast.info("Product added to cart");
        dispatch(decreaseProductCount({ index, itemBuy: quantities[id].quantity }));
        dispatch(addProduct({ ...products[index], quantity: quantities[id].quantity }));
    }

    return (
        <>
            <Navbar loggedIn={true} />
            <CartDetails />
            <div style={{ display: "flex", justifyContent: "space-around", width: "95%", flexWrap: "wrap" }}>
                {products.map((product, index) => {
                    return (
                        <Card
                            index={index}
                            handleAddToCart={handleAddToCart}
                            key={product.id}
                            handleQuantityChange={handleQuantityChange}
                            id={product.id}
                            image={product.image}
                            description={product.description}
                            name={product.name}
                            price={product.price}
                            quantity={quantities[product.id]?.quantity || 0}
                            itemsRemaining={product.itemRemaining}
                        />
                    );
                })}
            </div>
        </>
    );
}
