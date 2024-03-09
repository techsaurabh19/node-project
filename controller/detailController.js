const express=require('express')
const router=express.Router()
const {ownerModel, petModel,VaccinationDetails, DewormingDetails,dwModel, vaccineModel}=require('../db_api/schema')

router.get('/getAllOwners/:limit/:page',async(req,res)=>{
    let total = await ownerModel.find().count()
    ownerModel.find().skip(req.params.page*req.params.limit).limit(req.params.limit).then((data,err)=>{
        if(err){
            res.json({status:0,message:"something went wrong",error:err})
        }else{
            res.json({status:1,data:data,total:total})
        }
    })
})

router.get('/search/:number',async(req,res)=>{
    ownerModel.find({mobile:{$regex:req.params.number,$options:"i"}}).then((data,err)=>{
        if(err){
            res.json({status:0,message:"something went wrong",error:err})
        }else{
            res.json({status:1,data:data})
        }
    })
})

router.get('/pet/:number',async(req,res)=>{
   ownerModel.findOne({mobile:req.params.number}).then((data)=>{
    if(data){
    petModel.find({owner_id:data.owner_id}).then(result=>{
        res.json({status:1,owner:data,pets:result})
   
    
    })
}else{
    res.json({status:0,message:"No Owner Found"})
}
   })
})

router.get('/deworming/:petId',(req,res)=>{
    let id=Number(req.params.petId.substring(3,req.params.petId.length))
   
        DewormingDetails.find({pet_id:id}).sort({next_date:-1}).limit(10).then((result,err)=>{
            if(err){
                res.json({status:0})
            }
            else{
                let response=[]
                let count=0
                for(i=0;i<result.length;i++){
                    let ele=result[i]._doc
                    
                    dwModel.findOne({dw_id:Number(ele.dw_id)}).then((name)=>{
                        count++
                        ele.dw_name=name.dw_name
                        
                        
                        if(count==result.length){
                            
                              res.json({status:1,data:result})
                          }
                          })
                }
            }
        })
})

router.get('/vaccine/:petId',(req,res)=>{
    let id=Number(req.params.petId.substring(3,req.params.petId.length))
   
        VaccinationDetails.find({pet_id:id}).sort({next_date:-1}).limit(10).then((result,err)=>{
            if(err){
                res.json({status:0})
            }
            else{
                console.log(result)
                let response=[]
                let count=0
                for(i=0;i<result.length;i++){
                    let ele=result[i]._doc
                    console.log(ele,"lllll")
                    
                    vaccineModel.findOne({v_id:Number(ele.v_id)}).then((name)=>{
                        count++
                        ele.v_name=name.v_name
                        
                        
                        if(count==result.length){
                            
                              res.json({status:1,data:result})
                          }
                          })
                }
            }
        })
})




router.get('/getVaccine',(req,res)=>{
    vaccineModel.find({}, 'v_id v_name').then((result,err) => {

        if(err){
        res.json({ status: 0, message: "Something went wrong", error: err });
        }
        else{
        res.json({ status: 1, data: result });
        }
      })
})


module.exports =router
