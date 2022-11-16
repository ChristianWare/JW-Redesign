import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useReducer, useEffect } from "react";
import { useRouter } from "next/router";
import { getError } from "../../../utils/error";
import Link from "next/link";
import Layout from "../../../components/layout/Layout";
import styles from "../../../styles/AdminProductEditScreen.module.css";
import Button2 from "../../../components/button2/Button2";
import Button from "../../../components/button/Button";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };

    case "UPDATE_REQUEST":
      return { ...state, loadingUpdate: true, errorUpdate: "" };
    case "UPDATE_SUCCESS":
      return { ...state, loadingUpdate: false, errorUpdate: "" };
    case "UPDATE_FAIL":
      return { ...state, loadingUpdate: false, errorUpdate: action.payload };

    case "UPLOAD_REQUEST":
      return { ...state, loadingUpload: true, errorUpload: "" };
    case "UPLOAD_SUCCESS":
      return {
        ...state,
        loadingUpdate: false,
        errorUpload: "",
      };
    case "UPLOAD_FAIL":
      return { ...state, loadingUpload: false, errorUpload: action.payload };
    default:
      return state;
  }
}

export default function AdminProductEditScreen() {
  const { query } = useRouter();
  const productId = query.id;
  const [{ loading, error, loadingUpdate, loadingUpload }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: "",
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/admin/products/${productId}`);
        dispatch({ type: "FETCH_SUCCESS" });
        setValue("name", data.name);
        setValue("slug", data.slug);
        setValue("price", data.price);
        setValue("image", data.image);
        // setValue("category", data.category);
        // setValue("brand", data.brand);
        setValue("countInStock", data.countInStock);
        setValue("description", data.description);
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    fetchData();
  }, [productId, setValue]);

  const router = useRouter();

  const uploadHandler = async (e, imageFeild = "image") => {
    const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`;
    try {
      dispatch({ type: "UPLOAD_REQUEST" });
      const {
        data: { signature, timestamp },
      } = await axios("/api/admin/cloudinary-sign");

      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("signature", signature);
      formData.append("timestamp", timestamp);
      formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);
      const { data } = await axios.post(url, formData);
      dispatch({ type: "UPLOAD_SUCCESS" });
      setValue(imageFeild, data.secure_url);
      toast.success("File Uploaded Successfully");
    } catch (err) {
      dispatch({ type: "UPLOAD_FAIL", payload: getError(err) });
      toast.error(getError(err));
    }
  };

  const submitHandler = async ({
    name,
    slug,
    price,
    // category,
    image,
    // brand,
    countInStock,
    description,
  }) => {
    try {
      dispatch({ type: "UPDATE_REQUEST" });
      await axios.put(`/api/admin/products/${productId}`, {
        name,
        slug,
        price,
        // category,
        image,
        // brand,
        countInStock,
        description,
      });
      dispatch({ type: "UPDATE_SUCCESS" });
      toast.success("Product updated successfully");
      router.push("/admin/products");
    } catch (err) {
      dispatch({ type: "UPDATE_FAIL", payload: getError(err) });
      toast.error(getError(err));
    }
  };

  return (
    <Layout title='Edit Product'>
      <div className={styles.content}>
        <ul className={styles.leftNavOptions}>
          <li className={styles.menuLink}>
            <Link href='/admin/dashboard'>
              <a>Dashboard</a>
            </Link>
          </li>
          <li className={styles.menuLink}>
            <Link href='/admin/orders'>Orders</Link>
          </li>
          <li className={styles.activeLink}>
            <Link href='/admin/products'>Products: (Edit)</Link>
          </li>
          <li className={styles.menuLink}>
            <Link href='/admin/users'>Users</Link>
          </li>
        </ul>
        <div>
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className='alert-error'>{error}</div>
          ) : (
            <form onSubmit={handleSubmit(submitHandler)}>
              <h1 className={styles.title}>{`Edit product: ${productId}`}</h1>
              <div className={styles.labelInputBox}>
                <label htmlFor='name'>Name</label>
                <input
                  type='text'
                  id='name'
                  autoFocus
                  {...register("name", {
                    required: "Please enter name",
                  })}
                />
                {errors.name && (
                  <div className='text-red-500'>{errors.name.message}</div>
                )}
              </div>
              <div className={styles.labelInputBox}>
                <label htmlFor='slug'>Slug</label>
                <input
                  type='text'
                  id='slug'
                  {...register("slug", {
                    required: "Please enter slug",
                  })}
                />
                {errors.slug && (
                  <div className='text-red-500'>{errors.slug.message}</div>
                )}
              </div>
              <div className={styles.labelInputBox}>
                <label htmlFor='price'>Price</label>
                <input
                  type='text'
                  id='price'
                  {...register("price", {
                    required: "Please enter price",
                  })}
                />
                {errors.price && (
                  <div className='text-red-500'>{errors.price.message}</div>
                )}
              </div>
              <div className={styles.labelInputBox}>
                <label htmlFor='image'>Image</label>
                <input
                  type='text'
                  id='image'
                  {...register("image", {
                    required: "Please enter image",
                  })}
                />
                {errors.image && (
                  <div className='text-red-500'>{errors.image.message}</div>
                )}
              </div>
              <div className={styles.labelInputBox}>
                <label htmlFor='imageFile'>Upload Image</label>
                <input type='file' id='imageFile' onChange={uploadHandler} />
                {loadingUpload && <div>Uploading...</div>}
              </div>
              {/* <div className={styles.labelInputBox}>
                <label htmlFor='category'>Category</label>
                <input
                  type='text'
                  id='category'
                  {...register("category", {
                    required: "Please enter category",
                  })}
                />
                {errors.category && (
                  <div className='text-red-500'>{errors.category.message}</div>
                )}
              </div> */}
              {/* <div className={styles.labelInputBox}>
                <label htmlFor='brand'>Brand</label>
                <input
                  type='text'
                  id='brand'
                  {...register("brand", {
                    required: "Please enter brand",
                  })}
                />
                {errors.brand && (
                  <div className='text-red-500'>{errors.brand.message}</div>
                )}
              </div> */}
              <div className={styles.labelInputBox}>
                <label htmlFor='countInStock'>Count In Stock</label>
                <input
                  type='text'
                  id='countInStock'
                  {...register("countInStock", {
                    required: "Please enter countInStock",
                  })}
                />
                {errors.countInStock && (
                  <div className='text-red-500'>
                    {errors.countInStock.message}
                  </div>
                )}
              </div>
              <div className={styles.labelInputBox}>
                <label htmlFor='description'>Description</label>
                <input
                  type='text'
                  id='description'
                  {...register("description", {
                    required: "Please enter description",
                  })}
                />
                {errors.description && (
                  <div className='text-red-500'>
                    {errors.description.message}
                  </div>
                )}
              </div>
              <div className={styles.btnContainer}>
                <Button2
                  text={loadingUpdate ? "Loading" : "Update"}
                  btnType='orange'
                />
                <Button text='back' btnType='primary' href='/admin/products' />
              </div>
            </form>
          )}
        </div>
      </div>
    </Layout>
  );
}

AdminProductEditScreen.auth = { adminOnly: true };
