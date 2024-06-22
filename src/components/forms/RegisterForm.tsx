import {
  Button,
  InputContainer,
  InputField,
  InputLabel,
} from '../../utils/styles'
import styles from './index.module.scss'
export const RegisterForm = () => {
  return (
    <form className={styles.form}>
      <InputContainer>
        <InputLabel>Email</InputLabel>
        <InputField type="email" id="email"></InputField>
      </InputContainer>
      <section className={styles.nameFieldRow}>
        <InputContainer>
          <InputLabel>First Name</InputLabel>
          <InputField type="text" id="firstName"></InputField>
        </InputContainer>
        <InputContainer>
          <InputLabel>Last Name</InputLabel>
          <InputField type="text" id="lastName"></InputField>
        </InputContainer>
      </section>
      <InputContainer>
        <InputLabel>Password</InputLabel>
        <InputField type="password" id="password"></InputField>
      </InputContainer>
      <Button>Sign Up</Button>
    </form>
  )
}
