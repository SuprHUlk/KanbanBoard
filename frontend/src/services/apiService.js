const API_URL = "https://kanban-board-857105019651.asia-south1.run.app/api";

export const initializeDatabase = async () => {
    try {
        const response = await fetch(`${API_URL}/init`, {
            method: "POST",
        });
        if (!response.ok) {
            throw new Error("Failed to initialize database");
        }
        return await response.json();
    } catch (error) {
        console.error("Error initializing database:", error);
        throw error;
    }
};

export const api = async () => {
    try {
        // First try to initialize the database
        // await initializeDatabase();

        // Then fetch the data
        const response = await fetch(`${API_URL}/tickets`);
        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching Kanban data:", error);
        return { tickets: [], users: [] };
    }
};
