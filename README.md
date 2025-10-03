# Node.js Todo Application

A simple todo app with authentication, built using Node.js, Express, MongoDB, and EJS.

## Features
- User registration and login
- Tasks with states: pending, completed, deleted
- Sort/filter tasks
- Error handling and logging
- Simple UI

## Setup
1. Clone the repo and run `npm install`
2. Set up your `.env` file (see sample)
3. Start MongoDB locally or use a cloud URI
4. Run the app: `npm start` or `nodemon app.js`

## Testing
Add your tests in the `/tests` folder.

## Hosting
Deploy to platforms like Render or Pipeops.

### Deploying to Render

1. Create a new Web Service on Render and connect your GitHub repository.
2. Set the build command to: `npm install`
3. Set the start command to: `node app.js` (or `npm start` if defined).
4. Add environment variables on Render: `MONGO_URI`, `SESSION_SECRET`, and `PORT` (optional).
5. Deploy. Render will build and start your app.

Notes:
- If you use a managed MongoDB (Atlas), set `MONGO_URI` to the connection string.
- For HTTPS and custom domains, follow Render DNS instructions in the dashboard.

## ER Diagram
Use [drawSQL](https://drawsql.app) to visualize user-task relationships.
