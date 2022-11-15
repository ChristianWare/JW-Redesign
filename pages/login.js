import Link from "next/link";
import React, { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { getError } from "../utils/error";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import styles from "../styles/Login.module.css";
import Button2 from "../components/button2/Button2";
import Layout from "../components/layout/Layout";

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
    formState: { errors },
  } = useForm();
  const submitHandler = async ({ email, password }) => {
    try {
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
    <Layout title='Login'>
      <div className={styles.container}>
        <h1>LOGIN</h1>
        <form onSubmit={handleSubmit(submitHandler)}>
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
              autoFocus
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
              autoFocus
            ></input>
            {errors.password && (
              <div className='text-red-500 '>{errors.password.message}</div>
            )}
          </div>
          <div className={styles.btnContainer}>
            <Button2 text='Login' btnType='orange' />
            {/* <Button text='Register' btnType='orange' iconColor='whiteIcon' href='/register' /> */}
          </div>
          <div className={styles.loginBtn}>
            Don't have an account? &nbsp;
            <Link href='/register'>
              <span>Register</span>
            </Link>
          </div>
        </form>
      </div>
    </Layout>
  );
}
