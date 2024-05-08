import { Link, useNavigate } from "react-router-dom";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import apiClient from "../services/api-client";
import { zodResolver } from "@hookform/resolvers/zod";

const enum Styles {
  Form = "max-w-sm mx-auto",
  Heading = "my-6 text-center text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl",
  Input = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5",
  Background = "mb-5",
  Button = "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full w-auto px-5 py-2.5 text-center",
  Label = "block mb-2 text-sm font-medium text-gray-900",
  Link = "font-medium text-blue-600 hover:underline",
  ErrorMessage = "text-red-600",
}

const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type FormData = z.infer<typeof userSchema>;

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({ resolver: zodResolver(userSchema) });

  const navigate = useNavigate();

  const onSubmit = async (user: FieldValues) => {
    const { data } = await apiClient.auth.signInWithPassword({
      email: user.email,
      password: user.password,
    });
    if (data) navigate("/chat");
  };

  return (
    <>
      <h1 className={Styles.Heading}>Log in</h1>
      <form className={Styles.Form} onSubmit={handleSubmit(onSubmit)}>
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
            Don't have an account?{" "}
            <Link to="/signup" className={Styles.Link}>
              Sign Up
            </Link>
          </div>
        </div>
        <button disabled={!isValid} type="submit" className={Styles.Button}>
          Sign In
        </button>
      </form>
    </>
  );
};

export default LoginPage;
