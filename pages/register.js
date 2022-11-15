import axios from "axios";
import Link from "next/link";
import React, { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import Layout from "../components/layout/Layout";
import { getError } from "../utils/error";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import styles from "../styles/Register.module.css";
import Button from "../components/button/Button";

export default function LoginScreen() {
  const { data: session } = useSession();

  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || "/");
    }
  }, [router, session, redirect]);

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();
  const submitHandler = async ({ name, email, password }) => {
    try {
      await axios.post("/api/auth/signup", {
        name,
        email,
        password,
      });
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (result.error) {
        toast.error(result.error);
      }
    } catch (err) {
      toast.error(getError(err));
    }
  };
  return (
    <Layout title='Create Account'>
      <div className={styles.container}>
        <form onSubmit={handleSubmit(submitHandler)}>
          <h1>Create Account</h1>
          <div className={styles.labelInputBox}>
            <label htmlFor='name'>Name</label>
            <input
              type='text'
              id='name'
              autoFocus
              {...register("name", {
                required: "Please enter name",
              })}
            ></input>
            {errors.name && (
              <div className='text-red-500'>{errors.name.message}</div>
            )}
          </div>
          <div className={styles.labelInputBox}>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              {...register("email", {
                required: "Please enter email",
                pattern: {
                  value: /^[A-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                  message: "Please enter valid email",
                },
              })}
              id='email'
            ></input>
            {errors.email && (
              <div className='text-red-500'>{errors.email.message}</div>
            )}
          </div>
          <div className={styles.labelInputBox}>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              {...register("password", {
                required: "Please enter password",
                minLength: {
                  value: 6,
                  message: "password is more than 5 chars",
                },
              })}
              id='password'
            ></input>
            {errors.password && (
              <div className='text-red-500 '>{errors.password.message}</div>
            )}
          </div>
          <div className={styles.labelInputBox}>
            <label htmlFor='confirmPassword'>Confirm Password</label>
            <input
              type='password'
              id='confirmPassword'
              {...register("confirmPassword", {
                required: "Please enter confirmed password",
                validate: (value) => value === getValues("password"),
                minLength: {
                  value: 6,
                  message: "confirm password is more than 5 chars",
                },
              })}
            ></input>
            {errors.confirmPassword && (
              <div className='text-red-500 '>
                {errors.confirmPassword.message}
              </div>
            )}
            {errors.confirmPassword &&
              errors.confirmPassword.type === "validate" && (
                <div className='text-red-500'>Passwords do not match</div>
              )}
          </div>
          <div className={styles.btnContainer}>
            <Button
              text='Register'
              href='/register'
              btnType='orange'
              iconColor='whiteIcon'
            />
          </div>
          <div className={styles.loginBtn}>
            Already have an account? &nbsp;
            <Link href='/login'>
              <span>Login</span>
            </Link>
          </div>
        </form>
      </div>
    </Layout>
  );
}
