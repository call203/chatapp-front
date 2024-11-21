import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  InputContainer,
  InputField,
  InputLabel
} from "../../utils/styles";
import styles from "./index.module.scss";
import { useForm } from "react-hook-form";
import { LoginParams } from "../../utils/types";
import { postLoginUser } from "../../utils/apis/apis";
import { useMutation } from "react-query";

import { useState } from "react";
export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    clearErrors,
    trigger,
    formState: { errors }
  } = useForm<LoginParams>({ shouldFocusError: false });
  const navigate = useNavigate();
  const [error, setError] = useState<null | string>();

  const { mutate: postLoginUserMutate } = useMutation(postLoginUser, {
    onSuccess: async () => {
      navigate("/conversations");
    },
    onError: (err) => {
      setError("Please check your account");
    }
  });

  const onSubmitLogin = async (data: LoginParams) => {
    postLoginUserMutate(data);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmitLogin)}>
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

      <InputContainer className={styles.loginFormPassword}>
        <InputLabel htmlFor="password">Password</InputLabel>
        <InputField
          type="password"
          id="password"
          {...register("password", { required: "Password is required" })}
          onFocus={() => {
            clearErrors("password");
            setError(null);
          }}
          onBlur={async () => {
            await trigger("password");
          }}
        ></InputField>
      </InputContainer>
      <div className="py-1 text-red-500">
        <div>{errors.email?.message}</div>
        <div>{errors.password?.message}</div>
        <div>{error}</div>
      </div>

      <Button id="login">Login</Button>
      <div className={styles.footerText}>
        <span>don't have an account?</span>
        <Link to="/signup">Register</Link>
      </div>
    </form>
  );
};
