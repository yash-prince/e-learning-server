import React, { useEffect, useState } from "react";
import "./users.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../Utils/Layout";
import toast from "react-hot-toast";
import { server } from "../../main";

const AdminUsers = ({ user }) => {
  const navigate = useNavigate();

  if (user && user.role !== "admin") return navigate("/");

  const [users, setUsers] = useState();

  async function fetchUsers() {
    try {
      const { data } = await axios.get(`${server}/api/users`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setUsers(data.users);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  const updateRole = async(id)=>{
    if(confirm("Are you sure to want the update the user role")){
        try{
            const {data} = await axios.put(`${server}/api/user/${id}`,{},{
                headers:{
                    token:localStorage.getItem("token"),
                },
            });
            toast.success(data.message);
            fetchUsers();
        }catch(error){
            toast.error(error.response.data.message);
        }
    }
  }
  return (
    <Layout>
      <div className="users">
        <h1>All Users</h1>
        <table border={"black"}>
        <thead>
    <tr>
      <th>#</th><th>name</th><th>email</th><th>role</th><th>update role</th>
    </tr>
  </thead>
  <tbody>
    { users && users.map((e,i) => (
      <tr key={e._id}>
        <td>{i+1}</td>
        <td>{e.name}</td>
        <td>{e.email}</td>
        <td>{e.role}</td>
        <td>
          <button
            onClick={()=>updateRole(e._id)}
            className="common-btn"
          >Update Role</button>
        </td>
      </tr>
    ))}
  </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default AdminUsers;
