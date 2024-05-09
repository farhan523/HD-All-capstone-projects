import React, { useState } from "react";
import styles from "./styles.module.css";
import { toast } from "react-toastify";
import { CirclesWithBar } from "react-loader-spinner";
import { passwordStrength } from "check-password-strength";
import { useSelector,useDispatch } from "react-redux";
import { addUser } from "../../app/features/users/userSlice";

import { useNavigate } from "react-router-dom";

function Signup() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        name: "",
        firstName: "",
        surName: "",
        email: "",
        password: ""
    });
    const [loader, setLoader] = useState(false);

    const setErrorMessage = (errorType, errorMessage) => {
        setErrors((prevErrors) => ({
            [errorType]: errorMessage
        }));
    };

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    };

    const submitForm = () => {
        setLoader(true);
        dispatch(addUser({...formData,id:Math.random() * 100}))
        toast.success("successfully signup");
        toast.info("redirecting...");
        setTimeout(() => {
            navigate("/login");
        }, 5000);

        setLoader(false);
    };

    const submitUserData = () => {
        const { firstName, surName, name, email, password } = formData;
        setErrors({});

        if (firstName.length < 3) {
            setErrorMessage("firstNameError", "First Name at least should be 3 characters");
            return;
        }
        if (surName.length < 3) {
            setErrorMessage("surNameError", "Sur name at least should be 3 characters");
            return;
        }
        if (name.length < 3) {
            setErrorMessage("nameError", "Name at least should be 3 characters");
            return;
        }
        if (email.length === 0) {
            setErrorMessage("emailError", "Please enter an email address");
            return;
        }
        if (!validateEmail(email)) {
            setErrorMessage("emailError", "Email address is invalid");
            return;
        }

        const passwordStrengthValue = passwordStrength(password).value;
        if (passwordStrengthValue !== "Strong" && passwordStrengthValue !== "Medium") {
            setErrorMessage("passwordError", "Weak Password");
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
                    <h1 className={styles.heading}>USER SIGNUP</h1>
                    <input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" type="text" autoComplete="true" className={styles.input} />
                    <p className={styles.error}>{errors.firstNameError || null}</p>
                    <input name="surName" value={formData.surName} onChange={handleChange} placeholder="Surname" type="text" className={styles.input} />
                    <p className={styles.error}>{errors.surNameError || null}</p>
                    <input name="name" value={formData.name} onChange={handleChange} placeholder="User Name" type="text" className={styles.input} />
                    <p className={styles.error}>{errors.nameError || null}</p>
                    <input name="email" value={formData.email} onChange={handleChange} placeholder="Email Address" type="text" className={styles.input} />
                    <p className={styles.error}>{errors.emailError || null}</p>
                    <input name="password" value={formData.password} onChange={handleChange} placeholder="Password" type="password" className={styles.input} />
                    <p className={styles.error}>{errors.passwordError || null}</p>
                    <div className={styles.buttonContainer}>
                        <button type="submit" className={styles.button}>
                            SIGNUP
                        </button>
                        <CirclesWithBar height="30" width="30" color="#6352EC" outerCircleColor="#6352EC" innerCircleColor="#6352EC" barColor="#6352EC" ariaLabel="circles-with-bar-loading" wrapperStyle={{}} wrapperClass="" visible={loader} />
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Signup;
