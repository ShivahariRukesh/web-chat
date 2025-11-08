// import React, { useEffect } from "react";
// import styled from "styled-components";
// import Robot from "../assets/robot.gif";

// const Welcome = ({ currentUser }) => {
//   return (
//     <div>
//       <Container>
//         <img src={Robot} alt="Robo" />
//         <h2>
//           Welcome, <span>{currentUser?.username}</span>
//         </h2>
//         <h4>Please Select A chaaat to Commence your message</h4>
//       </Container>
//     </div>
//   );
// };

// export default Welcome;

// const Container = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   color: white;
//   flex-direction: column;
//   img {
//     height: 20rem;
//   }
//   span {
//     color: #4e0eff;
//   }
// `;





import React from "react";
import styled, { keyframes } from "styled-components";
import Robot from "../assets/robot.gif";

const Welcome = ({ currentUser }) => {
  return (
    <Container>
      <img src={Robot} alt="Robo" />
      <h2>
        Welcome, <span>{currentUser?.username}</span>
      </h2>
      <h4>Please select a chat to start messaging</h4>
    </Container>
  );
};

export default Welcome;

// Animations
const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
`;

const fadeIn = keyframes`
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0px); }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  color: #fff;
  height: 100%;
  animation: ${fadeIn} 1.5s ease forwards;

  img {
    height: 20rem;
    animation: ${float} 6s ease-in-out infinite;
    margin-bottom: 2rem;
    border-radius: 1rem;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.6);
  }

  h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
    span {
      color: #6c63ff;
      font-weight: bold;
    }
  }

  h4 {
    font-size: 1.2rem;
    color: #ccc;
    font-weight: 400;
  }

  @media screen and (max-width: 768px) {
    img {
      height: 15rem;
    }
    h2 {
      font-size: 1.5rem;
    }
    h4 {
      font-size: 1rem;
    }
  }
`;
