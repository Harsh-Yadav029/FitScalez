"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackPageView } from "@/services/tracker.service";

export default function AnalyticsTracker() {
    const pathname = usePathname();

    useEffect(() => {
        trackPageView(pathname, document.title);
    }, [pathname]);

    return null;
}
