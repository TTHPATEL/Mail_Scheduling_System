"use client";
import Link from "next/link";
import { BiSolidEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { useRouter } from "next/navigation";

export default function ScheduledMail({ scheduleMailData }) {
  const router = useRouter();

  function Delete(IDofschedule) {
    fetch(
      "https://backend-mail-schedule-production.up.railway.app/delete/scheduleMail",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scheduleMailID: IDofschedule }),
      }
    )
      .then((data) => data.json())
      .then((data) => console.log(data));

    router.push("scheduled-mail");
  }

  return (
    <>
      <div className="relative overflow-x-auto max-w-6xl mx-auto mt-[25px] bg-white shadow-lg rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-lg">
          <caption className="text-lg font-semibold text-gray-900 dark:text-white py-4 bg-gray-100 dark:bg-gray-800 rounded-t-lg">
            Scheduled Mail List
          </caption>

          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Schedule Mail ID
              </th>
              <th scope="col" className="px-6 py-3">
                Template Name
              </th>
              <th scope="col" className="px-6 py-3">
                Recipient Group Name
              </th>
              <th scope="col" className="px-6 py-3">
                Recipient Mail ID
              </th>
              <th scope="col" className="px-6 py-3">
                Schedule
              </th>
              <th scope="col" className="px-6 py-3">
                Status
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
            {scheduleMailData.map((u) => (
              <tr
                key={u.scheduleMailID}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {u.scheduleMailID}
                </th>
                <td className="px-6 py-4">{u.template}</td>
                <td className="px-6 py-4">{u.recipientGroupName}</td>
                <td className="px-6 py-4">{u.recipient.join(" , ")}</td>
                <td className="px-6 py-4">{u.scheduleinIST}</td>
                <td className="px-6 py-4">{u.status}</td>
                <td className="px-7 py-4 ">
                  <Link href={`/scheduled-mail-edit/${u.scheduleMailID}`}>
                    <BiSolidEdit size={20} />
                  </Link>
                </td>
                <td className="px-9 py-4 ">
                  <MdDelete
                    size={20}
                    className="cursor-pointer"
                    onClick={() => Delete(u.scheduleMailID)}
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
