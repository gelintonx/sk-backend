import express,{Application} from 'express';
import dotenv from 'dotenv';
import router from './infraestructure/routes/index';
import helmet from 'helmet';
import https from 'https';
import fs from 'fs';
import cors from 'cors';
import morgan from 'morgan';




dotenv.config();

const app: Application = express();

app.set('PORT',process.env.PORT || 5000);




app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use(cors({
    origin: [
        'https://192.168.0.14:3000',
        'https://127.0.0.1:3000',
        'https://localhost:3000'
    ]
}));
app.use(helmet());

app.use(router);


https.createServer({
    cert: fs.readFileSync('keys/server.crt'),
    key: fs.readFileSync('keys/server.key')
},
app)
.listen(app.get('PORT'),() =>{
    console.log('Server is on port', app.get('PORT'));
});


