// lib/apiServiceCall.ts
import axios, { AxiosRequestConfig } from "axios";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST as string;

const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refresh");
  if (!refreshToken) {
    console.warn("No refresh token found.");
    throw new Error("Session expired. Please log in again.");
  }

  try {
    const response = await axios.post(`${API_HOST}/token/refresh/`, {
      refresh: refreshToken,
    });
    const newAccessToken = response?.data?.access;
    localStorage.setItem("access", newAccessToken);
    return newAccessToken;
  } catch (error) {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");
    throw new Error("Session expired. Please log in again.");
  }
};


const apiServiceCall = async ({
  url,
  method,
  body,
  headers = {},
  endpoint,
}: {
  url: string;
  method: string;
  body?: any;
  headers?: any;
  endpoint?: string;
}) => {
  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("access") : null;

  try {
    const response = await axios({
      method: method?.toUpperCase() || "GET",
      url: `${API_HOST}${url}`,
      data: body,
      headers: {
        "Content-Type": "application/json",
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
        ...headers,
      },
    });
    return response?.data;
  } catch (error: any) {
    if (
      axios.isAxiosError(error) &&
      error.response?.status === 401 &&
      !url.includes("/token/refresh/")
    ) {
      try {
        if (endpoint === "login" || endpoint === "register") {
          throw error.response?.data || error.message;
        }
        const newAccessToken = await refreshAccessToken();

        // Retry original request with new access token
        const retryResponse = await axios({
          method: method?.toUpperCase() || "GET",
          url: `${API_HOST}${url}`,
          data: body,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${newAccessToken}`,
            ...headers,
          },
        });

        return retryResponse.data;
      } catch (refreshErr) {
        throw refreshErr;
      }
    }

    if (axios.isAxiosError(error)) {
      throw error.response?.data || error.message;
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export default apiServiceCall;

