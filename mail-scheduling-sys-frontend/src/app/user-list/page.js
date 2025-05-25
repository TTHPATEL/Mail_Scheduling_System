import UserlistUI from "./UserlistUI";

export default async function userList() {
  const Userlistdata = await (
    await fetch(
      "https://backend-mail-schedule-production.up.railway.app/api/userlist",
      {
        cache: "no-cache",
      }
    )
  ).json();
  const categorylist = await (
    await fetch(
      "https://backend-mail-schedule-production.up.railway.app/api/categorylist",
      {
        cache: "no-cache",
      }
    )
  ).json();

  function Adduser() {}
  // const [data, setData] = useState({
  //   userlist: [],
  //   categorylist: [],
  //   scheduleMail: [],
  // });
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   fetch("/api/userlist")
  //     .then((res) => res.json())
  //     .then((data) => setData(data))
  //     .finally(() => setLoading(false));
  // }, []);

  // if (loading) {
  //   return (
  //     <div className="flex items-center justify-center h-screen">
  //       <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
  //     </div>
  //   );
  // }
  return (
    <>
      <UserlistUI Userlistdata={Userlistdata} categorylist={categorylist} />
    </>
  );
}
