import React from "react";
import styles from "./card.module.css";

import { toast } from "react-toastify";

function Card({ handleAddToCart, index, quantity, id, handleQuantityChange, name, image, description, price, itemsRemaining }) {
    return (
        <div key={id} className={styles.card}>
            <div className={styles.productImage} style={{ backgroundImage: `url(${image})` }}></div>
            <h1>{name}</h1>
            <p>{description}</p>
            <h2>{price}$</h2>
            <div className={styles.quant}>
                <p>Quantity</p>
                <div className={styles.iconDiv}>
                    <div
                        className={styles.quantIcon}
                        onClick={() => {
                            handleQuantityChange(id, quantity - 1, index);
                        }}
                    >
                        -
                    </div>
                    <p>{quantity}</p>
                    <div
                        className={styles.quantIcon}
                        onClick={() => {
                            handleQuantityChange(id, quantity + 1, index);
                        }}
                    >
                        +
                    </div>
                </div>
            </div>
            <div className={styles.quant}>
                <p>Items Remaining In Store :</p>
                <div className={styles.iconDiv}>{itemsRemaining == "0" ? <p style={{ color: "red" }}>OUT OF STOCK</p> : itemsRemaining}</div>
            </div>
            <button
                disabled={itemsRemaining == "0" ? true : false}
                className={styles.btn}
                onClick={() => {
                    handleAddToCart(id, quantity, index);
                }}
            >
                Add To Cart
            </button>
        </div>
    );
}

export default Card;
