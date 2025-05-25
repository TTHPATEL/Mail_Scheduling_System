"use client";
import { useParams } from "next/navigation";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
export default function ScheduledmailedEdit() {
  const { id } = useParams();

  const router = useRouter();
  let [templist, setTemplist] = useState([]);
  let [categorylist, setCategorylist] = useState([]);
  let [userlists, setUserlists] = useState([]);
  const [scheduledMail, setScheduledMail] = useState([]);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Fetch all required data
    Promise.all([
      fetch(
        "https://backend-mail-schedule-production.up.railway.app/api/templates"
      ).then((res) => res.json()),
      fetch(
        "https://backend-mail-schedule-production.up.railway.app/api/categorylist"
      ).then((res) => res.json()),
      fetch(
        "https://backend-mail-schedule-production.up.railway.app/api/userlist"
      ).then((res) => res.json()),
      fetch(
        `https://backend-mail-schedule-production.up.railway.app/api/scheduleMail/${id}`
      ).then((res) => res.json()),
    ]).then(([templates, categories, users, scheduledMailData]) => {
      setTemplist(templates);
      setCategorylist(categories);
      setUserlists(users);
      setScheduledMail(scheduledMailData);
      setLoading(false);
    });
  }, [id]);
  async function Updatescheduledmail(formData) {
    const template = formData.get("template");
    const userSelectCategory = formData.get("recipient");
    const schedule = formData.get("schedule");

    const categoryID = categorylist.find(
      (c) => c.categoryName === userSelectCategory
    )?.categoryID;

    const filteredUsers = userlists
      .filter((user) => user.IDofcategoryList === categoryID)
      .map((user) => user.email);

    const updatedData = {
      template: template,
      schedule: schedule,
      recipient: filteredUsers,
      recipientGroupName: userSelectCategory,
    };

    const res = await fetch(
      `https://backend-mail-schedule-production.up.railway.app/api/scheduleMail/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      }
    );

    if (res.ok) {
      const newUser = await res.json();
      console.log("Update Schedule:", newUser);
      router.push("/scheduled-mail");
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
          <h1>Template ( Mailer ) : {scheduledMail.template}</h1>
          <h1>Recipient List : {scheduledMail.recipientGroupName}</h1>
          <h1>Schedule Time : {scheduledMail.schedule}</h1>
          <h1>
            Schedule Time : IST : {scheduledMail.scheduleinIST} | UTC :{" "}
            {scheduledMail.schedule}
          </h1>
        </div>
      </div>
      <div style={{ marginTop: 80 }}>
        <form action={Updatescheduledmail} className="max-w-sm mx-auto">
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
            defaultValue={scheduledMail?.schedule}
          ></input>
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
