import styled from 'styled-components'

const Input = styled.input`
    font-size: 1.3em;
    border-bottom-color: ${({ bbc }) => bbc || '#003333'};
    border-top: none;
    border-left: none;
    border-right: none;
    text-align: center;
    &:focus {
        outline: none;
        cursor:text;
    }
`
const Button = styled.button`
  display: ${({ disp }) => disp || 'inline'};

  border-radius: ${({ borR }) => borR || '50px'};
  border: none;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  margin: ${({ mar }) => mar || '10px'};
  cursor: pointer;
  font-size: 12px;
  font-weight: 400;
  padding: ${({ pd }) => pd || '15px 40px'};
  background-color: ${({ bg }) => bg || '#fff'};
  color: ${({ color }) => color || '#000'};

  &:hover {
    opacity: 0.8;
    background-color: ${({ hbg }) => hbg || '#fff'};
  }
  @media (max-width: ${({ theme }) => theme.mobile}) {
    font-size: 9px;
    margin: 2px ;
    padding: 10px 25px;
    width:  ${({ wid }) => wid || 'auto'}
  }
`

export {Input, Button}
