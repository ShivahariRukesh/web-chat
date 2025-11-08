import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import Logo from "../assets/logo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute } from "../utils/ApiRoutes";

function Register() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    password: "",
    email: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/");
    }
  }, [navigate]);

  const toastOptions = {
    position: "top-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.", toastOptions);
      return false;
    } else if (username.length < 3) {
      toast.error("Username must be at least 3 characters.", toastOptions);
      return false;
    } else if (password.length < 8) {
      toast.error("Password must be at least 8 characters.", toastOptions);
      return false;
    } else if (!email) {
      toast.error("Email is required.", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { username, email, password } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        password,
        email,
      });

      if (!data.status) toast.error(data.msg, toastOptions);

      if (data.status) {
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
        navigate("/");
      }
    }
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <>
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>Hellow!</h1>
          </div>

          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={handleChange}
            required
          />

          <button type="submit">Create Account</button>
          <span>
            Already have an account? <Link to="/login">Login</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

// Floating animation
const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(145deg, #0f0c29, #302b63, #24243e);

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    margin-bottom: 2rem;
    animation: ${float} 6s ease-in-out infinite;

    img {
      height: 4rem;
      animation: ${float} 4s ease-in-out infinite;
    }

    h1 {
      color: #e0e0e0;
      font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
      letter-spacing: 2px;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    background: rgba(30, 30, 40, 0.95);
    border-radius: 1.5rem;
    padding: 2.5rem 3rem;
    width: 400px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.7);
    transition: all 0.3s ease;
    animation: ${float} 8s ease-in-out infinite;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 15px 40px rgba(0, 0, 0, 0.8);
    }
  }

  input {
    padding: 12px;
    font-weight: 500;
    font-size: 1rem;
    background-color: rgba(255, 255, 255, 0.05);
    color: #f0f0f0;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 1rem;
    transition: all 0.3s ease;

    &:focus {
      border-color: #6c63ff;
      box-shadow: 0 0 10px #6c63ff33;
      outline: none;
      background-color: rgba(255, 255, 255, 0.08);
    }

    &::placeholder {
      color: #aaa;
    }
  }

  button {
    padding: 12px;
    font-weight: bold;
    font-size: 1.1rem;
    cursor: pointer;
    border: none;
    border-radius: 2rem;
    background: #6c63ff;
    color: #fff;
    text-transform: uppercase;
    transition: all 0.3s ease;

    &:hover {
      background: #574fd6;
      transform: scale(1.05);
    }
  }

  span {
    color: #ccc;
    text-align: center;

    a {
      color: #6c63ff;
      font-weight: bold;
      margin-left: 0.3rem;
      transition: color 0.3s ease;

      &:hover {
        color: #9a8fff;
      }
    }
  }
`;

export default Register;
