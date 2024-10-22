const API_URL = "https://api.quicksell.co/v1/internal/frontend-assignment";

export const api = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching Kanban data:", error);
    return [];
  }
};
