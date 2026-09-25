
import MainPage from "@/Components/home/mainPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order Tracking — #ORD-1024",
  description:
    "Track order #ORD-1024: delivery status, timeline, and support actions.",
};

export default function Home() {
  return <MainPage />;
}
