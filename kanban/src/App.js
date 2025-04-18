import "./App.css";
import Navbar from "./components/navbar/Navbar";
import React, { useEffect } from "react";
import { api } from "./services/apiService.js";
import List from "./components/list/List";
import { useSelector, useDispatch } from "react-redux";
import { setApiData, setGroups, setSortedData } from "./store/kanbanSlice";

function App() {
  const dispatch = useDispatch();
  const {
    grouping: selectedGrouping,
    ordering: selectedOrdering,
    apiData,
    groups,
  } = useSelector((state) => state.kanban);

  const addGroups = (data) => {
    let groups = { status: [], user: [], priority: [] };

    data.tickets.forEach((ticket) => {
      if (!groups.status.includes(ticket.status)) {
        groups.status.push(ticket.status);
      }

      const user = data.users.find((u) => u.id === ticket.userId);
      if (user && !groups.user.includes(user.name)) {
        groups.user.push(user.name);
      }

      if (!groups.priority.includes(ticket.priority)) {
        groups.priority.push(ticket.priority);
      }
    });

    groups.status.push("Done");
    groups.status.push("Cancel");

    dispatch(setGroups(groups));
  };

  const addUserToTickets = (data) => {
    const { tickets, users } = data;
    return {
      tickets: tickets.map((ticket) => ({
        ...ticket,
        user: users.find((user) => user.id === ticket.userId) || {
          id: ticket.userId,
          name: "Unknown",
          available: false,
        },
      })),
    };
  };

  const setBoard = (data) => {
    let list = {};

    if (selectedGrouping === "priority") {
      groups.priority.forEach((priority) => {
        list[priority] = [];
      });

      data.tickets.forEach((ticket) => {
        list[ticket.priority].push(ticket);
      });
    } else if (selectedGrouping === "status") {
      groups.status.forEach((status) => {
        list[status] = [];
      });
      data.tickets.forEach((ticket) => {
        list[ticket.status].push(ticket);
      });
    } else if (selectedGrouping === "user") {
      groups.user.forEach((user) => {
        list[user] = [];
      });
      data.tickets.forEach((ticket) => {
        if (ticket.user) {
          list[ticket.user.name].push(ticket);
        }
      });
    }

    if (selectedOrdering === "priority") {
      for (let key in list) {
        list[key].sort((a, b) => b.priority - a.priority);
      }
    } else if (selectedOrdering === "title") {
      for (let key in list) {
        list[key].sort((a, b) => {
          const titleA = a.title.toLowerCase();
          const titleB = b.title.toLowerCase();
          return titleA < titleB ? -1 : titleA > titleB ? 1 : 0;
        });
      }
    }
    dispatch(setSortedData(list));
  };

  useEffect(() => {
    const getData = async () => {
      const data = await api();
      const updateData = addUserToTickets(data);
      dispatch(setApiData(updateData));
      addGroups(data);
    };
    getData();
  }, [dispatch]);

  useEffect(() => {
    if (Object.keys(apiData).length !== 0) {
      setBoard(apiData);
    }
  }, [selectedGrouping, selectedOrdering, apiData, groups, dispatch]);

  return (
    <div className="app">
      <Navbar />
      <div className="cont">
        <List selectedGrouping={selectedGrouping} />
      </div>
    </div>
  );
}

export default App;
