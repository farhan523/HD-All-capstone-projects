import { useState, useEffect, useRef } from "react";
import close from "../../../public/images/icons8-close-50.png";
import Card from "../productDetailsCard/Card";
import { useSelector, useDispatch } from "react-redux";
import { toggleCart } from "../../app/features/cart/cartSlice";

export default function CartDetails({ setOpenDetailsPanel, openDetailsPanel, shipmentDetails }) {
    const ref = useRef(null);
    const cartProducts = useSelector((state) => state.cartSlice.cart.products);
    const total = useSelector((state) => state.cartSlice.cart.totalPrice);
    const isOpen = useSelector((state) => state.cartSlice.cart.open);
    const dispatch = useDispatch();

    function handleClick() {
        dispatch(toggleCart());
    }

    return isOpen ? (
        <>
            <div ref={ref} className="shipmentDetails animate__animated">
                <img src={close} style={{ paddingTop: 10, marginLeft: 5, marginRight: 5, cursor: "pointer" }} onClick={handleClick} alt="close" width={30} />
                <h2 style={{ marginTop: 20, padding: 10 }}>Total : {total} $</h2>
                <div style={{ display: "flex", justifyContent: "space-around" }}>
                    <h4>Select Shipment Method</h4>
                    <select name="pmethod" id="pmethod">
                        <option value="Overnight">Overnight</option>
                        <option value="saaExpedited">Expedited</option>
                        <option value="Priority Mail">Priority Mail</option>
                        <option value="Flat rate">Flat rate</option>
                    </select>
                </div>
                <a style={{ color: "black", padding: 10 }} href="https://www.shopify.com/blog/types-of-shipping" target="_blank">
                    Details
                </a>
                <div className="shipmentItems">
                    {cartProducts.map((product, index) => (
                        <Card id={index} price={product.price} quantity={product.quantity} name={product.name} description={product.description} image={product.image} />
                    ))}
                </div>
            </div>
        </>
    ) : null;
}
