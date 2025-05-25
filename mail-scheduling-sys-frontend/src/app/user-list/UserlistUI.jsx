"use client";
import Link from "next/link";
import { BiSolidEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { useRouter } from "next/navigation";

export default function UserlistUI({ Userlistdata, categorylist }) {
  let router = useRouter();
  async function Adduser(formData) {
    const name = formData.get("name");
    const emailid = formData.get("emailid");
    const userSelectCategory = formData.get("recipient");

    const categoryID = categorylist.find(
      (c) => c.categoryName === userSelectCategory
    )?.categoryID;

    // const filteredUsers = Userlistdata.filter(
    //   (user) => user.IDofcategoryList === categoryID
    // ).map((user) => user.email);

    // console.log(filteredUsers);

    const res = await fetch(
      "https://backend-mail-schedule-production.up.railway.app/api/userlist",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name,
          email: emailid,
          IDofcategoryList: categoryID,
        }),
      }
    );

    if (res.ok) {
      const newUser = await res.json();
      console.log(newUser);
      router.push("user-list");
    } else {
      console.log("Error submitting the form");
    }
  }

  function Delete(IDofuser) {
    fetch(
      "https://backend-mail-schedule-production.up.railway.app/delete/user",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: IDofuser }),
      }
    )
      .then((data) => data.json())
      .then((data) => console.log(data));

    router.push("user-list");
  }
  return (
    <>
      <div className="flex justify-center w-full">
        <form action={Adduser} className="flex items-center space-x-4 p-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-900 dark:text-white"
            >
              Enter Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="emailid"
              className="block text-sm font-medium text-gray-900 dark:text-white"
            >
              Enter Mail ID
            </label>
            <input
              type="text"
              id="emailid"
              name="emailid"
              className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="recipient"
              className="block text-sm font-medium text-gray-900 dark:text-white"
            >
              Select Recipient List
            </label>
            <select
              id="recipient"
              name="recipient"
              className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              {categorylist.map((ulist) => (
                <option key={ulist.categoryID}>{ulist.categoryName}</option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
          >
            ADD USER
          </button>
        </form>
      </div>

      <div className="relative overflow-x-auto max-w-5xl mx-auto mt-[25px] bg-white shadow-lg rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-lg">
          <caption className="text-lg font-semibold text-gray-900 dark:text-white py-4 bg-gray-100 dark:bg-gray-800 rounded-t-lg">
            User List
          </caption>

          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                User ID
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Receipt Group
              </th>
              <th scope="col" className="px-6 py-3">
                Edit
              </th>
              <th scope="col" className="px-6 py-3">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {Userlistdata.map((u) => (
              <tr
                key={u.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {u.id}
                </th>
                <td className="px-6 py-4">{u.name}</td>
                <td className="px-6 py-4">{u.email}</td>

                <td className="px-6 py-4">
                  {
                    categorylist.find(
                      (c) => c.categoryID === u.IDofcategoryList
                    )?.categoryName
                  }
                </td>
                <td className="px-7 py-4 ">
                  <Link href={`/user-edit/${u.id}`}>
                    <BiSolidEdit size={20} />
                  </Link>
                </td>
                <td className="px-9 py-4 ">
                  <MdDelete
                    size={20}
                    onClick={() => Delete(u.id)}
                    className="cursor-pointer"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
