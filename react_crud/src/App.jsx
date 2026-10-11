import React, { useState } from "react";
import "./App.css";

const emptyUser = { name: "", age: "", email: "", phone: "" };

const App = () => {
  const [users, setUsers] = useState([]);
  const [userInfo, setUserInfo] = useState(emptyUser);
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((currInfo) => {
      return {
        ...currInfo,
        [name]: value,
      };
    });
  };

  // CREATE + UPDATE
  const handleSubmit = () => {
    if (!userInfo.name || !userInfo.email) {
      alert("Name and email are required");
      return;
    }

    if (editIndex !== null) {
      setUsers((currUsers) =>
        currUsers.map((user, index) => (index === editIndex ? userInfo : user))
      );
      setEditIndex(null);
    } else {
      setUsers((currUsers) => [...currUsers, userInfo]);
    }

    setUserInfo(emptyUser);
  };

  // READ the user into the form so it can be edited
  const handleEdit = (index) => {
    setUserInfo(users[index]);
    setEditIndex(index);
  };

  // DELETE
  const handleDelete = (index) => {
    setUsers((currUsers) => currUsers.filter((_, i) => i !== index));

    if (editIndex === index) {
      setEditIndex(null);
      setUserInfo(emptyUser);
    }
  };

  const handleCancel = () => {
    setEditIndex(null);
    setUserInfo(emptyUser);
  };

  return (
    <div className="container">
      <div className="form">
        <input
          type="text"
          placeholder="Enter your name"
          value={userInfo.name}
          name="name"
          onChange={handleChange}
        />
        <br />
        <input
          type="number"
          placeholder="Enter your age"
          value={userInfo.age}
          name="age"
          onChange={handleChange}
        />
        <br />
        <input
          type="email"
          placeholder="Enter your email"
          value={userInfo.email}
          name="email"
          onChange={handleChange}
        />
        <br />
        <input
          type="number"
          placeholder="Enter your phone"
          value={userInfo.phone}
          name="phone"
          onChange={handleChange}
        />
        <br />
        <div className="actions">
          <button onClick={handleSubmit}>
            {editIndex !== null ? "Update" : "Add"}
          </button>
          {editIndex !== null && (
            <button className="secondary" onClick={handleCancel}>
              Cancel
            </button>
          )}
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="5" className="empty">
                No users yet. Add one above.
              </td>
            </tr>
          ) : (
            users.map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.age}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>
                  <button onClick={() => handleEdit(index)}>Edit</button>
                  <button className="danger" onClick={() => handleDelete(index)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default App;
