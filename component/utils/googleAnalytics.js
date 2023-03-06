import { GOOGLE_ANALYTICS_ID } from "@/config";
import Router from "next/router";

import { htmlDecode } from "./functions";

// log the pageview with their URL
export const pageview = (url) => {
  window.gtag("config", GOOGLE_ANALYTICS_ID, {
    page_path: url,
  });
};
// log specific events happening.
export const event = (action, params) => {
  window.gtag("event", action, params);
};
export const googleEvent = ({ event_category, event_label }) => {
  let params = {
    event_category: event_category && htmlDecode(event_category),
    event_label: event_label && htmlDecode(event_label),
  };
  event(Router.asPath, params);
};
