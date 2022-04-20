import express from 'express';
import cors from 'cors';
import path from 'path';
import { PostModel } from './schemas/post.schema.js';
import { AdminModel } from './schemas/admin.schema.js';
import { UserModel } from './schemas/user.schema.js';
import { OrderItemModel } from './schemas/orderItems.schema.js';
import { OrdersModel } from './schemas/orders.schema.js';
import { MenuItemModel } from './schemas/menuItems.schema.js';
import { CategoryModel } from './schemas/category.schema.js';
import { IngredientsModel } from './schemas/ingredients.schema.js';
import mongoose, {ObjectId} from 'mongoose';
import Stripe from "stripe";
import AdminJSExpress from "@adminjs/express";
import AdminJS from "adminjs";
import AdminJSMongoose from "@adminjs/mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
import uploadFeature from "@adminjs/upload";
//Registers adapter to allow adminJs to connect to mongoose
AdminJS.registerAdapter(AdminJSMongoose);

const app = express();
const __dirname = path.resolve();
const PORT = 3501;
const saltRounds = 10;
dotenv.config()
const access_secret = process.env.ACCESS_TOKEN_SECRET as string;

const run = async() => {
    //Moved mongoose connection inside of this for adminJS to use
    const connection = await mongoose.connect("mongodb://localhost:27017/restaurant")

    
    const AdminJSOptions = new AdminJS({
        resources: [{
            resource: AdminModel,
            options: {
                properties: {
                    encryptedPassword: {
                        isVisible: false,
                    },
                    password: {
                        type: 'string',
                        isVisible: {
                            list: false, edit: true, filter: false, show: false
                        },
                    },
                },
                actions: {
                    new: {
                        before: async (req: any) => {
                            if(req.payload.password) {
                                req.payload = {
                                    ...req.payload,
                                    encryptedPassword: await bcrypt.hash(req.payload.password, 10),
                                    password: undefined,
                                }
                            }
                            return req
                        },
                    }
                }
              },
            },{
              resource: MenuItemModel,
              features: [
                uploadFeature({
                  provider: { local: { bucket: "public" } },
                  properties: {
                    key: "userKey",
                    file: "file upload",
                    filesToDelete: "userFilesToDelete",
                    filePath: 'menu',
                    bucket: undefined,
                    mimeType: undefined,
                    size: undefined,
                    filename: undefined,
                  },
                }),
              ],
            },
            CategoryModel,
            IngredientsModel,
          ],
          rootPath: "/admin",
          //branding is the look of adminjs so i changed our company names, removed a logo, and added our 'logo'
          branding: {
            companyName: "SAM Restaurant",
            softwareBrothers: false,
            logo: "https://www.panerabread.com/content/dam/panerabread/menu-omni/integrated-web/branding/panera-bread-logo-no-mother-bread.svg",
          },
        });
          
        
      
  //creates an adminJS autheticated router to actually check user login
  const router = AdminJSExpress.buildAuthenticatedRouter(AdminJSOptions, {
    authenticate: async (email, password) => {
      const admin = await AdminModel.findOne({ email });
      if (admin) {
        const matched = await bcrypt.compare(password, admin.encryptedPassword);
        if (matched) {
          return admin;
        }
      }
      return false;
    },
    //cookie stuff im not too sure how it works either
    cookiePassword: "some-secret-key",
  });
  //just calling on the options we've specified and using the router
  app.use(AdminJSOptions.options.rootPath, router);
};

run();

mongoose.connect("mongodb://localhost:27017/restaurant")

app.use(cors());
app.use(express.json());

const secret = process.env.STRIPE_SECRET_KEY as string;
export const stripe = new Stripe(secret, {
  apiVersion: "2020-08-27",
});

// const path = require('path');

app.use('/public', express.static('public'))


app.post("/create-payment", function (req, res) {
  stripe.charges
    .create({
      amount: req.body.amount,
      description: "Payment",
      currency: "USD",
      source: req.body.id,
    })
    .then((charge) => {
      res.json({ charge });
    })
    .catch((err) => {
      res.sendStatus(501);
    });
});

