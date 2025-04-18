import { useState } from "react";
import axios, { AxiosRequestConfig } from "axios";

type UseAxiosResult<T> = {
  data: T | null;
  error: string;
  loading: boolean;
  post: (url: string, body?: any, config?: AxiosRequestConfig) => Promise<void>;
};

function useAxios<T = any>(): UseAxiosResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const post = async (url: string, body?: any, config?: AxiosRequestConfig) => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.post<T>(url, body, config);
      setData(response.data);
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, post };
}

export default useAxios;
