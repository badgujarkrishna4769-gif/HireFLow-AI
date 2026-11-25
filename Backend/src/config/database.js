const mongoose = require("mongoose");

async function connectToDb() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to Database.")
    }catch(err) {
        console.log(err, "There was an error connecting to database.")
    }
}

module.exports = connectToDb;