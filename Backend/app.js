const express = require('express');
const mongoose = require('mongoose');
const userRouters = require('./routers/userRouters');
const proffrouter=require('./routers/profrouter');
const sturouter=require('./routers/studentrouter');
const authMiddleWare=require('./middleware/verifytoken');
var url="mongodb+srv://nhatty:10938562@cluster0.vmevq.mongodb.net/examportal?retryWrites=true&w=majority"
const app = express();

app.set('strict routing', true);
app.set('case sensitive routing', true);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
mongoose
   .connect(url)
   .then(() => {
   })
   .catch(err => console.log(err));


app.use('/',(req,res,next)=>{
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type,  Accept, x-client-key, x-client-token, x-client-secret, Authorization" );
	if ('OPTIONS' === req.method) {
        res.send(200);
        return;
      }
	next();
	})
	
	app.use('/api/users', userRouters);
	app.use('/api/professor',authMiddleWare,proffrouter);
	app.use('/api/student',authMiddleWare,sturouter);
	




  app.listen(3000,()=>{console.log("listening 3000")});


  