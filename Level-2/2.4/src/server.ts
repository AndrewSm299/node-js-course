import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import session from 'express-session';
import mongoose from 'mongoose';
import connectMongo from 'connect-mongodb-session';

const MongoDBStore = connectMongo(session);
const mongoDBStore = new MongoDBStore({
  uri: 'mongodb://localhost:27017/sessions',
  collection: 'sessions',
});

interface User {
  login: string;
  pass: string;
  items: [string]
}
interface Item {
  _id: mongoose.Types.ObjectId;
  text: string;
  checked: boolean;
  user: string;
}

interface ItemModel extends Item, Document {}

declare module 'express-session' {
  export interface SessionData {
    user: { [key: string]: any };
  }
}

let { v4: uuidv4 } = require('uuid');

const app: Application = express();

mongoose.connect('mongodb://localhost:27017');

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

mongoose.connection.on('disconnected', () => {
  console.log('Disconnected from MongoDB');
});

const UserSchema = new mongoose.Schema<User>({
  login: String,
  pass: String,
});

const ItemSchema = new mongoose.Schema<ItemModel>({
  text: String,
  checked: Boolean,
  user: String,
});

const ItemModel = mongoose.model<ItemModel>('Item', ItemSchema);
const UserModel = mongoose.model<User>('User', UserSchema);

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:8080',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true 
}));

const secret_key = uuidv4()

app.use(session({
  store: mongoDBStore,
  secret: secret_key,
  resave: false,
  saveUninitialized: false,
  cookie:{
    sameSite: 'none',
    secure: true,
    maxAge: 24 * 3600 * 1000 // 1 day
  },
}));

const dataFilePath: string = './data.json';

const initDataFile = () => {
  try {
    if (!fs.existsSync(dataFilePath)) {
      fs.writeFileSync(dataFilePath, JSON.stringify([]));
    }
    const fileData = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(fileData);
  } catch (error) {
    console.error('Error parsing JSON data file:', error);
    return [];
  }
};

let items: { id: number; text: string; checked: boolean }[] = initDataFile();

app.post('/api/v1/login', async (req, res) => {
  try {
    const { login, pass } = req.body;
    const user = await UserModel.findOne({ login, pass });

    if (user) {
      req.session.user = { login: user.login };
        
      console.log('User set during login:', req.session.user.login);
      console.log('Session:', req.sessionID);

      req.session.save((err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ ok: false, error: 'Error saving session' });
        }
        res.json({ ok: true });
      });
    } else {
      res.status(401).json({ ok: false, error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, error: 'Internal server error' });
  }
});

app.post('/api/v1/register', async (req: Request, res: Response) => {
  try {
    const { login, pass } = req.body;
    if (await UserModel.findOne({ login })) {
      res.status(400).json({ ok: false, error: 'User already exists' });
    } 
    else {
      const newUser = new UserModel({ login, pass });
      await newUser.save();
      res.json({ ok: true });
    }
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, error: 'Internal server error' });
  }
});

app.use((req, res, next) => {
  console.log('Session:', req.sessionID);
  console.log('User:', req.session.user?.login);
  
  if (req.session.user) {
    next();
  } else {
    res.status(401).json({ ok: false, error: 'Unauthorized' });
  }
});

app.get('/api/v1/items', async (req: Request, res: Response) => {
    const userLogin = req.session.user?.login;
    const items: ItemModel[] = await ItemModel.find({ user: userLogin }).lean();
    res.json(items);
});

app.post('/api/v1/items', async (req: Request, res: Response) => {
  const { text } = req.body;
  const userLogin = req.session.user?.login;
  const newItem = await ItemModel.create({ text, checked: false, user: userLogin });
  res.json({ id: newItem._id });
});

app.put('/api/v1/items', async (req: Request, res: Response) => {
  try {
    const { id, text, checked } = req.body;
    const userLogin = req.session.user?.login;

    const result = await ItemModel.updateOne({ _id: id, user: userLogin }, { text, checked });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, error: 'Internal server error' });
  }
});


app.delete('/api/v1/items', (req: Request, res: Response) => {
  const { id } = req.body;

  const itemIndex = items.findIndex((item) => item.id === id);

  if (itemIndex !== -1) {
    items.splice(itemIndex, 1);

    fs.writeFileSync(dataFilePath, JSON.stringify(items));

    res.json({ ok: true });
  } 
  else {
    res.status(404).json({ ok: false, error: 'Element not found' });
  }
});

app.post('/api/v1/logout', (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ ok: false, error: 'Error logging out' });
      }
      res.json({ ok: true });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, error: 'Internal server error' });
  }
});

const port: number = 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// сделать запись сессий на монгу и получение данных с нее, посмотреть исправиться ли оно
