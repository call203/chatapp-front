import { useForm } from "react-hook-form";
import {
  Button,
  InputContainer,
  InputField,
  InputLabel
} from "../../utils/styles";
import styles from "./index.module.scss";
import { CreateUserParams } from "../../utils/types";
import { postRegisterUser } from "../../utils/apis/apis";
import { useNavigate } from "react-router-dom";
export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateUserParams>();

  const navigate = useNavigate();

  const onSubmit = async (data: CreateUserParams) => {
    console.log(data);
    try {
      await postRegisterUser(data);
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <InputContainer>
        <InputLabel>Email</InputLabel>
        <InputField
          type="email"
          id="email"
          {...register("email", { required: "Email is required" })}
        ></InputField>
      </InputContainer>
      <section className={styles.nameFieldRow}>
        <InputContainer>
          <InputLabel>First Name</InputLabel>
          <InputField
            type="text"
            id="firstName"
            {...register("firstName", { required: "First Name is required" })}
          ></InputField>
        </InputContainer>
        <InputContainer>
          <InputLabel>Last Name</InputLabel>
          <InputField
            type="text"
            id="lastName"
            {...register("lastName", { required: "Last Name is required" })}
          ></InputField>
        </InputContainer>
      </section>
      <InputContainer>
        <InputLabel>Password</InputLabel>
        <InputField
          type="password"
          id="password"
          {...register("password", { required: "Password is required" })}
        ></InputField>
      </InputContainer>
      <Button>Sign Up</Button>
    </form>
  );
};
