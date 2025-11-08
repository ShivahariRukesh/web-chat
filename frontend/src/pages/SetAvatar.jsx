import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";

import { toji, gojo, sukuna, meimei, genjaku } from "../assets/index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { setAvatarRoute } from "../utils/ApiRoutes";

function SetAvatar() {
  const navigate = useNavigate();
  const avatars = [toji, gojo, sukuna, meimei, genjaku];
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  const toastOptions = {
    position: "top-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/login");
    }
  }, [navigate]);

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastOptions);
      return;
    }
    try {
      const user = JSON.parse(localStorage.getItem("chat-app-user"));
      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar],
      });

      user.isAvatarImageSet = true;
      user.avatarImage = avatars[selectedAvatar];
      localStorage.setItem("chat-app-user", JSON.stringify(user));
      navigate("/");
    } catch (err) {
      toast.error("An error occurred while setting the avatar", toastOptions);
    }
  };

  return (
    <Container>
      <div className="title-container">
        <h1>Pick an avatar</h1>
      </div>
      <div className="avatars">
        {avatars.map((avatar, index) => (
          <div
            key={index}
            className={`avatar ${selectedAvatar === index ? "selected" : ""}`}
            onClick={() => setSelectedAvatar(index)}
          >
            <img src={avatar} alt="avatar" />
          </div>
        ))}
      </div>
      <button className="submit-btn" onClick={setProfilePicture}>
        Select
      </button>
      <ToastContainer />
    </Container>
  );
}

export default SetAvatar;

// Animations
const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const fadeIn = keyframes`
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  height: 100vh;
  width: 100vw;
  background-color: #131324;
  animation: ${fadeIn} 0.8s ease forwards;

  .title-container h1 {
    color: white;
    text-align: center;
  }

  .avatars {
    display: flex;
    gap: 2rem;

    .avatar {
      border: 0.4rem solid transparent;
      border-radius: 50%;
      padding: 0.5rem;
      transition: all 0.4s ease-in-out;
      cursor: pointer;
      animation: ${float} 4s ease-in-out infinite;

      img {
        height: 6rem;
        border-radius: 50%;
        transition: transform 0.3s ease-in-out;
      }

      &:hover img {
        transform: scale(1.1);
      }
    }

    .selected {
      border: 0.4rem solid #4e0eff; // accent color
      box-shadow: 0 0 20px #4e0eff;
      transform: scale(1.1);
    }
  }

  .submit-btn {
    font-weight: bold;
    font-family: "Courier New", Courier, monospace;
    font-size: 1rem;
    padding: 10px 30px;
    cursor: pointer;
    border: none;
    border-radius: 4rem;
    background-color: #4e0eff;
    color: white;
    text-transform: uppercase;
    transition: all 0.4s ease-in-out;

    &:hover {
      background-color: #3a00c4;
      transform: scale(1.05);
    }
  }

  @media screen and (max-width: 768px) {
    .avatars {
      flex-wrap: wrap;
      justify-content: center;
      gap: 1rem;

      .avatar img {
        height: 4.5rem;
      }
    }
  }
`;
