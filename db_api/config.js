



  const mongoose = require('mongoose')

const url = "mongodb+srv://spc:QiKwsUnE1cDT9uOv@singhalpetcare.k7bkrw0.mongodb.net/spc";

const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true ,
    
}
mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);

    })
