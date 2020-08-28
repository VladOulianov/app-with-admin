// const mongoose = require('mongoose')
// //const MongoClient = require('mongodb').MongoClient;
// const connectDB = async () =>{
//     try {
//         const conn = await mongoose.connect(process.env.MONGO_URI,{
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//             useFindAndModify: false
//         })

//         console.log(`MongoDB Connected: ${conn.connection.host}`);
//     } catch (err){
//         console.log(err);
//         process.exit(1)
//     }
// }
// module.exports = connectDB
const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })

    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

module.exports = connectDB
// const uri = "mongodb+srv://nicolas1234:<password>@cluster0.y10iw.mongodb.net/<dbname>?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });