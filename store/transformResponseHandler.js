import { messageNotification } from "@/component/utils/functions";

export const transformResponseHandler = (resp, alert = true) => {
  if (alert && resp?.message) {
    messageNotification(resp?.message, !resp?.success ? "error" : "success");
  }
  let transformedResp = { success: resp.success, data: resp.data };
  if (resp.token) {
    transformedResp.token = resp.token;
  }
  return transformedResp;
};
