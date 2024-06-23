import { useForm } from 'react-hook-form'
import {
  Button,
  InputContainer,
  InputField,
  InputLabel,
} from '../../utils/styles'
import styles from './index.module.scss'
export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = () => {
    console.log('hi')
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <InputContainer>
        <InputLabel>Email</InputLabel>
        <InputField
          type="email"
          id="email"
          {...register('email', { required: 'Email is required' })}
        ></InputField>
      </InputContainer>
      <section className={styles.nameFieldRow}>
        <InputContainer>
          <InputLabel>First Name</InputLabel>
          <InputField
            type="text"
            id="firstName"
            {...register('Frist Name', { required: 'First Name is required' })}
          ></InputField>
        </InputContainer>
        <InputContainer>
          <InputLabel>Last Name</InputLabel>
          <InputField
            type="text"
            id="lastName"
            {...register('Last Name', { required: 'Last Name is required' })}
          ></InputField>
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
