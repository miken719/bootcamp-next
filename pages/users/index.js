import dynamic from "next/dynamic";
const Header = dynamic(() => import("@/component/Layout/Header"));
import { messageNotification } from "@/component/utils/functions";

import { useUserHook } from "@/store/hooks/useUserHook";

const UsersList = () => {
  const { getUsersData, userDelete } = useUserHook({
    fixedCacheKey: "user-data-fetch",
  });

  const deleteUser = async (id) => {
    const data = await userDelete(id);
    if (data.data?.success) {
      messageNotification(data.data?.message, "success");
    } else {
      messageNotification("Something went wrong...", "error");
    }
  };
  return (
    <>
      <Header />
      <div className="container mt-5">
        <h1>.</h1>
        <table className="rwd-table">
          <tbody>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>

              <th>Created Date</th>
              <th>Delete</th>
            </tr>
            {getUsersData &&
              getUsersData?.user?.map((users) => (
                <>
                  <tr key={users?._id}>
                    <td data-th="username">{users?.username}</td>
                    <td data-th="email">{users?.email}</td>
                    <td data-th="role">{users?.role}</td>
                    <td data-th="date">
                      {new Date(users?.createdAt).toDateString()}
                    </td>
                    <td>
                      <div className="d-flex ml-1 ">
                        <span
                          className="mr-3 "
                          onClick={() => deleteUser(users?._id)}
                        >
                          <i class="fa-solid fa-trash "></i>
                        </span>
                      </div>
                    </td>
                  </tr>
                </>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default UsersList;
