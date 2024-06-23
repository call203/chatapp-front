import styled from 'styled-components'
import { PageProps } from './styleTypes'
export const InputLabel = styled.label`
  color: #8f8f8f;
  font-size: 14px;
  display: block;
`
export const InputField = styled.input`
  padding-top: 10px;
  font-family: 'Inter';
  color: #ffffff;
  font-size: 18px;
  width: 100%;
  box-sizing: border-box;
  background-color: inherit;
  border: none;
  outline: none;
`
export const InputContainer = styled.div`
  padding: 14px 16px;
  background-color: #131313;
  border-radius: 10px;
  width: 100%;
  box-sizing: border-box;
`
export const Button = styled.button`
  width: 100%;
  background-color: #2b09ff;
  color: #ffffff;
  font-size: 18px;
  font-family: 'Inter';
  border: none;
  outline: none;
  border-radius: 10px;
  padding: 20px 0;
  margin-top: 10px;
  &:hover {
    cursor: pointer;
    background-color: #3415ff;
  }
  &:active {
    background-color: #3a1cff;
  }
`

export const Page = styled.div<PageProps>`
  height: 100%;
  display: ${(props) => props.display};
  justify-content: ${(props) => props.justifyContent};
  align-items: ${(props) => props.alignItems};
`
