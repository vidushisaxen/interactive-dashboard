"use client"

import FinanceDashboardPage from "@/components/FinanceDashboardPage";
import { useRouter } from "next/navigation";

const routeMap = {
  analytics: "/analytics",
  "move-money": "/move-money",
  overview: "/overview",
  stocks: "/stocks",
  request: "/request",
  pools: "/pools",
  transfer: "/transfer",
};

const Page = ({ searchQuery }) => {
  const router = useRouter();

  return (
    <FinanceDashboardPage
      searchQuery={searchQuery}
      onNav={(target) => {
        const nextRoute = routeMap[target];
        if (nextRoute) {
          router.push(nextRoute);
        }
      }}
    />
  );
};

export default Page;
