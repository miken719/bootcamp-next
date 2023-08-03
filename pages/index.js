import { googleEvent } from "@/component/utils/googleAnalytics";

import dynamic from "next/dynamic";
import { useEffect } from "react";
const HomePage = dynamic(() => import("@/component/home"));
const Header = dynamic(() => import("@/component/Layout/Header"));

export default function Home({ cms }) {
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
      <HomePage cms={cms} />
    </div>
  );
}

export async function getStaticProps() {
  const api = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cms`);
  const data = await api.json();
  const homebanner = {
    title: data?.metaInfo?.title,
    description: data?.metaInfo?.description,
  };
  return {
    props: {
      cms: homebanner,
    },
    revalidate: 86400,
  };
}
