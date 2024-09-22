import React, { useEffect } from "react";
import JobCard from "./components/jobCard";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { io } from "socket.io-client";
const socket = io("http://localhost:4000");

const App = () => {
  const queryClient = useQueryClient();

  const fetchJobs = async () => {
    const response = await fetch("http://localhost:4000/api/jobs");
    const data = await response.json();
    return data;
  };

  const {
    data: jobsList,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["jobs"],
    queryFn: fetchJobs,
    refetchOnWindowFocus: false,
  });

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await fetch("http://localhost:4000/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Response: ", response);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return response.json();
    },
    onSuccess: (data) => {
      alert("Job is created Successfully with id: ", data.id);
      console.log("Data submitted successfully:");
    },
    onError: (error) => {
      console.error("Error submitting data:", error);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate();
  };

  useEffect(() => {
    console.log("UseEffect is called......");
    socket.on("connection", () => {
      console.log("Socket is Connected");
    });
    socket.on("jobResolved", (resolvedJob) => {
      console.log("Job is created Event");
      queryClient.refetchQueries(["jobs"]);
    });

    return () => {
      socket.off("jobResolved");
    };
  }, [queryClient]);

  if (isLoading) return <h1>LOADING</h1>;
  if (isError) return <h1>Error While Fetching Jobs</h1>;

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Calo FullStack Task - Frontend
        </h1>
        <button
          onClick={handleSubmit}
          disabled={mutation.isPending}
          className={`w-full bg-blue-600 text-white font-semibold py-2 rounded-md transition duration-300 
                        hover:bg-blue-500 ${
                          isLoading && "opacity-50 cursor-not-allowed"
                        } mb-4`}
        >
          {isLoading ? "Creating Job..." : "Create New Job"}
        </button>
        <ul className="space-y-4 h-[500px] overflow-auto">
          {jobsList.map((job) => (
            <JobCard key={job.id} job={job}></JobCard>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
