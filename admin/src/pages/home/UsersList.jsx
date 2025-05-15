import { Link } from "react-router-dom";

const UsersList = (props) => {
  const { users, page } = props;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
      {users.map((user, i) => (
        <Link
          to={`/user?_id=${user._id}`}
          key={user._id}
          className="col-span-1 bg-alt shadow-md rounded-md flex justify-around items-center p-2 text-hover"
        >
          <span className="text-xl flex-grow">
            {(page - 1) * 20 + i + 1}. {user.name}
          </span>
          <span className="image-circle w-16 mx-8">
            <img src={user.picture} alt="" />
          </span>
        </Link>
      ))}
    </div>
  );
};

export default UsersList;
