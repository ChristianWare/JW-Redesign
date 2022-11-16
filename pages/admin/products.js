import { toast } from "react-toastify";
import axios from "axios";
import Link from "next/link";
import { useEffect, useReducer } from "react";
import { getError } from "../../utils/error";
import { useRouter } from "next/router";
import Layout from "../../components/layout/Layout";
import styles from "../../styles/AdminProducts.module.css";
import Button2 from "../../components/button2/Button2";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, products: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };

    case "CREATE_REQUEST":
      return { ...state, loadingCreate: true };
    case "CREATE_SUCCESS":
      return { ...state, loadingCreate: false };
    case "CREATE_FAIL":
      return { ...state, loadingCreate: false };

    case "DELETE_REQUEST":
      return { ...state, loadingDelete: true };
    case "DELETE_SUCCESS":
      return { ...state, loadingDelete: false, successDelete: true };
    case "DELETE_FAIL":
      return { ...state, loadingDelete: false };
    case "DELETE_RESET":
      return { ...state, loadingDelete: false, successDelete: false };
    default:
      state;
  }
}

export default function AdminProductsScreen() {
  const router = useRouter();

  const [
    { loading, error, products, loadingCreate, successDelete, loadingDelete },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    products: [],
    error: "",
  });

  const createHandler = async () => {
    if (!window.confirm("Are you sure?")) {
      return;
    }
    try {
      dispatch({ type: "CREATE_REQUEST" });
      const { data } = await axios.post(`/api/admin/products`);
      dispatch({ type: "CREATE_SUCCESS" });
      toast.success("Product created successfully");
      router.push(`/admin/product/${data.product._id}`);
    } catch (err) {
      dispatch({ type: "CREATE_FAIL" });
      toast.error(getError(err));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/admin/products`);
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };

    if (successDelete) {
      dispatch({ type: "DELETE_RESET" });
    } else {
      fetchData();
    }
  }, [successDelete]);

  const deleteHandler = async (productId) => {
    if (!window.confirm("Are you sure?")) {
      return;
    }
    try {
      dispatch({ type: "DELETE_REQUEST" });
      await axios.delete(`/api/admin/products/${productId}`);
      dispatch({ type: "DELETE_SUCCESS" });
      toast.success("Product deleted successfully");
    } catch (err) {
      dispatch({ type: "DELETE_FAIL" });
      toast.error(getError(err));
    }
  };

  return (
    <Layout title='Products'>
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
            <Link href='/admin/products'>Products</Link>
          </li>
          <li className={styles.menuLink}>
            <Link href='/admin/users'>Users</Link>
          </li>
        </ul>
        <div>
          <div className='flex justify-between'>
            <h1 className={styles.title}>Products</h1>
            {loadingDelete && <div>Deleting Item</div>}
            {/* <button disabled={loadingCreate} onClick={createHandler}>
              {loadingCreate ? "Loading" : "Create"}
            </button> */}
            <div className={styles.btnContainer}>
              <Button2
                text={loadingCreate ? "Loading" : "Create"}
                btnType='orange'
                onClick={createHandler}
              />
            </div>
          </div>
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className='alert-error'>{error}</div>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>PRICE</th>
                  <th>COUNT</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id} className='border-b'>
                    <td>{product._id.substring(20, 24)}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.countInStock}</td>
                    <td>
                      <Link href={`/admin/product/${product._id}`} passHref>
                        <a className={styles.edit}>Edit</a>
                      </Link>
                      &nbsp;
                      <p
                        onClick={() => deleteHandler(product._id)}
                        className={styles.delete}
                      >
                        Delete
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </Layout>
  );
}

AdminProductsScreen.auth = { adminOnly: true };
