"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  let [templist, setTemplist] = useState([]);
  let [categorylist, setCategorylist] = useState([]);
  let [userlists, setUserlists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://backend-mail-schedule-production.up.railway.app/api/templates"
    )
      .then((data) => data.json())
      .then((data) => setTemplist(data));
    fetch(
      "https://backend-mail-schedule-production.up.railway.app/api/categorylist"
    )
      .then((data) => data.json())
      .then((data) => setCategorylist(data));
    fetch(
      "https://backend-mail-schedule-production.up.railway.app/api/userlist"
    )
      .then((data) => data.json())
      .then((data) => setUserlists(data))
      .finally(() => setLoading(false));
  }, []);

  async function Addscheduledmail(formData) {
    const template = formData.get("template");
    const userSelectCategory = formData.get("recipient");
    const schedule = formData.get("schedule");

    const categoryID = categorylist.find(
      (c) => c.categoryName === userSelectCategory
    )?.categoryID;

    const filteredUsers = userlists
      .filter((user) => user.IDofcategoryList === categoryID)
      .map((user) => user.email);

    const res = await fetch(
      "https://backend-mail-schedule-production.up.railway.app/api/scheduleMail",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          template: template,
          schedule: schedule,
          recipient: filteredUsers,
          recipientGroupName: userSelectCategory,
        }),
      }
    );

    if (res.ok) {
      const resdata = await res.json();
      console.log("Email is Scheduled!");
      router.push("scheduled-mail");
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
      <div className="flex justify-center w-full">
        <h1 className="text-[2.6rem] font-bold text-center mt-16">
          Make Mail Scheduler
        </h1>
      </div>

      <div style={{ margin: 50 }}>
        <form action={Addscheduledmail} className="max-w-sm mx-auto">
          <label
            htmlFor="template"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Select Template ( Mailer )
          </label>
          <select
            id="template"
            name="template"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            {templist.map((tlist) => (
              <option key={tlist.template_id}>{tlist.template_name}</option>
            ))}
          </select>
          <br />
          <label
            htmlFor="recipient"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Select Recipient List
          </label>
          <select
            id="recipient"
            name="recipient"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            {categorylist.map((ulist) => (
              <option key={ulist.categoryID}>{ulist.categoryName}</option>
            ))}
          </select>
          <br />
          <label
            htmlFor="schedule"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Select Schedule
          </label>
          <input
            type="datetime-local"
            id="schedule"
            name="schedule"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          ></input>
          <br />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded center"
          >
            ADD SCHEDULE
          </button>
        </form>
      </div>
    </>
  );
}
