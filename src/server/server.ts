import express from 'express';
import cors from 'cors';
import path from 'path';
import { PostModel } from './schemas/post.schema.js';
import { UserModel } from './schemas/user.schema.js'
import mongoose from 'mongoose';
import Stripe from "stripe";
import AdminJSExpress from '@adminjs/express';
import AdminJS from 'adminjs';
import AdminJSMongoose from '@adminjs/mongoose'
//Registers adapter to allow adminJs to connect to mongoose
AdminJS.registerAdapter(AdminJSMongoose)

const run = async() => {
    const connection = mongoose.connect('mongodb://localhost:27017/test1')
    .then(() => {
        console.log('Connected to DB Successfully');
    })
    .catch(err => console.log('Failed to Connect to DB', err));

    const AdminJSOptions = new AdminJS({
        databases: [connection],
        rootPath: '/admin'
    })

    const router = AdminJSExpress.buildRouter(AdminJSOptions)
    app.use(AdminJSOptions.options.rootPath, router)
}

run()

const app = express();
const __dirname = path.resolve();
const PORT = 3501;





app.use(cors());
app.use(express.json());


const secret =process.env.STRIPE_SECRET_KEY as string;
export const stripe = new Stripe(secret, {
  apiVersion: "2020-08-27",
});

app.post("/create-payment", function (req, res) {
    stripe.charges.create({
        amount: req.body.amount,
        description: "Payment",
        currency: "USD",
        source: req.body.id,
      })
      .then((charge) => {
     
        res.json({charge});
      })
      .catch((err) => {
       
        res.sendStatus(501);
      });

  });

app.get('/', function(req, res) {
   res.json({message:'test'});
});

app.get('/posts', function(req,res){
    PostModel.find()
    .then(data => res.json({data}))
    .catch(err => {
        res.status(501)
        res.json({errors: err});
    })
});

app.get('/users', function(req,res){
    UserModel.find()
    .then(data => res.json({data}))
    .catch(err => {
        res.status(501)
        res.json({errors: err});
    })
});
app.post('/create-user', function(req,res){
    const {firstname, email, lastname,password,points} = req.body;
    const user = new UserModel({
        firstname,
        lastname,
        email,
        password,
        points
    });
    user.save()
    .then((data) => {
        res.json({data});
    })
    .catch(err => {
        res.status(501);
        res.json({errors: err});
    })
});

app.post('/create-post', function(req,res){
    const {title, body} = req.body;
    const post = new PostModel({
        title,
        body,
    });
    post.save()
    .then((data) => {
        res.json({data});
    })
    .catch(err => {
        res.status(501);
        res.json({errors: err});
    })
});

app.delete('/delete-user/:id', function(req, res) {
    const _id = req.params.id;
    UserModel.findByIdAndDelete(_id).then((data) => {
        console.log(data);
        res.json({data});
    });
})

app.put('/update-user/:id', function(req, res) {
    console.log("Update user");
    UserModel.findByIdAndUpdate(
        req.params.id,
        {
            $set: { name: req.body.name, email: req.body.email },
        },
        {
            new: true,
        },
        function(err, updateUser) {
            if(err) {
                res.send("Error updating user");
            }
            else{
                res.json(updateUser);
            }
        }
    )
})


app.listen(PORT, function(){
    console.log( `starting at localhost http://localhost:${PORT}`);
})
