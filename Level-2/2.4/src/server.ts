// server based on basic routes

import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
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
  id: number;
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
  id: Number,
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
    secure: false,
    maxAge: 24 * 3600 * 1000 // 1 day
  },
}));

app.post('/api/v1/login', async (req, res) => {
  try {
    const { login, pass } = req.body;

    if (!login || !pass) {
      return res.status(400).json({ ok: false, error: 'Invalid login or password' });
    }

    const user = await UserModel.findOne({ login, pass });

    if (user) {
      req.session.user = { login: user.login };

      req.session.save( async (err) => {
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

    if (!login || !pass) {
      return res.status(400).json({ ok: false, error: 'Invalid login or password' });
    }

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
  if (req.session.user) {
    next();
  } else {
    res.status(401).json({ ok: false, error: 'Unauthorized' });
  }
});

app.get('/api/v1/items', async (req: Request, res: Response) => {
    const userLogin = req.session.user?.login;
    const items: ItemModel[] = await ItemModel.find({ user: userLogin }).select({ _id: 0, __v: 0, user: 0 }).lean();
    res.json(items);
});

async function generateNewId(login: String){
  const userItems = await ItemModel.find({ user: login }).lean();
  if (userItems.length > 0) {
    const lastID = userItems[userItems.length - 1].id;
    return lastID + 1;
  }
  else{
    return 0
  }
}

app.post('/api/v1/items', async (req: Request, res: Response) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ ok: false, error: 'Invalid item text' });
  }

  const userLogin = req.session.user?.login;
  const new_id = await generateNewId(userLogin)
  const newItem = await ItemModel.create({ id: new_id, text: text, checked: false, user: userLogin });
  res.json({ id: newItem.id, text: text });  
});

app.put('/api/v1/items', async (req: Request, res: Response) => {
  try {
    const { id, text, checked } = req.body;

    if (typeof id !== 'number' || typeof text !== 'string' || typeof checked !== 'boolean') {
      return res.status(400).json({ ok: false, error: 'Invalid data types in the request payload' });
    }

    const userLogin = req.session.user?.login;
    await ItemModel.updateOne({ id: id, user: userLogin }, { text: text, checked: checked });
    res.json({ "ok" : true })
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, error: 'Internal server error' });
  }
});


app.delete('/api/v1/items', async (req: Request, res: Response) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ ok: false, error: 'Invalid item text' });
  }

  const itemIndex = await ItemModel.find({ id: id })
  if (itemIndex.length === 0) {
    res.status(404).json({ ok: false, error: 'Element not found' });
  } else {
    await ItemModel.deleteOne({ id: id })
    res.json({ ok: true });
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
