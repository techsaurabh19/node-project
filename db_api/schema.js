
const mongoose = require("mongoose");
// const ObjectId = require('mongoose').Types.ObjectId;
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;



const petSchema=mongoose.Schema({
    pet_name:{type:String,required:true},
    Reg_number:{type:String,required:true,unique:true},
    breed:{type:String,required:true},
    dob:{type:String,required:true},
    species:{type:String},
    gender:{type:String,required:true},
    owner_id:{type:Number},
    color:{type:String,require:true},
    created: { type: String, default: new Date() },
    modified: { type: String, default: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}` }
})
var petModel = mongoose.model("pet", petSchema);

const ownerSchema=mongoose.Schema({
    owner_id:{type:Number,ref:petModel},
    name:{type:String,required:true},
    mobile:{type:String,required:true},
    email:{type:String},
    area:{type:String,required:true},
    address:{type:String,required:true},
    created: { type: String, default: new Date() },
    modified: { type: String, default: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}` }

})
ownerModel = mongoose.model("owners", ownerSchema);

const vaccinationDetailsSchema = new mongoose.Schema({
   
    date : String,
    v_id : String,
    is_completed:Number,
    next_date : String,
    remark:String,
    pet_id:Number,
    created: { type: String, default: new Date() },
    modified: { type: String, default: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}` }

});
VaccinationDetails = mongoose.model("vaccination_details", vaccinationDetailsSchema);

const dewormingDetailsSchema = new mongoose.Schema({
   
    date : String,
    dw_id : String,
    is_completed:Number,
    next_date : String,
    remark:String,
    pet_id:Number,
    created: { type: String, default: new Date() },
    modified: { type: String, default: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}` }

});
DewormingDetails = mongoose.model("deworming_details", dewormingDetailsSchema);

const prescriptionDetailsSchema = new mongoose.Schema({
   
    pet_history : String,
    diangnosis : String,
    treatment : String,
    remark:String,
    pet_id:Number,
    date:Date,
    created: { type: String, default: new Date() },
    modified: { type: String, default: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}` }

});
PrescriptionDetails = mongoose.model("prescription_details", prescriptionDetailsSchema);

let colorSchema=mongoose.Schema({
    color_id:Number,
    color_name:String,
    created: { type: String, default: new Date() },
    modified: { type: String, default: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}` }
})


colorModel=mongoose.model("colors",colorSchema)
const medSchema=mongoose.Schema({
    m_id:Number,
    m_name:String,
    isDeleted:{type:Number,default:0},
    created: { type: String, default: new Date() },
    modified: { type: String, default: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}` }
})

const medModel=mongoose.model("medicine",medSchema)
const dwSchema=mongoose.Schema({
    dw_id:Number,
    dw_name:String,
    isDeleted:{type:Number,default:0},
    created: { type: String, default: new Date() },
    modified: { type: String, default: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}` }
})

const dwModel=mongoose.model("deworming",dwSchema)

const vaccineSchema=mongoose.Schema({
    v_id:Number,
    v_name:String,
    isDeleted:{type:Number,default:0},
    created: { type: String, default: new Date() },
    modified: { type: String, default: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}` }
})

const vaccineModel=mongoose.model("vaccines",vaccineSchema)
const areaSchema=mongoose.Schema({
    area_id:Number,
    area_name:String,
    created: { type: String, default: new Date() },
    modified: { type: String, default: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}` }
})

const areaModel=mongoose.model("area",areaSchema)
const breed=mongoose.Schema({
    breed_id:Number,
    breed_name:String,
    created: { type: String, default: new Date() },
    modified: { type: String, default: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}` }
})

const breedModel=mongoose.model("breed",breed)

module.exports = {
    ownerModel,
    petModel,
    VaccinationDetails,
    PrescriptionDetails,
    DewormingDetails,
    medModel,
    areaModel,
    breedModel,
    dwModel,
    vaccineModel,
    colorModel
}
