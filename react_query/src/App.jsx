import React from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import Query from "./Query";

const App = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Query />
    </QueryClientProvider>
  );
};

export default App;