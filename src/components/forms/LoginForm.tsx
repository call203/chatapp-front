import { Link } from 'react-router-dom'
import {
  Button,
  InputContainer,
  InputField,
  InputLabel,
} from '../../utils/styles'
import styles from './index.module.scss'
import { useForm } from 'react-hook-form'
export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmitLogin = () => {
    console.log('hi')
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmitLogin)}>
      <InputContainer>
        <InputLabel>Email</InputLabel>
        <InputField
          type="email"
          id="email"
          {...register('email', { required: 'Email is required' })}
        ></InputField>
      </InputContainer>
      <InputContainer className={styles.loginFormPassword}>
        <InputLabel>Password</InputLabel>
        <InputField
          type="password"
          id="password"
          {...register('email', { required: 'Password is required' })}
        ></InputField>
      </InputContainer>
      <Button>Login</Button>
      <div className={styles.footerText}>
        <span>don't have an account?</span>
        <Link to="/signup">Register</Link>
      </div>
    </form>
  )
}
