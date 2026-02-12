import axiosInstance from "./axiosInstance";

export const getTasks = async () => {
  try {
    const response = await axiosInstance.get("/task/all");
    return response.data.tasks;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
};

export const createTask = async (taskData) => {
  try {
    const response = await axiosInstance.post("/task/create", taskData);
    return response.data.task;
  } catch (error) {
    throw error;
  }
};

export const getStats = async () => {
  // Since backend has no stats endpoint, we'll calculate basic stats from tasks or return defaults
  // For now, return placeholders or calculate if we had transaction data
  // Assuming backend might someday support it, or we mock it for the UI
  // But user asked to removed "nonsense", so I'll return 0s or real calculation if possible.
  // The previous mock data had balance/profit.
  // If we want to keep the UI valid but not "nonsense", we can return 0s.
  return {
    balance: 0,
    profit: 0,
    activeTrades: 0,
    totalTrades: 0,
  };
};
