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
          <div className="contacts-header">
            <h3>
              Your Contacts
            </h3>
            <div className="current-user">
              <div className="avatar">
                <img src={currentUserImage} alt="" />
              </div>

            </div>
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
  gap: 2rem;
  overflow-x: hidden;
  overflow-y: hidden;
  border-radius : 2%;
  height:81vh;
   background: linear-gradient(to bottom, #1a1a1a, #424040);
  animation: ${fadeInUp} 0.6s ease forwards;

  .contacts-header {
    display: flex;
    border-bottom : 2px solid white;
    border-radius : 5%;
    align-items: center;
    justify-content: space-evenly;
    gap: 2rem;

    .avatar {
      transition: transform 0.3s ease;
      &:hover {
        transform: scale(1.1);
      }
    }
      img{
      width : 4rem;

      }
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }

  .contacts {
    display: flex;
    padding-top: 1rem;
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
      background-color: #363534;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 1rem;
      padding: 0.5rem;
      padding-right : 3rem;
      display: flex;
      align-items: center;
      justify-content : space-between;
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
        background-color: #545352;
        box-shadow: 0 0 10px white;
      }
    }

    .selected {
      background-color: #adacac;
      transform: scale(1.05);
      box-shadow: 0 0 15px #cfcdcc;
    }
  }

  .current-user {
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
