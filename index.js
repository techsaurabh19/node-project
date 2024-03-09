const express = require("express");
const mongoose = require("mongoose");
const fs = require('fs')
const multer = require("multer");
const cors = require("cors");
var bcrypt = require('bcryptjs');
const { ObjectId } = require("mongoose").Types;


const app = express();
app.use(express.json());
app.use(cors());

require("./db_api/config")
const { ownerModel, petModel, VaccinationDetails, DewormingDetails, PrescriptionDetails } = require("./db_api/schema")
app.use("/excel",require('./controller/excelController'))
app.use("/detail",require('./controller/detailController'))



//>>>>>>>>>funtions start......................


const upload = multer({

    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "uploads")
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + "-" + Date.now() + ".jpg")
        }
    })
}).single("image");
app.post("/profile", upload, (req, res) => {
    res.send("file upload")
});

const bcryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)
    console.log(hashedPassword)
    return hashedPassword;
}
const decryptPassword = async (getpassword, userpassword) => {
    const validPass = await bcrypt.compare(getpassword, userpassword)
    return validPass;
}


//<<<<<<<<< function end..........................

//*............................................INFINITE......................................................**//

//<<<<<<<<< API Start..........................

/******************************* Owener Details******************************* */
app.post('/ownerDtails', async (req, res) => {
    console.log("http://localhost:2000/ownerDtails")

    try {
      const newOwner = new ownerModel(req.body);
      await newOwner.save();
      res.status(201).json(newOwner);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
});

app.get('/ownerDetails/:mobile', async (req, res) => {
    try {
      const owner = await ownerModel.findOne({ mobile: req.params.mobile });
  
      if (!owner) {
        return res.status(404).json({ message: 'Owner not found' });
      }
  
      const petDetails = await petModel.findOne({  owner_id: req.body._id });
  
      const responseData = {
        owner: owner,
        pet: petDetails,
      };
  
      res.status(200).json(responseData);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
});
  
/******************************* Pet Details******************************* */
app.post('/petDetails', async (req, res) => {
    console.log("http://localhost:2000/petDetails")

    try {
      const petDetails = req.body;
  
      if (!petDetails.pet_name || !petDetails.Reg_number || !petDetails.breed || !petDetails.dob || !petDetails.gender) {
        return res.status(400).json({ message: 'All fields are required' });
      }
  
      const existingPet = await petModel.findOne({ Reg_number: petDetails.Reg_number });
      if (existingPet) {
        return res.status(400).json({ message: 'Reg_number already exists' });
      }
  
      const newPet = new petModel(petDetails);
      await newPet.save();
  
      res.status(201).json({ message: 'Pet details saved successfully', data: newPet });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/owner/:mobile', async (req, res) => {
    console.log("http://localhost:2000/owner/:mobile")

    try {
      const owner = await ownerModel.findOne({ mobile: req.params.mobile });
      if (!owner) {
        return res.status(400).json({ message: 'Owner not found' });
      }
  
      const pets = await petModel.find({ owner_id: owner._id });
      
      res.status(200).json({ owner, pets });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });


/******************************* vaccination Details******************************* */

app.post('/vaccinationDetails', async (req, res) => {
    console.log("http://localhost:2000/vaccinationDetails")

    try {
      const newOwner = new VaccinationDetails(req.body);
      await newOwner.save();
      res.status(201).json(newOwner);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
});


app.post('/dewormingDetails', async (req, res) => {
    console.log("http://localhost:2000/dewormingDetails")

    try {
      const newOwner = new DewormingDetails(req.body);
      await newOwner.save();
      res.status(201).json(newOwner);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
});


app.post('/prescriptionDtails', async (req, res) => {
    console.log("http://localhost:2000/prescriptionDtails")

    try {
      const newOwner = new PrescriptionDetails(req.body);
      await newOwner.save();
      res.status(201).json(newOwner);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
});


app.post('/getPetDetailsWithownerAndVaccPres', async (req, res) => {
    console.log("http://localhost:2000/getPetDetailsWithownerAndVaccPres")
    try {
      let petId = req.body.pet_id;
      let result = await petModel.aggregate([
            { $match : {"_id" :new ObjectId(petId)}} ,

            {
                $lookup:{ 
                    from: 'owners', 
                    localField:'owner_id', 
                    foreignField:'_id',
                    as:'owner_details'
                }
            },
            { $unwind:"$owner_details"},

            {
                $lookup:{ 
                    from: 'vaccination_details', 
                    localField:'_id', 
                    foreignField:'pet_id',
                    as:'vaccination_details'
                }
            },
            { $unwind:"$vaccination_details"},

            {
                $lookup:{ 
                    from: 'deworming_details', 
                    localField:'_id', 
                    foreignField:'pet_id',
                    as:'deworming_details'
                }
            },
            { $unwind:"$deworming_details"},

            {
                $lookup:{ 
                    from: 'prescription_details', 
                    localField:'_id', 
                    foreignField:'pet_id',
                    as:'prescription_details'
                }
            },
            { $unwind:"$prescription_details"},
       ])
       res.status(201).json(result);
    
    } catch (error) {
        console.log(error);
      res.status(400).json({ message: error.message });
    }
});








app.listen((2000), () => {
    console.log("app is running on port 2000")
})