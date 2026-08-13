const mongoose = require("mongoose");

const ConnectedDB = async () => {
    try {

        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDb Connected Successfully");

    } catch (error) {

        console.log("Error Connection Failed",error);

    }
}

module.exports = ConnectedDB;