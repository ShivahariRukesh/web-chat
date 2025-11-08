import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import Logo from "../assets/logo.png";

const Contacts = ({ contacts, changeChat }) => {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await JSON.parse(localStorage.getItem("chat-app-user"));
        setCurrentUserName(data.username);
        setCurrentUserImage(data.avatarImage);
      } catch (err) {
        console.log("Error in Contacts:", err);
      }
    };
    fetchUser();
  }, []);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <>
      {currentUserImage && currentUserName && (
        <Container>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h3>Hellow!</h3>
          </div>
          <div className="contacts">
            {contacts.map((item, index) => (
              <div
                key={index}
                className={`contact ${index === currentSelected ? "selected" : ""}`}
                onClick={() => changeCurrentChat(index, item)}
              >
                <div className="avatar">
                  <img src={item.avatarImage} alt="" />
                </div>
                <div className="username">
                  <h3>{item.username}</h3>
                </div>
              </div>
            ))}
          </div>
          <div className="current-user">
            <div className="avatar">
              <img src={currentUserImage} alt="" />
            </div>
            <div className="username">
              <h3>{currentUserName}</h3>
            </div>
          </div>
        </Container>
      )}
    </>
  );
};

export default Contacts;

// Animations
const fadeInUp = keyframes`
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
`;

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #080420;
  animation: ${fadeInUp} 0.6s ease forwards;

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 2.5rem;
      transition: transform 0.3s ease;
      &:hover {
        transform: scale(1.1);
      }
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }

  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
    gap: 1rem;
    padding-right: 0.5rem;

    &::-webkit-scrollbar {
      width: 0.2rem;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #4e0eff80;
      border-radius: 1rem;
    }

    .contact {
      background-color: #1a1a2e;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 1rem;
      padding: 0.5rem;
      display: flex;
      align-items: center;
      gap: 1rem;
      transition: all 0.3s ease-in-out;
      opacity: 0;
      animation: ${fadeInUp} 0.5s ease forwards;
      animation-delay: 0.1s;

      .avatar img {
        height: 3rem;
        border-radius: 50%;
        transition: transform 0.3s ease;
      }

      .username h3 {
        color: white;
      }

      &:hover {
        transform: scale(1.03);
        background-color: #4e0eff20;
        box-shadow: 0 0 10px #4e0eff60;
      }
    }

    .selected {
      background-color: #4e0eff50;
      transform: scale(1.05);
      box-shadow: 0 0 15px #4e0eff80;
    }
  }

  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    padding: 0.5rem;
    border-radius: 1rem;

    .avatar img {
      height: 4rem;
      border-radius: 50%;
    }

    .username h3 {
      color: white;
      text-align: center;
    }

    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username h3 {
        font-size: 1rem;
      }
    }
  }
`;
