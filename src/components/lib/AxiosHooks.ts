import axios from "axios";
import { useState, useEffect, useCallback } from "react";

export interface PayLoad {
    url: string,
    manual?: boolean,
    data?: any
}

export const useFetch = (payload: PayLoad) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<any>(null);
  
    useEffect(() => {
      if (payload.manual) {
        return;
      }

      setLoading(true);
      const fetchData = async () => {
        try {
          const resp = await axios.get(payload.url);
          const res = await resp?.data;
  
          setData(res);
          setLoading(false);
        } catch (error: any) {
          setError(error);
          setLoading(false);
        }
      };
  
      fetchData();
    }, [payload]);

    const refetch = useCallback(
        async (payload: PayLoad) => {
            setData(null);
            setError(null);
            setLoading(false);
            try {
              const resp = await axios.get(payload.url);
              const res = await resp?.data;
              setData(res);
              setLoading(false);
            } catch (error: any) {
              setError(error);
              setLoading(false);
            }
        }, []);
  
    return [data, error, loading, refetch];
};



export const usePost = (payload: PayLoad) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>(null);
  
    useEffect(() => {
      setLoading(true);
      if (payload.manual) {
        return;
      }
      
      const postData = async () => {
        try {
          await axios.post(payload.url, payload.data);
          setLoading(false);
        } catch (error: any) {
          setError(error);
          setLoading(false);
        }
      };
  
      postData();
    }, [payload]);

    const repost = useCallback(
        async (payload: PayLoad) => {
            setError(null);
            setLoading(false);
            try {
              await axios.post(payload.url, payload.data)
              setLoading(false);
            } catch (error: any) {
              setError(error);
              setLoading(false);
            }
        }, []);
  
    return [error, loading, repost];
};