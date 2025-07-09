const express = require("express");
const cors = require("cors");
const db = require("./config/db");
const app = express();

app.use(cors());
app.use(express.json());

// Get all tickets with user info
app.get("/api/tickets", async (req, res) => {
  try {
    // Get users first
    const [users] = await db.query("SELECT * FROM users");

    // Get tickets
    const [tickets] = await db.query("SELECT * FROM tickets");

    // Get tags
    const [tags] = await db.query("SELECT * FROM tags");

    // Format tickets
    const formattedTickets = tickets.map((ticket) => ({
      id: ticket.id,
      title: ticket.title,
      tag: tags.filter((tag) => tag.ticketId === ticket.id).map((t) => t.tag),
      userId: ticket.userId,
      status: ticket.status,
      priority: ticket.priority,
    }));

    const response = {
      tickets: formattedTickets,
      users: users.map((user) => ({
        id: user.id,
        name: user.name,
        available: user.available === 1,
      })),
    };

    res.json(response);
  } catch (error) {
    console.error("Error fetching tickets:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Initialize database with sample data
app.post("/api/init", async (req, res) => {
  try {
    // Sample data
    const users = [
      { id: "usr-1", name: "Anoop sharma", available: false },
      { id: "usr-2", name: "Yogesh", available: true },
      { id: "usr-3", name: "Shankar Kumar", available: true },
      { id: "usr-4", name: "Ramesh", available: true },
      { id: "usr-5", name: "Suresh", available: true },
    ];

    const tickets = [
      {
        id: "CAM-1",
        title: "Update User Profile Page UI",
        userId: "usr-1",
        status: "Todo",
        priority: 4,
      },
      {
        id: "CAM-2",
        title:
          "Add Multi-Language Support - Enable multi-language support within the application.",
        userId: "usr-2",
        status: "In progress",
        priority: 3,
      },
      {
        id: "CAM-3",
        title: "Optimize Database Queries for Performance",
        userId: "usr-2",
        status: "In progress",
        priority: 1,
      },
      {
        id: "CAM-4",
        title: "Implement Email Notification System",
        userId: "usr-1",
        status: "In progress",
        priority: 3,
      },
      {
        id: "CAM-5",
        title: "Enhance Search Functionality",
        userId: "usr-5",
        status: "In progress",
        priority: 0,
      },
      {
        id: "CAM-6",
        title: "Third-Party Payment Gateway",
        userId: "usr-2",
        status: "Todo",
        priority: 1,
      },
      {
        id: "CAM-7",
        title: "Create Onboarding Tutorial for New Users",
        userId: "usr-1",
        status: "Backlog",
        priority: 2,
      },
      {
        id: "CAM-8",
        title: "Implement Role-Based Access Control (RBAC)",
        userId: "usr-3",
        status: "In progress",
        priority: 3,
      },
      {
        id: "CAM-9",
        title: "Upgrade Server Infrastructure",
        userId: "usr-5",
        status: "Todo",
        priority: 2,
      },
      {
        id: "CAM-10",
        title: "Conduct Security Vulnerability Assessment",
        userId: "usr-4",
        status: "Backlog",
        priority: 1,
      },
    ];

    const tags = tickets.map((ticket) => ({
      ticketId: ticket.id,
      tag: "Feature Request",
    }));

    await db.query("DELETE FROM tags");
    await db.query("DELETE FROM tickets");
    await db.query("DELETE FROM users");

    await Promise.all(
      users.map((user) =>
        db.query("INSERT INTO users (id, name, available) VALUES (?, ?, ?)", [
          user.id,
          user.name,
          user.available,
        ])
      )
    );

    await Promise.all(
      tickets.map((ticket) =>
        db.query(
          "INSERT INTO tickets (id, title, userId, status, priority) VALUES (?, ?, ?, ?, ?)",
          [
            ticket.id,
            ticket.title,
            ticket.userId,
            ticket.status,
            ticket.priority,
          ]
        )
      )
    );

    await Promise.all(
      tags.map((tag) =>
        db.query("INSERT INTO tags (ticketId, tag) VALUES (?, ?)", [
          tag.ticketId,
          tag.tag,
        ])
      )
    );

    res.json({ message: "Database initialized successfully" });
  } catch (error) {
    console.error("Error initializing database:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
