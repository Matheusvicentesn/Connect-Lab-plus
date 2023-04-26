import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export const Spinner = styled.div`
 display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  
  &::before {
    content: "";
    box-sizing: border-box;
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 60px;
    height: 60px;
    margin-top: -30px;
    margin-left: -30px;
    border-radius: 50%;
    border: 6px solid #ccc;
    border-top-color: #3498db;
    animation: ${spin} 1s ease-in-out infinite;
  }
`;

