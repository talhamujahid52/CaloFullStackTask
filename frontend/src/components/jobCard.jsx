import React from "react";

const jobCard = ({ job }) => {
  return (
    <li className="h-60 bg-slate-400 flex flex-row items-center justify-center rounded-md ">
      {job.status === "resolved" && (
        <div className="w-full h-full bg-slate-600 overflow-hidden rounded-md">
          <img
            src={job.result}
            alt="Random Food"
            className="h-full w-full object-cover"
          />
        </div>
      )}

      {job.status === "pending" && (
        <h1 className="text-2xl font-bold text-white">Job Pending</h1>
      )}
    </li>
  );
};

export default jobCard;
