"use client"

import FinanceDashboardPage from "@/components/FinanceDashboardPage";
import { useRouter } from "next/navigation";

const routeMap = {
  analytics: "/analytics",
  deposit: "/deposit",
  overview: "/overview",
  pools: "/pools",
  withdraw: "/withdraw",
};

const Page = () => {
  const router = useRouter();

  return (
    <FinanceDashboardPage
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
