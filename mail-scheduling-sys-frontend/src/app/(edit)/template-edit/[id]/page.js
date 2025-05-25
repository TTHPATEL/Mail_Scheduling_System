"use client";
import { useParams } from "next/navigation";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
export default function templateEdit() {
  const { id } = useParams();
  const router = useRouter();
  const [template, setTemplate] = useState([]);
  const [displaytemplate, setDisplaytemplate] = useState([]);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Fetch all required data
    Promise.all([
      fetch(
        `https://backend-mail-schedule-production.up.railway.app/api/template/${id}`
      ).then((res) => res.json()),
    ]).then(([template]) => {
      setTemplate(template);
      setDisplaytemplate(template);
      setLoading(false);
    });
  }, [id]);

  async function UpdateTemplate(formData) {
    const templateName = formData.get("templateName");

    const updatedData = {
      template_name: templateName,
    };

    const res = await fetch(
      `https://backend-mail-schedule-production.up.railway.app/api/template/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      }
    );

    if (res.ok) {
      const newTemplate = await res.json();
      console.log("Template Updated:", newTemplate);
      router.push("/template-list");
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
          <h1>Template Name : {displaytemplate.template_name}</h1>
        </div>
      </div>
      <div style={{ marginTop: 80 }}>
        <form action={UpdateTemplate} className="max-w-sm mx-auto">
          <label
            htmlFor="templateName"
            className="block text-sm font-medium text-gray-900 dark:text-white"
          >
            Enter Template Name
          </label>
          <input
            type="text"
            id="templateName"
            name="templateName"
            value={template.template_name}
            onChange={(e) => setTemplate({ template_name: e.target.value })}
            className="w-[70%] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <br />
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
