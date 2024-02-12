import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

enum Button {
    Plus = "Plus",
    Minus = "Minus"
}

let pluscounter = 0
let minuscounter = 0

app.post('/counter', (req: Request, res: Response) => {
    const option = req.body.option
    if(option === Button.Plus){
        pluscounter += 1
    }
    else if (option === Button.Minus){
        minuscounter += 1
    }
    else{
        res.status(400).json({ error: 'Invalid request body' });
    }
    res.send([minuscounter, pluscounter]);
});

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});