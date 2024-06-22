import { Link } from 'react-router-dom'
import {
  Button,
  InputContainer,
  InputField,
  InputLabel,
} from '../../utils/styles'
import styles from './index.module.scss'
export const LoginForm = () => {
  return (
    <form className={styles.form}>
      <InputContainer>
        <InputLabel>Email</InputLabel>
        <InputField type="email" id="email"></InputField>
      </InputContainer>
      <InputContainer className={styles.loginFormPassword}>
        <InputLabel>Password</InputLabel>
        <InputField type="password" id="password"></InputField>
      </InputContainer>
      <Button>Login</Button>
      <div className={styles.footerText}>
        <span>don't have an account?</span>
        <Link to="/">Register</Link>
      </div>
    </form>
  )
}
