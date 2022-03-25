const mongoose = require("mongoose")

exports.connectDb = (callback) => {
    const dbUrl = "mongodb+srv://user_hamzah:user_access@cluster.fcrpy.mongodb.net/jomaatexgreeting?authSource=admin&replicaSet=atlas-dyis08-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true"
    console.log(dbUrl)
    mongoose
        .connect(`${dbUrl}`, )
        .then(() => {
            console.log("Database connected")
            callback()
        })
        .catch((error) => {
            console.log("Couldn't Connect to Database")
            console.error(error)
        })
}