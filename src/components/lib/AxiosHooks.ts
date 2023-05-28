import axios from "axios";
import { useState, useEffect } from "react";

const useFetch = (url: string) => {
    const [isLoading, setIsLoading] = useState(false);
    const [apiData, setApiData] = useState(null);
    const [serverError, setServerError] = useState(null);
  
    useEffect(() => {
      setIsLoading(true);
      const fetchData = async () => {
        try {
          const resp = await axios.get(url);
          const res = await resp?.data;
  
          setApiData(res);
          setIsLoading(false);
        } catch (error: any) {
          setServerError(error);
          setIsLoading(false);
        }
      };
  
      fetchData();
    }, [url]);
  
    return { isLoading, apiData, serverError };
};

const usePost = (url: string, inputData: any) => {
    const [isLoading, setIsLoading] = useState(false);
    const [serverError, setServerError] = useState(null);
  
    useEffect(() => {
      setIsLoading(true);
      const postData = async () => {
        try {
          await axios.post(url, inputData);
          setIsLoading(false);
        } catch (error: any) {
          setServerError(error);
          setIsLoading(false);
        }
      };
  
      postData();
    }, [url, inputData]);
  
    return { isLoading, serverError };
};