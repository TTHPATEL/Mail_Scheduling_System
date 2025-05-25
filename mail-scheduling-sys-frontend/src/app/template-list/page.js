import TemplatelistUI from "./TemplatelistUI";

export default async function TemplateList() {
  const TemplatelistData = await (
    await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/templates`, {
      cache: "no-store",
    })
  ).json();

  return (
    <div>
      <TemplatelistUI TemplatelistData={TemplatelistData} />
    </div>
  );
}
