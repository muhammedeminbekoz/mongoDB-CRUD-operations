const { MongoClient } = require("mongodb");
require("dotenv").config();

const client = new MongoClient(process.env.DB_URI);

async function run() {
  try {
    const database = client.db('BigDataCRUD');
    const Users = database.collection('Users');

    
    async function  createUser  (name, surname,email ,password, passwordAgain){
      await Users.insertOne({name , surname , email ,password, passwordAgain})
       console.log("kullanıcı eklendi")
       
    }

   async function findUser (name){
    const user = await Users.findOne({name});
    console.log(user);
  }

  async function updateUser(filter, newValue) {
    const result = await Users.updateOne(
        { name: filter }, // filter
        { $set: { name: newValue } }, // update
        { upsert: true } // options
    );

    if (result.upsertedCount > 0) {
        console.log("Kullanıcı eklendi ");
    } else if (result.modifiedCount > 0) {
        console.log("Kullanıcı güncellendi");
    } else {
        console.log("Eşleşen kullanıcı bulunamadı");
    }
  }

  async function deleteUser(name){
    const result  = await Users.deleteOne({name});
    if(result.deletedCount == 1) {
      console.log("1 eşleşen kullanıcı silindi");
    }
    else{
      console.log("eşleşen kullanıcı yok !!!");
    }
  }

 await createUser("Emin", "Beköz", "eminbekoz6164@gmail.com", "123456","123456");
 await findUser("Emin");
 await updateUser("Emin", "Emin2");
 await findUser ("Emin2");
 await deleteUser("Emin2");
 
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);


