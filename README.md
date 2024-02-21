# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

The Hydration App is a simple application for tracking water intake, allowing users to log their daily hydration levels. It provides features to add, view, update, and delete hydration logs.

## Table of Contents

- [Hydration Tracker App](#hydration-tracker-app)
  - [Overview](#overview)
  - [Table of Contents](#table-of-contents)
  - [Getting Started](#getting-started)
    - [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Setup](#setup)
  - [Configure the Database](#configure-the-database)
  - [Running the App](#running-the-app)
  - [Usage](#usage)
    - [Prisma | Docker](#prisma--docker)
    - [Logging Water Intake](#logging-water-intake)
    - [Viewing Hydration Logs](#viewing-hydration-logs)
    - [Updating and Deleting Logs](#updating-and-deleting-logs)
  - [Folder Structure](#folder-structure)
  - [Dependencies](#dependencies)
  - [Contributing](#contributing)
  - [License](#license)

## Getting Started

### Installation

This document provides instructions on how to run the Hydration App.

## Prerequisites

Make sure you have the following prerequisites installed on your machine:

- [Node.js](https://nodejs.org/) (v14.0.0 or higher)
- [npm](https://www.npmjs.com/) (v6.0.0 or higher)
- [Prisma](https://www.prisma.io/docs/getting-started/installation) (for the server)

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/hydration-tracker.git
   ```

2. Navigate to the project directory:

   ```bash
   cd hydration-tracker
   ```

3. Install dependencies for the client:

   ```bash
   cd src
   npm install
   ```

4. Install dependencies for the server:

   ```bash
   cd ../server
   npm install
   ```

## Configure the Database

1. In the `server/prisma` directory, create a new file named `.env` and configure your database connection. You can use the `.env.example` file as a template.

2. Run the Prisma migrations to set up the database schema:

   ```bash
   npx prisma migrate dev
   ```

## Running the App

1. Start the server:

   ```bash
   cd ../server
   npm start
   ```

2. Open a new terminal and start the client:

   ```bash
   cd ../client
   npm run dev
   ```

3. Access the server in your web browser at [http://localhost:3000](http://localhost:3000).

## Usage

- Log your water intake using the provided form.
- View and manage your hydration logs.
- Update and delete hydration logs as needed.

Feel free to customize the app according to your preferences or project requirements.

Happy hydrating!

### Prisma | Docker

`npx prisma migrate dev
npx prisma migrate deploy
sudo docker-compose build
sudo docker-compose up

docker build -t <image_name>:<tag> .

docker stop <container_id or container_name>
docker rm <container_id or container_name>

docker run -d --name <container_name> -p <host_port>:<container_port> <image_name>:<tag>

docker tag <image_name>:<tag> <registry_url>/<image_name>:<tag>
docker push <registry_url>/<image_name>:<tag>

docker run -p 3000:3000 hydration
`

### Logging Water Intake

1. Open the app in your browser.
2. Use the "Log Your Water Intake" form to enter the amount of water you've consumed in milliliters.
3. Click the "Log Water Intake" button to submit the form.

### Viewing Hydration Logs

1. Navigate to the "Hydration Logs" section of the app.
2. The app will display a list of hydration logs, showing the intake amount and timestamp.

### Updating and Deleting Logs

1. In the "Hydration Logs" section, find the log you want to update or delete.
2. Click the "Update" button to modify the log's details.
3. To delete a log, click the "Delete" button.

## Folder Structure

```
hydration-tracker/
|-- server/
|   |-- app.js
|   |-- prisma/
|       |-- schema.prisma
|-- src/
|   |-- components/
|       |-- HydrationForm.jsx
|       |-- HydrationLogs.jsx
|       |-- HydrationUpdateForm.jsx
|   |-- context/
|       |-- HydrationContext.js
|   |-- App.jsx
|-- .env
|-- package.json
|-- README.md
```

## Dependencies

- **express**: Web server framework for Node.js.
- **prisma**: Database toolkit for Node.js.
- **react**: JavaScript library for building user interfaces.
- **react-dom**: React package for working with the DOM.
- **hydration-converter**: simple ml/cup converter.
- **react-toggle-dark-mode**: cool toggle css animation.
- (other dependencies coming soon...)

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## License

This project is licensed under the MIT License.
