import React, { useState } from "react";
import styles from "./styles.module.css";
import { toast } from "react-toastify";
import { CirclesWithBar } from "react-loader-spinner";
import { passwordStrength } from "check-password-strength";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setLogInUser } from "../../app/features/users/userSlice";

function Login() {
    const [errors, setErrors] = useState({});
    const users = useSelector((state) => state.userSlice.users);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    console.log(users);
    const [formData, setFormData] = useState({
        name: "",
        password: ""
    });
    const [loader, setLoader] = useState(false);

    const setErrorMessage = (errorType, errorMessage) => {
        setErrors((prevErrors) => ({
            [errorType]: errorMessage
        }));
    };

    const submitForm = () => {
        setLoader(true);
        let found = false;
        users.forEach((user) => {
            if (user.password == formData.password && user.name == formData.name) found = true;
        });
        setLoader(false);
        if (!found) {
            toast.error("No account with this name and password exits");
            return;
        }
        dispatch(dispatch(setLogInUser({ ...formData })));
        toast.success("successfully Login");
        toast.info("redirecting...");
        setTimeout(() => {
            navigate("/product");
        }, 5000);
    };

    const submitUserData = () => {
        const { name } = formData;
        setErrors({});

        if (name.length < 3) {
            setErrorMessage("nameError", "Name at least should be 3 characters");
            return;
        }

        submitForm();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setErrors({});
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <iframe mute="1" width="100%" height="100%" src="https://www.youtube.com/embed/Vsq1_kewchQ?autoplay=1&controls=0&modestbranding=1" accessKey="false" frameBorder="0" allow="accelerometer; autoplay; " allowFullScreen></iframe>
            </div>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    submitUserData();
                }}
                className={styles.right}
            >
                <div className={styles.rightChild}>
                    <h1 className={styles.heading}>USER LOGIN</h1>
                    <input name="name" value={formData.name} onChange={handleChange} placeholder="User Name" type="text" className={styles.input} />
                    <p className={styles.error}>{errors.nameError || null}</p>
                    <input name="password" required={true} value={formData.password} onChange={handleChange} placeholder="Password" type="password" className={styles.input} />
                    <p className={styles.error}>{errors.passwordError || null}</p>
                    <div className={styles.buttonContainer}>
                        <button type="submit" className={styles.button}>
                            LOGIN
                        </button>
                        <CirclesWithBar height="30" width="30" color="#6352EC" outerCircleColor="#6352EC" innerCircleColor="#6352EC" barColor="#6352EC" ariaLabel="circles-with-bar-loading" wrapperStyle={{}} wrapperClass="" visible={loader} />
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Login;