app.get("/", function (req, res) {
  res.json({ message: "test" });
});

app.get("/posts", function (req, res) {
  PostModel.find()
    .then((data) => res.json({ data }))
    .catch((err) => {
      res.status(501);
      res.json({ errors: err });
    });
});

app.get("/users", function (req, res) {
  UserModel.find()
    .then((data) => res.json({ data }))
    .catch((err) => {
      res.status(501);
      res.json({ errors: err });
    });
});

app.get("/menu-items/:category", function (req, res) {
  MenuItemModel.aggregate([
    {$unwind:'$category'},
    {$match:{'category':new mongoose.Types.ObjectId(req.params.category)}}
  ]).exec()
  .then(data => res.json({data}))
});

app.get("/:menuid/ingredients", function (req, res) {
  console.log(req.params.menuid)
MenuItemModel.findById(req.params.menuid)
.populate('ingredients')
  .then((data: any) => res.json({ data}))
  .catch((err: any) => {
    res.status(501);
    res.json({ errors: err });
  });
});


// app.get("/ingredients/:id", function (req, res) {
//   console.log(req.params.id)
// MenuItemModel.findById(req.params.id)
// .populate('ingredients')
//   .then((data: any) => res.json({ data:data.ingredients}))
//   .catch((err: any) => {
//     res.status(501);
//     res.json({ errors: err });
//   });
// });

app.get("/category", function (req, res) {
  CategoryModel.find()
    .then((data: any) => res.json({ data }))
    .catch((err: any) => {
      res.status(501);
      res.json({ errors: err });
    });
});



app.post("/create-user", function (req, res) {
  const { firstname, email, lastname, password, points } = req.body;
  bcrypt.genSalt(saltRounds, function(err: any, salt: number | string) {
    bcrypt.hash(password, salt, async function(err, hash) {
      const user = new UserModel({
        firstname,
        lastname,
        email,
        password: hash,
        points
      })
      user
      .save()
      .then((data: any) => {
        res.json({ data });
      })
      .catch((err: any) => {
        res.status(501);
        res.json({ errors: err });
      });
    })
  })
})

app.post("/login", function (req, res) {
  const { email, password } = req.body;

  UserModel.findOne({ email }).then((user) => {
    bcrypt.compare(password, `${user?.password}`, function(err, result) {
      if(result) {
        const accessToken = jwt.sign({ user }, access_secret);
        res.cookie("jwt", accessToken, {
          httpOnly: true,
          maxAge: 60 * 5 * 1000,
        });
        res.json({message: 'Successfully logged in'})
      } else {
        res.sendStatus(502)
      }
    })
  })
  .catch((err) => {
    return res.sendStatus(404);
  })
})

app.get("/orders", function (req, res) {
  OrdersModel.find(req.body.user._id)
    .then((data: any) => res.json({ data }))
    .catch((err: any) => {
      res.status(501);
      res.json({ errors: err });
    });
});

app.post("/create-post", function (req, res) {
  const { title, body } = req.body;
  const post = new PostModel({
    title,
    body,
  });
  post
    .save()
    .then((data) => {
      res.json({ data });
    })
    .catch((err) => {
      res.status(501);
      res.json({ errors: err });
    });
});

app.delete("/delete-user/:id", function (req, res) {
  const _id = req.params.id;
  UserModel.findByIdAndDelete(_id).then((data) => {
    console.log(data);
    res.json({ data });
  });
});

app.put("/update-user/:id", function (req, res) {
  console.log("Update user");
  UserModel.findByIdAndUpdate(
    req.params.id,
    {
      $set: { name: req.body.name, email: req.body.email },
    },
    {
      new: true,
    },
    function (err, updateUser) {
      if (err) {
        res.send("Error updating user");
      } else {
        res.json(updateUser);
      }
    }
  );
});

app.listen(PORT, function () {
  console.log(`starting at localhost http://localhost:${PORT}`);
});
