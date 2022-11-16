import axios from "axios";
import { useReducer, useEffect } from "react";
import Link from "next/link";
import { getError } from "../../utils/error";
import Layout from "../../components/layout/Layout";
import styles from "../../styles/Dashboard.module.css";

export const option = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
  },
};

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, summary: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      state;
  }
}

function AdminDashboardScreen() {
  const [{ loading, error, summary }, dispatch] = useReducer(reducer, {
    loading: true,
    summary: { salesData: [] },
    error: "",
  });
  console.log(summary);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/admin/summary`);
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    fetchData();
  }, []);

  const data = {
    labels: summary.salesData.map((x) => x._id),
    datasets: [
      {
        label: "Sales",
        backgroundColor: "rgba(162, 222, 208, 1)",
        data: summary.salesData.map((x) => x.totalSales),
      },
    ],
  };

  return (
    <Layout title='Admin Dashboard'>
      <div className={styles.content}>
        <ul className={styles.leftNavOptions}>
          <li className={styles.activeLink}>
            <Link href='/admin/dashboard'>
              <a>Dashboard</a>
            </Link>
          </li>
          <li className={styles.menuLink}>
            <Link href='/admin/orders'>Orders</Link>
          </li>
          <li className={styles.menuLink}>
            <Link href='/admin/products'>Products</Link>
          </li>
          <li className={styles.menuLink}>
            <Link href='/admin/users'>Users</Link>
          </li>
        </ul>
        <div>
          <h1 className={styles.title}>Admin Dashboard</h1>
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className='alert-error'>{error}</div>
          ) : (
            <div>
              <div className={styles.infoItemGrid}>
                <div className={styles.infoItem}>
                  <h4>${summary.ordersPrice}</h4>
                  <h6>Sales</h6>
                  <Link href='/admin/orders'>
                    <a className={styles.view}>View Sales</a>
                  </Link>
                </div>
                <div className={styles.infoItem}>
                  <h4>{summary.ordersCount}</h4>
                  <h6>Orders</h6>
                  <Link href='/admin/orders'>
                    <a className={styles.view}>View Orders</a>
                  </Link>
                </div>
                <div className={styles.infoItem}>
                  <h4>{summary.productsCount}</h4>
                  <h6>Products</h6>
                  <Link href='/admin/products'>
                    <a className={styles.view}>View Products</a>
                  </Link>
                </div>
                <div className={styles.infoItem}>
                  <h4>{summary.usersCount}</h4>
                  <h6>Users</h6>
                  <Link href='/admin/users'>
                    <a className={styles.view}>View Users</a>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

AdminDashboardScreen.auth = { adminOnly: true };
export default AdminDashboardScreen;
