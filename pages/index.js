import Header from "@/component/Layout/Header";
import { googleEvent } from "@/component/utils/googleAnalytics";

import dynamic from "next/dynamic";
import { useEffect } from "react";
const HomePage = dynamic(() => import("@/component/home/homepage"));

export default function Home() {
  useEffect(() => {
    googleEvent({
      event_category: "Home (Banner)",
      event_label: "Home",
    });
  }, []);

  return (
    <div>
      {/* Navbar */}
      <Header />
      {/* Showcase */}
      <HomePage />
    </div>
  );
}
