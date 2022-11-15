import { useContext, useEffect } from "react";
import { Store } from "../utils/Store";
import Layout from "../components/layout/Layout";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const shippingPage = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();

  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { shippingAddress } = cart;
  const router = useRouter();

  useEffect(() => {
    setValue("fullName", shippingAddress.fullName);
    setValue("address", shippingAddress.address);
    setValue("city", shippingAddress.city);
    setValue("postalCode", shippingAddress.postalCode);
    setValue("country", shippingAddress.country);
  }, [setValue, shippingAddress]);

  const sumbitHandler = ({ fullName, address, city, postalCode, country }) => {
    dispatch({
      type: "SAVE_SHIPPING_ADDRESS",
      payload: { fullName, address, city, postalCode, country },
    });
    Cookies.set(
      "cart",
      JSON.stringify({
        ...cart,
        shippingAddress: {
          fullName,
          address,
          city,
          postalCode,
          country,
        },
      })
    );
    router.push("/payment");
  };

  return (
    <Layout title='Shipping'>
      <h1>ENTER SHIPPING ADDRESS:</h1>
      <form onSubmit={handleSubmit(sumbitHandler)}>
        <div>
          <label htmlFor='fullname'>Full Name</label>
          <input
            id='fullName'
            autoFocus
            {...register("fullName", {
              required: "Please enter full name",
            })}
          />
          {errors.fullname && (
            <div className='text-red-500'>{errors.fullname.message}</div>
          )}
          <label htmlFor='address'>Address</label>
          <input
            id='address'
            autoFocus
            {...register("address", {
              required: "Please enter address",
              minLength: { value: 3, message: "Address is more than 2 chars" },
            })}
          />
          {errors.fullname && (
            <div className='text-red-500'>{errors.address.message}</div>
          )}
          <label htmlFor='city'>City</label>
          <input
            id='city'
            autoFocus
            {...register("city", {
              required: "Please enter city",
            })}
          />
          {errors.fullname && (
            <div className='text-red-500'>{errors.city.message}</div>
          )}
          <label htmlFor='postalCode'>Postal Code</label>
          <input
            id='postalCode'
            autoFocus
            {...register("postalCode", {
              required: "Please enter postal code",
            })}
          />
          {errors.fullname && (
            <div className='text-red-500'>{errors.postalCode.message}</div>
          )}
          <label htmlFor='country'>Country</label>
          <input
            id='country'
            autoFocus
            {...register("country", {
              required: "Please enter country",
            })}
          />
          {errors.fullname && (
            <div className='text-red-500'>{errors.country.message}</div>
          )}
        </div>
        <div>
          <button>Next</button>
        </div>
      </form>
    </Layout>
  );
};
export default shippingPage;
