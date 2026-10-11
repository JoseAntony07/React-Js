import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUsers } from '../slices/userSlice'


const Users = () => {
  const dispatch = useDispatch()

  const users = useSelector((state) => state.userInfo.users) // get data from redux
  console.log(users)

  const deleteUserInfo = (index) => {
    dispatch(deleteUsers(index))
  }

  return (
    <div>
        {users?.map((user, index) => {
          return (
            <div key={index}>
              <h1>{user.name}</h1>
              <h2>{user.age}</h2>
              <h2>{user.email}</h2>
              <h2>{user.contact}</h2>
              <button onClick={() => deleteUserInfo(index)}>Delete</button>
            </div>
          )
        })}
    </div>
  )
}

export default Users