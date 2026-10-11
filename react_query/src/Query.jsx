import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";


const Query = () => {
  const [url, setUrl] = useState("");
  const repo1 = useQuery({
    queryKey: ["githubData", url],
    queryFn: apiCall,
    });

  const repo2 = useQuery({
    queryKey: [
        "githubData",
        "https://api.github.com/repos/JoseAntony07/Interview",
    ],
    queryFn: apiCall,
    });

  function apiCall({ queryKey }) {
    const repoUrl = queryKey[1];
    if (!repoUrl){
        throw new Error("URL is missing");
    }
    return fetch(repoUrl).then((res) => res.json());
}

    if (repo2.isLoading) {
    return <h1>Loading...</h1>;
    }

    if (repo2.error) {
    return <h1>An error occurred</h1>;
    }

// https://api.github.com/repos/antonfrancisjeejoo/flipkart-clone

return (
  <div>
    {repo1.data && (
      <div>
        <h1>Repo name: {repo1.data.name}</h1>
        <h3>Repo forks: {repo1.data.forks}</h3>
        <h3>Repo stars: {repo1.data.stargazers_count}</h3>
        <h3>Repo subscribers: {repo1.data.subscribers_count}</h3>
      </div>
    )}
    <div>
      <h1>Repo name: {repo2.data.name}</h1>
      <h3>Repo forks: {repo2.data.forks}</h3>
      <h3>Repo stars: {repo2.data.stargazers_count}</h3>
      <h3>Repo subscribers: {repo2.data.subscribers_count}</h3>
    </div>
    <button
      onClick={() =>
        setUrl(
          "https://api.github.com/repos/JoseAntony07/ExpenseProject"
        )
      }
    >
      Update
    </button>
    </div>
)
}


export default Query;