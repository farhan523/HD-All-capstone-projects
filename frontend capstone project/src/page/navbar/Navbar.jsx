import React, { useContext, useState } from "react";
import styles from "./style.module.css";
import logo from "../../../public/images/logo.png";
import cart from "../../../public/images/shopping-cart.png";
import close from "../../../public/images/cross.png";
import menu from "../../../public/images/menu.png";
import { toast } from "react-toastify";
import "animate.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleCart } from "../../app/features/cart/cartSlice";

let pages = [
    {
        name: "Login",
        link: "/Login"
    },
    {
        name: "SignUp",
        link: "/signup"
    },
    {
        name: "Products",
        link: "/product"
    }
];

function Navbar({ loggedIn }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const logInUser = useSelector((state) => state.userSlice.logInUser);
    const productCount = useSelector((state) => state.cartSlice.cart.totalItems);
    const dispatch = useDispatch();

    function visitPage(page) {
        console.log(page, logInUser.name);
        if (page == "/product" && logInUser.name == undefined && !loggedIn) return toast.info("Login first");

        navigate(page);
    }

    function openCartDetails() {
        if (logInUser.name == undefined && !loggedIn) return toast.info("Login first");
        dispatch(toggleCart());
    }

    return (
        <div className={styles.navbar}>
            <div className={styles.parentContainer}>
                {/* logo */}
                <div className={styles.leftChild}>
                    <img src={logo} style={{ height: "80%", width: "auto" }} alt="logo" />
                    <h1 style={{ paddingLeft: 10, fontSize: 21, fontWeight: "bold" }}>Block Trace</h1>
                </div>

                {/* pages links */}
                <div className={styles.centerChild}>
                    {pages.map((page) => {
                        if (page.name != "Products" && loggedIn) return;
                        return (
                            <p key={page.link} onClick={() => visitPage(page.link)}>
                                {page.name}
                            </p>
                        );
                    })}
                </div>

                {/* menu icon */}
                <div className={styles.menuIcon}>
                    <div onClick={openCartDetails} style={{ cursor: "pointer", height: "100%", width: "auto", display: "flex", alignItems: "center", position: "relative", marginRight: "20px" }}>
                        <img src={cart} style={{ height: "30%", width: "auto" }} alt="logo" />
                        <div>
                            <span style={{ position: "absolute", top: "32%", right: "-9px", backgroundColor: "red", borderRadius: "50%", width: "20px", height: "20px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                {" "}
                                {productCount}{" "}
                            </span>
                        </div>
                    </div>
                    <img onClick={() => setMenuOpen(true)} className={styles.menuIcons} src={menu} width={50} height={50} />
                </div>
            </div>

            {/* side menu */}
            <div
                style={{
                    display: menuOpen ? "flex" : "none",
                    animation: "slideInLeft",
                    animationDuration: "1s"
                }}
                className={styles.sideMenu}
            >
                <div
                    onClick={() => {
                        setMenuOpen(false);
                    }}
                    style={{ width: "100%", top: 0, position: "absolute", display: "flex", justifyContent: "flex-end", padding: 20, cursor: "pointer" }}
                >
                    <img src={close} width={50} height={50} />
                </div>
                <div className={styles.menuItem}>
                    {pages.map((page) => {
                        if (page.name != "Products" && loggedIn) return;
                        return (
                            <p key={page.link} onClick={() => visitPage(page.link)}>
                                {page.name}
                            </p>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Navbar;
