import axios from "axios";
import Link from "next/link";
import React, { useEffect, useReducer } from "react";
import { toast } from "react-toastify";
import { getError } from "../../utils/error";
import Layout from "../../components/layout/Layout";
import styles from "../../styles/Users.module.css";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, users: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };

    case "DELETE_REQUEST":
      return { ...state, loadingDelete: true };
    case "DELETE_SUCCESS":
      return { ...state, loadingDelete: false, successDelete: true };
    case "DELETE_FAIL":
      return { ...state, loadingDelete: false };
    case "DELETE_RESET":
      return { ...state, loadingDelete: false, successDelete: false };
    default:
      return state;
  }
}

function AdminUsersScreen() {
  const [{ loading, error, users, successDelete, loadingDelete }, dispatch] =
    useReducer(reducer, {
      loading: true,
      users: [],
      error: "",
    });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/admin/users`);
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

  const deleteHandler = async (userId) => {
    if (!window.confirm("Are you sure?")) {
      return;
    }
    try {
      dispatch({ type: "DELETE_REQUEST" });
      await axios.delete(`/api/admin/users/${userId}`);
      dispatch({ type: "DELETE_SUCCESS" });
      toast.success("User deleted successfully");
    } catch (err) {
      dispatch({ type: "DELETE_FAIL" });
      toast.error(getError(err));
    }
  };

  return (
    <Layout title='Users'>
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
          <li className={styles.menuLink}>
            <Link href='/admin/products'>Products</Link>
          </li>
          <li className={styles.activeLink}>
            <Link href='/admin/users'>Users</Link>
          </li>
        </ul>
        <div>
          <h1 className={styles.title}>Users</h1>
          {loadingDelete && <div>Deleting...</div>}
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
                  <th>EMAIL</th>
                  <th>ADMIN</th>
                  {/* <th>ACTIONS</th> */}
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className='border-b'>
                    <td>{user._id.substring(20, 24)}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.isAdmin ? "YES" : "NO"}</td>
                    {/* <td>
                      <Link href={`/admin/user/${user._id}`} passHref>
                        <a className={styles.edit}>Edit</a>
                      </Link>
                      &nbsp;
                      <p
                        className={styles.delete}
                        onClick={() => deleteHandler(user._id)}
                      >
                        Delete
                      </p>
                    </td> */}
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

AdminUsersScreen.auth = { adminOnly: true };
export default AdminUsersScreen;
