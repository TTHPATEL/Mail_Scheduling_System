"use client";
import { useParams } from "next/navigation";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
export default function useredit() {
  const { id } = useParams();

  const router = useRouter();
  let [categorylist, setCategorylist] = useState([]);
  const [user, setUser] = useState({ name: "", email: "" });
  const [displayuser, setdisplayUser] = useState({ name: "", email: "" });

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Fetch all required data
    Promise.all([
      fetch(
        "https://backend-mail-schedule-production.up.railway.app/api/categorylist"
      ).then((res) => res.json()),
      fetch(
        `https://backend-mail-schedule-production.up.railway.app/api/user/${id}`
      ).then((res) => res.json()),
    ]).then(([categories, users]) => {
      setCategorylist(categories);
      setUser(users);
      setdisplayUser(users);
      setLoading(false);
    });
  }, [id]);
  async function UpdateUser(formData) {
    const name = formData.get("name");
    const userSelectCategory = formData.get("recipient");
    const emailid = formData.get("emailid");

    console.log(`userSelectCategory is ${userSelectCategory}`);
    console.log(`emailid is ${emailid}`);

    const categoryID = categorylist.find(
      (c) => c.categoryName === userSelectCategory
    )?.categoryID;

    console.log(`Category id is ${categoryID}`);

    // const filteredUsers = userlists
    //   .filter((user) => user.IDofcategoryList === categoryID)
    //   .map((user) => user.email);

    const updatedData = {
      name: name,
      emailid: emailid,
      recipientGroupNameID: categoryID,
    };
    console.log(updatedData);

    const res = await fetch(
      `https://backend-mail-schedule-production.up.railway.app/api/user/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      }
    );

    if (res.ok) {
      const newUser = await res.json();
      console.log("User Updated:", newUser);
      router.push("/user-list");
    } else {
      console.log("Error submitting the form");
    }
  }
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }
  return (
    <>
      <div style={{ marginLeft: "37.5%", marginTop: "5%" }}>
        <div>
          <h1 style={{ color: "#FF8800" }}>Existing Data Details</h1>
          <h1>User Name : {displayuser.name}</h1>
          <h1>User Email : {displayuser.email}</h1>
        </div>
      </div>

      <div style={{ marginTop: 80 }}>
        <form action={UpdateUser} className="max-w-sm mx-auto">
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
            value={user.name || ""}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            className="w-[70%] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <br />
          <br />
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
            value={user.email || ""}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="w-[70%] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <br /> <br />
          <label
            htmlFor="recipient"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Select Recipient List
          </label>
          <select
            id="recipient"
            name="recipient"
            className="w-[70%] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            {categorylist.map((ulist) => (
              <option key={ulist.categoryID}>{ulist.categoryName}</option>
            ))}
          </select>
          <br />
          <br />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded center"
          >
            UPDATE SCHEDULE
          </button>
        </form>
      </div>
    </>
  );
}
