import "./App.css";
import Navbar from "./components/navbar/Navbar";
import React, { useState, useEffect } from "react";
import { api } from "./services/apiService.js";
import List from "./components/list/List";

function App() {
  const [selectedGrouping, setSelectedGrouping] = useState(
    localStorage.getItem("grouping") === null
      ? "status"
      : localStorage.getItem("grouping")
  );

  const [selectedOrdering, setSelectedOrdering] = useState(
    localStorage.getItem("ordering") === null
      ? "priority"
      : localStorage.getItem("ordering")
  );

  const [apiData, setApiData] = useState({});

  const [groups, setGroups] = useState([]);

  const [sortedData, setSortedData] = useState({});

  const addGroups = (data) => {
    let groups = { status: [], user: [], priority: [] };

    data.tickets.map((ticket) => {
      if (!groups.status.includes(ticket.status)) {
        groups.status.push(ticket.status);
      }

      if (!groups.user.includes(ticket.user.name)) {
        groups.user.push(ticket.user.name);
      }

      if (!groups.priority.includes(ticket.priority)) {
        groups.priority.push(ticket.priority);
      }
    });

    setGroups(groups);
  };

  const addUserToTickets = (data) => {
    const { tickets, users } = data;

    const ticketsWithUsers = {};

    ticketsWithUsers["tickets"] = tickets.map((ticket) => {
      const user = users.find((user) => user.id === ticket.userId);
      return { ...ticket, user };
    });

    return ticketsWithUsers;
  };

  const setBoard = (data) => {
    let list = {};

    if (selectedGrouping === "priority") {
      groups.priority.map((priority) => {
        list[priority] = [];
      });
      data.tickets.map((ticket) => {
        list[ticket.priority].push(ticket);
      });
    } else if (selectedGrouping === "status") {
      groups.status.map((status) => {
        list[status] = [];
      });
      data.tickets.map((ticket) => {
        list[ticket.status].push(ticket);
      });
    } else if (selectedGrouping === "user") {
      groups.user.map((user) => {
        list[user] = [];
      });
      data.tickets.map((ticket) => {
        list[ticket.user.name].push(ticket);
      });
    }

    if (selectedOrdering === "priority") {
      for (let key in list) {
        list[key].sort((a, b) => {
          return a.priority - b.priority;
        });
      }
    } else if (selectedOrdering === "title") {
      for (let key in list) {
        list[key].sort((a, b) => {
          const titleA = a.title.toLowerCase();
          const titleB = b.title.toLowerCase();

          if (titleA < titleB) {
            return -1;
          } else if (titleA > titleB) {
            return 1;
          } else {
            return 0;
          }
        });
      }
    }

    setSortedData(list);
  };

  useEffect(() => {
    const getData = async () => {
      const data = await api();
      const updateData = addUserToTickets(data);
      setApiData(updateData);
      addGroups(updateData);
    };
    getData();
  }, []);

  useEffect(() => {
    if (Object.keys(apiData).length !== 0) {
      setBoard(apiData);
    }
  }, [selectedGrouping, selectedOrdering, apiData]);

  return (
    <div className="app">
      <div className="wrapper">
        <Navbar
          setSelectedGrouping={setSelectedGrouping}
          setSelectedOrdering={setSelectedOrdering}
          selectedGrouping={selectedGrouping}
          selectedOrdering={selectedOrdering}
        />
        <p>{selectedGrouping}</p>
        <p>{selectedOrdering}</p>
        <List sortedData={sortedData} />
      </div>
    </div>
  );
}

export default App;
