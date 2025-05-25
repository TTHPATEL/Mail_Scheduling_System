import ScheduledMailForm from "./ScheduledMailUI";

export default async function ScheduledMail() {
  const scheduleMail = await (
    await fetch(
      "https://backend-mail-schedule-production.up.railway.app/api/scheduleMail",
      {
        cache: "no-store", // Ensures fresh data on every request
      }
    )
  ).json();

  return (
    <div>
      <ScheduledMailForm scheduleMailData={scheduleMail} />
    </div>
  );
}
