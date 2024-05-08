import { Link, useNavigate } from "react-router-dom";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import apiClient from "../services/api-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

const enum Styles {
  Form = "max-w-sm mx-auto",
  Heading = "my-6 text-center text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl",
  Input = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5",
  Background = "mb-5",
  Label = "block mb-2 text-sm font-medium text-gray-900",
  Link = "font-medium text-blue-600 hover:underline",
  Button = "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full w-auto px-5 py-2.5 text-center",
  ErrorMessage = "text-red-600",
}

const userSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

type FormData = z.infer<typeof userSchema>;

const SignupPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(userSchema),
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (user: FieldValues) => {
    const { data, error } = await apiClient.auth.signUp({
      email: user.email,
      password: user.password,
      options: {
        data: { username: user.name },
      },
    });

    if (error) return setError(error.message);
    navigate("/chat");
  };

  return (
    <>
      <h1 className={Styles.Heading}>Create Account</h1>
      <form className={Styles.Form} onSubmit={handleSubmit(onSubmit)}>
        <div className={Styles.Background}>
          <label htmlFor="name" className={Styles.Label}>
            Your name
          </label>
          <input
            {...register("name")}
            type="text"
            id="name"
            className={Styles.Input}
          />
        </div>
        <div className={Styles.Background}>
          <label htmlFor="email" className={Styles.Label}>
            Your email
          </label>
          <input
            {...register("email")}
            type="email"
            id="email"
            className={Styles.Input}
          />
          {errors.email && (
            <p className={Styles.ErrorMessage}>{errors.email.message}</p>
          )}
        </div>
        <div className={Styles.Background}>
          <label htmlFor="password" className={Styles.Label}>
            Your password
          </label>
          <input
            {...register("password")}
            type="password"
            id="password"
            className={Styles.Input}
          />
          {errors.password && (
            <p className={Styles.ErrorMessage}>{errors.password.message}</p>
          )}
        </div>
        <div className={Styles.Background}>
          <div className={Styles.Label}>
            Already have an account?{" "}
            <Link to="/login" className={Styles.Link}>
              Sign In
            </Link>
          </div>
        </div>
        <button disabled={!isValid} type="submit" className={Styles.Button}>
          Sign Up
        </button>
      </form>
      {error && (
        <p className="text-red-500 flex justify-center mt-6">{error}</p>
      )}
    </>
  );
};

export default SignupPage;
