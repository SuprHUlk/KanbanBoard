CREATE DATABASE IF NOT EXISTS kanban_board;
USE kanban_board;

CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(10) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    available BOOLEAN DEFAULT true
);

CREATE TABLE IF NOT EXISTS tickets (
    id VARCHAR(10) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    userId VARCHAR(10),
    status ENUM('Backlog', 'Todo', 'In progress', 'Done', 'Cancel') NOT NULL,
    priority INT NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS tags (
    ticketId VARCHAR(10),
    tag VARCHAR(50),
    PRIMARY KEY (ticketId, tag),
    FOREIGN KEY (ticketId) REFERENCES tickets(id)
);