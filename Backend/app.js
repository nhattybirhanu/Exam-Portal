const express = require('express');
const mongoose = require('mongoose');
const userRouters = require('./routers/userRouters');
const proffrouter = require('./routers/profrouter');
const examRouters = require('./routers/examRouters');
const authMiddleWare = require('./middleware/verifytoken');
var url =
   'mongodb+srv://nhatty:10938562@cluster0.vmevq.mongodb.net/examportal?retryWrites=true&w=majority';

const app = express();

app.set('strict routing', true);
app.set('case sensitive routing', true);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
mongoose
   .connect(url)
   .then(() => {})
   .catch(err => console.log(err));

app.use('/', (req, res, next) => {
   res.header('Access-Control-Allow-Origin', '*');
   res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
   res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type,  Accept, x-client-key, x-client-token, x-client-secret, Authorization'
   );
   next();
});
app.use('/api/users', userRouters);
app.use('/api/proffesior', authMiddleWare, proffrouter);
app.use('/api/exams', examRouters);

app.listen(3000, () => {
   console.log('listening 3000');
});
