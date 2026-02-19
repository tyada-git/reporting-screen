import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ReportResponse } from "../types/report.type";

export interface GetReportArgs {
  startDate: string;
  endDate: string;
}

export const reportApi = createApi({
  reducerPath: "reportApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/proxy",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getReport: builder.query<ReportResponse, GetReportArgs>({
      query: ({ startDate, endDate }) => ({
        url: "/api/v4/report",
        method: "POST",
        body: {
          date: { start: startDate, end: endDate },
          fileType: "json",
        },
      }),
    }),
  }),
});

export const { useGetReportQuery } = reportApi;
