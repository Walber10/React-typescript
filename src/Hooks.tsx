import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { WorkerProfile, JobMatch, JobActionResponse } from "./Model";

const BASE_URL = "https://test.swipejobs.com/api";

export const useFetchWorkerProfile = (workerId: string) => {
  const [workerProfile, setWorkerProfile] = useState<WorkerProfile | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWorkerProfile = async () => {
      setIsLoading(true);
      try {
        const response: AxiosResponse<WorkerProfile> = await axios.get(
          `${BASE_URL}/worker/${workerId}/profile`
        );
        setWorkerProfile(response.data);
      } catch (error) {
        setError("Error fetching worker profile.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchWorkerProfile();
  }, [workerId]);

  return { workerProfile, isLoading, error };
};

export const useFetchJobMatches = (workerId: string) => {
  const [jobMatches, setJobMatches] = useState<JobMatch[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobMatches = async () => {
      setIsLoading(true);
      try {
        const response: AxiosResponse<JobMatch[]> = await axios.get(
          `${BASE_URL}/worker/${workerId}/matches`
        );
        setJobMatches(response.data);
      } catch (error) {
        setError("Error fetching job matches.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobMatches();
  }, [workerId]);

  return { jobMatches, isLoading, error };
};

export const useAcceptJob = (workerId: string) => {
  const [error, setError] = useState<string | null>(null);

  const acceptJob = async (jobId: string) => {
    try {
      const response: AxiosResponse<JobActionResponse> = await axios.post(
        `${BASE_URL}/worker/${workerId}/job/${jobId}/accept`
      );
      return response.data;
    } catch (errorObj) {
      setError("Error accepting the job.");
      throw errorObj;
    }
  };

  return { acceptJob, error };
};

export const useRejectJob = (workerId: string) => {
  const [error, setError] = useState<string | null>(null);

  const rejectJob = async (jobId: string) => {
    try {
      const response: AxiosResponse<JobActionResponse> = await axios.post(
        `${BASE_URL}/worker/${workerId}/job/${jobId}/reject`
      );
      return response.data;
    } catch (errorObj) {
      setError("Error rejecting the job.");
      throw errorObj;
    }
  };

  return { rejectJob, error };
};
