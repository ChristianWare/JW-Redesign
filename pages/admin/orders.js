import axios from "axios";
import Link from "next/link";
import { useEffect, useReducer } from "react";
import { getError } from "../../utils/error";
import Layout from "../../components/layout/Layout";
import styles from "../../styles/Orders.module.css";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, orders: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      state;
  }
}

export default function AdminOrderScreen() {
  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    orders: [],
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/admin/orders`);
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    fetchData();
  }, []);

  return (
    <Layout title='Orders'>
      <div className={styles.content}>
        <ul className={styles.leftNavOptions}>
          <li className={styles.menuLink}>
            <Link href='/admin/dashboard'>
              <a>Dashboard</a>
            </Link>
          </li>
          <li className={styles.activeLink}>
            <Link href='/admin/orders'>Orders</Link>
          </li>
          <li className={styles.menuLink}>
            <Link href='/admin/products'>Products</Link>
          </li>
          <li className={styles.menuLink}>
            <Link href='/admin/users'>Users</Link>
          </li>
        </ul>
      </div>
      <div>
        <h1 className={styles.title}>Admin Orders</h1>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className='alert-error'>{error}</div>
        ) : (
          <div className={styles.table}>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>USER</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id.substring(20, 24)}</td>
                    <td>{order.user ? order.user.name : "DELETED USER"}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>${order.totalPrice}</td>
                    <td>
                      {order.isPaid
                        ? `${order.paidAt.substring(0, 10)}`
                        : "not paid"}
                    </td>
                    <td>
                      {order.isDelivered
                        ? `${order.deliveredAt.substring(0, 10)}`
                        : "not delivered"}
                    </td>
                    <td className='p-5'>
                      <Link href={`/order/${order._id}`} passHref>
                        <a className={styles.detailsBtn}>Details</a>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
}

AdminOrderScreen.auth = { adminOnly: true };
