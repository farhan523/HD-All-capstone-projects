import React from "react";
import styles from "./card.module.css";

function Card({ quantity, id, name, image, description, price }) {
    return (
        <div key={id} className={styles.card}>
            <div className={styles.productImage} style={{ backgroundImage: `url(${image})` }}></div>
            <h1>{name}</h1>
            <p>{description}</p>
            <div className={styles.quant}>
                <h5>Quantity :</h5>
                <div className={styles.iconDiv}>
                    <p>{quantity}</p>
                </div>
                <h5>Price :</h5>
                <div className={styles.iconDiv}>
                    <p>{price} $</p>
                </div>
            </div>
        </div>
    );
}

export default Card;
