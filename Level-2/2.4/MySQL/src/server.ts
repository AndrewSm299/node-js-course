import express, { Request, Response, NextFunction } from 'express';
import * as mysql from 'mysql2/promise';
import session from 'express-session';
import MySQLStore from 'express-mysql-session';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

let { v4: uuidv4 } = require('uuid');
const secret_key = uuidv4();

const dbConfig = {
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: '2007as01AS/',
  database: 'TODOS',
};

async function connect() {
  const connection = await mysql.createPool(dbConfig);
  console.log('Connected to MySQL database');
  return connection;
}

const MySQLStoreInstance = MySQLStore(session as any);

const sessionStore = new MySQLStoreInstance({
  expiration: 24 * 3600 * 1000, // 1 day
  createDatabaseTable: true,
  schema: {
    tableName: 'sessions',
    columnNames: {
      session_id: 'session_id',
      expires: 'expires',
      data: 'data',
    },
  },
}, connect as any);

app.use(session({
  store: sessionStore,
  secret: secret_key,
  resave: false,
  saveUninitialized: false,
  cookie: {
    sameSite: 'none',
    secure: false,
    maxAge: 24 * 3600 * 1000, // 1 day
  },
}));


app.use(bodyParser.json());

app.post('/api/v1/login', async (req, res) => {
  try {
    const { login, pass }: any = req.body;

    if (!login || !pass) {
      return res.status(400).json({ ok: false, error: 'Invalid login or password' });
    }

    const connection = await connect();

    const [rows] = await connection.execute('SELECT * FROM users WHERE login = ? AND password = ?', [login, pass]);
    console.log(rows)
    // const user = rows[0]

    // if (user) {
    //   req.session.user = { login: user.login };

    //   req.session.save( async (err) => {
    //     if (err) {
    //       console.error(err);
    //       return res.status(500).json({ ok: false, error: 'Error saving session' });
    //     }
    //     res.json({ ok: true });
    //   });
    // } else {
    //   res.status(401).json({ ok: false, error: 'Invalid credentials' });
    // }
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
    const connection = await mysql.createConnection(dbConfig);

    const [rows] = await connection.execute<mysql.RowDataPacket[]>('SELECT * FROM users WHERE login = ?', [login]);

    if (rows[0].count == 0 || rows[0].count < 0 || rows[0].count == undefined) {
      const connection = await mysql.createConnection(dbConfig);

      await connection.execute('INSERT INTO users (login, password) VALUES (?, ?)', [login, pass]);
      res.json({ ok: true });
    } 
    else {
      res.status(400).json({ ok: false, error: 'User already exists' });
    }
    connection.end()
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, error: 'Internal server error' });
  }
});

// app.use((req, res, next) => {
//   if (req.session.user) {
//     next();
//   } else {
//     res.status(403).json({ ok: false, error: 'forbidden' });
//   }
// });

// app.get('/api/v1/items', async (req: Request, res: Response) => {
//     const userLogin = req.session.user?.login;
//     const items: ItemModel[] = await ItemModel.find({ user: userLogin }).select({ _id: 0, __v: 0, user: 0 }).lean();
//     res.json(items);
// });

// async function generateNewId(login: String){
//   const userItems = await ItemModel.find({ user: login }).lean();
//   if (userItems.length > 0) {
//     const lastID = userItems[userItems.length - 1].id;
//     return lastID + 1;
//   }
//   else{
//     return 0
//   }
// }

// app.post('/api/v1/items', async (req: Request, res: Response) => {
//   const { text } = req.body;

//   if (!text) {
//     return res.status(400).json({ ok: false, error: 'Invalid item text' });
//   }

//   const userLogin = req.session.user?.login;
//   const new_id = await generateNewId(userLogin)
//   const newItem = await ItemModel.create({ id: new_id, text: text, checked: false, user: userLogin });
//   res.json({ id: newItem.id, text: text });  
// });

// app.put('/api/v1/items', async (req: Request, res: Response) => {
//   try {
//     const { id, text, checked } = req.body;

//     if (typeof id !== 'number' || typeof text !== 'string' || typeof checked !== 'boolean') {
//       return res.status(400).json({ ok: false, error: 'Invalid data types in the request payload' });
//     }

//     const userLogin = req.session.user?.login;
//     await ItemModel.updateOne({ id: id, user: userLogin }, { text: text, checked: checked });
//     res.json({ "ok" : true })
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ ok: false, error: 'Internal server error' });
//   }
// });


// app.delete('/api/v1/items', async (req: Request, res: Response) => {
//   const { id } = req.body;

//   if (!id) {
//     return res.status(400).json({ ok: false, error: 'Invalid item text' });
//   }

//   const itemIndex = await ItemModel.find({ id: id })
//   if (itemIndex.length === 0) {
//     res.status(404).json({ ok: false, error: 'Element not found' });
//   } else {
//     await ItemModel.deleteOne({ id: id })
//     res.json({ ok: true });
//   }
// });

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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
