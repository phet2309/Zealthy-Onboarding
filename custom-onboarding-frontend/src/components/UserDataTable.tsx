import React from "react";
import { UserData } from "../types";

// User data table component on Data page
const UserDataTable: React.FC<{ data: UserData[] }> = ({ data }) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-2">User Data Table</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Encrypted Password</th>
              <th className="border border-gray-300 px-4 py-2">About Me</th>
              <th className="border border-gray-300 px-4 py-2">Birthdate</th>
              <th className="border border-gray-300 px-4 py-2">Street</th>
              <th className="border border-gray-300 px-4 py-2">City</th>
              <th className="border border-gray-300 px-4 py-2">State</th>
              <th className="border border-gray-300 px-4 py-2">Zip</th>
              <th className="border border-gray-300 px-4 py-2">Created At</th>
              <th className="border border-gray-300 px-4 py-2">Updated At</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user) => (
              <tr key={user.id} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">{user.id}</td>
                <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                <td className="border border-gray-300 px-4 py-2">{user.password}</td>
                <td className="border border-gray-300 px-4 py-2">{user.aboutMe}</td>
                <td className="border border-gray-300 px-4 py-2">{user.birthdate}</td>
                <td className="border border-gray-300 px-4 py-2">{user?.address?.street || "N/A"}</td>
                <td className="border border-gray-300 px-4 py-2">{user?.address?.city || "N/A"}</td>
                <td className="border border-gray-300 px-4 py-2">{user?.address?.state || "N/A"}</td>
                <td className="border border-gray-300 px-4 py-2">{user?.address?.zip || "N/A"}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(user?.createdAt ?? '').toLocaleString()}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(user?.updatedAt ?? '').toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserDataTable;
