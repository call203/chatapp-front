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
import { useState } from "react";
import { useMutation } from "react-query";
export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    clearErrors,
    trigger,
    formState: { errors }
  } = useForm<CreateUserParams>({ shouldFocusError: false });
  const [error, setError] = useState<null | string>();

  const navigate = useNavigate();
  const { mutate: postRegisterUserMutate } = useMutation(postRegisterUser, {
    onSuccess: async () => {
      navigate("/login");
    },
    onError: (err: { response: { data: { message: string } } }) => {
      console.log(err?.response?.data?.message);
      if (err?.response?.data?.message) {
        setError(err?.response?.data?.message);
      }
    }
  });

  const onSubmit = async (data: CreateUserParams) => {
    postRegisterUserMutate(data);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <InputContainer>
        <InputLabel htmlFor="email">Email</InputLabel>
        <InputField
          type="email"
          id="email"
          {...register("email", { required: "Email is required" })}
          onFocus={() => clearErrors("email")}
          onBlur={async () => {
            trigger("email");
            setError(null);
          }}
        ></InputField>
      </InputContainer>
      <section className={styles.nameFieldRow}>
        <InputContainer>
          <InputLabel htmlFor="firstName">First Name</InputLabel>
          <InputField
            type="text"
            id="firstName"
            {...register("firstName", { required: "First Name is required" })}
            onFocus={() => clearErrors("firstName")}
            onBlur={async () => {
              trigger("firstName");
              setError(null);
            }}
          ></InputField>
        </InputContainer>
        <InputContainer>
          <InputLabel htmlFor="lastName">Last Name</InputLabel>
          <InputField
            type="text"
            id="lastName"
            {...register("lastName", { required: "Last Name is required" })}
            onFocus={() => clearErrors("lastName")}
            onBlur={async () => {
              trigger("lastName");
              setError(null);
            }}
          ></InputField>
        </InputContainer>
      </section>
      <InputContainer>
        <InputLabel htmlFor="password">Password</InputLabel>
        <InputField
          type="password"
          id="password"
          {...register("password", { required: "Password is required" })}
          onFocus={() => clearErrors("password")}
          onBlur={async () => {
            trigger("password");
            setError(null);
          }}
        ></InputField>
      </InputContainer>
      <div className="py-1 text-red-500">
        <div>{errors.email?.message}</div>
        <div>{errors.firstName?.message}</div>
        <div>{errors.lastName?.message}</div>
        <div>{errors.password?.message}</div>
        <div>{error}</div>
      </div>
      <Button id="signup">Sign Up</Button>
    </form>
  );
};
