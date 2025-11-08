import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import Picker from "emoji-picker-react";
import { BsEmojiSmileFill } from "react-icons/bs";

const ChatInput = ({ handleSendMsg }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState("");

  const handleEmojiPickerHideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (emojiObject) => {
    setMsg((prevMsg) => prevMsg + emojiObject.emoji);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <Container>
      <div className="button-container">
        <div className="emoji-container">
          <BsEmojiSmileFill
            color="black"
            className={`emoji-icon ${showEmojiPicker ? "active" : ""}`}
            onClick={handleEmojiPickerHideShow}
          />
          {showEmojiPicker && (
            <EmojiPickerWrapper>
              <Picker onEmojiClick={handleEmojiClick} />
            </EmojiPickerWrapper>
          )}
        </div>
      </div>

      <form className="input-container" onSubmit={sendChat}>
        <input
          type="text"
          placeholder="Type your message..."
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button type="submit" className="send-btn">
          Send
        </button>
      </form>
    </Container>
  );
};

export default ChatInput;

// Animation for emoji picker
const slideUpScale = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px) scale(0.8);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const EmojiPickerWrapper = styled.div`
  position: absolute;
  bottom: 60px; /* adjust so it appears above emoji button */
  left: 0;
  z-index: 1000;
  animation: ${slideUpScale} 0.3s ease forwards;

  .emoji-picker-react {
    background-color: #131324 !important;
    border: 1px solid #9a86f3 !important;
    border-radius: 1rem !important;
    box-shadow: 0 5px 20px #9a86f3aa !important;

    .emoji-scroll-wrapper::-webkit-scrollbar {
      width: 5px;
      &-thumb {
        background-color: #9a86f3;
        border-radius: 10px;
      }
    }

    .emoji-search {
      background-color: #080420 !important;
      border-color: #9a86f3 !important;
      color: white !important;
    }

    .emoji-categories button {
      filter: contrast(1) !important;
    }

    .emoji-group:before {
      background-color: #080420 !important;
    }
  }
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 5% 95%;
  align-items: center;
  padding: 0 2rem;
  background-color: #616060;
  position: relative;

  .button-container {
    display: flex;
    align-items: center;
    justify-content: center;

    .emoji-container {
      position: relative;

      .emoji-icon {
        font-size: 1.8rem;
        color: #ffff00c8;
        cursor: pointer;
        transition: transform 0.3s ease, color 0.3s ease;
      }

      .emoji-icon:hover {
        transform: scale(1.2) rotate(10deg);
        color: #ffd700;
      }

      .emoji-icon.active {
        transform: rotate(20deg) scale(1.2);
        color: #ffea00;
      }
    }
  }

  .input-container {
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 100%;
    background-color: #403f3f;
    border-radius: 2rem;
    padding: 0.5rem 1rem;
    box-shadow: 0 0 10px white;

    input {
      width: 100%;
      background: transparent;
      border: none;
      color: white;
      font-size: 1rem;
      outline: none;
      &::placeholder {
        color: #d1d1d1;
      }
      &::selection {
        background-color: #9a86f3;
      }
    }

    .send-btn {
      background-color:#f0f0f0;
      border: none;
      border-radius: 25%;
      padding: 0.5rem 0.6rem;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: transform 0.2s ease, box-shadow 0.2s ease;

    

      &:hover {
        transform: scale(1.2);
        box-shadow: 0 0 10px #9a86f3;
      }
    }
  }

  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;

    .input-container {
      gap: 0.5rem;

      .send-btn {
        padding: 0.4rem 0.5rem;
      
      }
    }
  }
`;
