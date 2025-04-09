import { request } from "@/utils";
import { use, useEffect } from "react";
const Layout = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await request.get("/user/profile");
        console.log(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);


  return (
    <div>
      <h1>Layout</h1>
      <p>This is the layout component.</p>
    </div>
  );
}

export default Layout