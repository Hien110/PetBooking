import { useEffect, useState } from 'react';
import { getAllUsers } from '../services/userService';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers()
      .then(setUsers)
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map(user => (
          <li key={user._id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
