import express from 'express';
import session from 'express-session';
import connectMongo from 'connect-mongodb-session';

const app = express();
const port = 3000;

const MongoStore = connectMongo(session);

const sessionMiddleware = session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({
    uri: 'mongodb+srv://andriismeliantsev:2007as01AS@nodejs-course.wqxddqz.mongodb.net/',
  }),
});

app.use(sessionMiddleware);

// Your login route
app.post('/login', (req, res) => {
  const { username } = req.body;

  // Save user information in the session
  req.session.username = username;

  res.send('Login successful');
});

// Your logout route
app.get('/logout', (req, res) => {
  // Check if the user is authenticated
  if (req.session?.username) {
    // Clear the session
    req.session.destroy((err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      } else {
        res.send('Logout successful');
      }
    });
  } else {
    res.status(401).send('Unauthorized');
  }
});

// Protected route example
app.get('/profile', (req, res) => {
  // Check if the user is authenticated
  if (req.session.username) {
    const username = req.session.username;
    res.send(`Welcome, ${username}!`);
  } else {
    res.status(401).send('Unauthorized');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
