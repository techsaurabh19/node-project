const express = require('express');
const fs = require('fs')
var XLSX = require('xlsx')

const router = express.Router();
const { ownerModel, petModel, medModel, areaModel, breedModel, dwModel, DewormingDetails, VaccinationDetails, vaccineModel, PrescriptionDetails, colorModel } = require('../db_api/schema');
const { default: mongoose } = require('mongoose');

router.get('/ownerData', (req, res) => {
    var workbook = XLSX.readFile('data.xlsx');
    var sheet_name_list = workbook.SheetNames;
    var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[6]]);
    console.log(xlData[0].CreatedDate)
    
    let count = 0
    xlData.forEach((ele, index) => {

        let newOwner = ownerModel({
            owner_id: ele.Owner_ID,
            name: ele.Name,
            mobile: ele.Mobile,
            email: "",
            area: ele.Area_ID,
            address: ele.Address,
            created: ele.CreatedDate.toString().slice(0,10)
        })
        newOwner.save().then((data, err) => {

            count++
            if (count == xlData.length) {
                res.json({ message: "data saved" })
            }


        })

    })
})



router.get('/petData', (req, res) => {
    var workbook = XLSX.readFile('data.xlsx');
    var sheet_name_list = workbook.SheetNames;
    console.log(sheet_name_list)
    var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[8]]);
    console.log(xlData.length)
    let count = 0
    xlData.forEach((ele, index) => {

       

        let newOwner = petModel({
            pet_name: ele.Name,
            Reg_number: 'spc' + ele.Pet_ID,
            breed: ele.Breed_ID,
            dob: ele.DOB.toString().slice(0,10),
            species: ele.Breed_ID == 1 || ele.Breed_ID == 2 || ele.Breed_ID == 4 ? 'cat' : 'dog',
            gender: ele.Gender,
            owner_id: ele.Owner_ID,
            color: ele.SM_ID,
            created: ele.CreatedDate.toString().slice(0,10),
            // modified: ele.UpdatedDate.slice(0,10)

        })
      
        newOwner.save().then((data, err) => {

            count++
            if (count == xlData.length) {
                res.json({ message: "data saved" })
            }


        })

    })
})


router.get('/medData', (req, res) => {
    var workbook = XLSX.readFile('data.xlsx');
    var sheet_name_list = workbook.SheetNames;
    console.log(sheet_name_list)
    var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[5]]);
    console.log(xlData[0])
    let count = 0
    xlData.forEach((ele, index) => {

        let newOwner = medModel({
            m_id: ele.M_ID,
            m_name: ele.M_Name,
            created: ele.CreatedDate.toString().slice(0,10),


        })
        newOwner.save().then((data, err) => {

            count++
            if (count == xlData.length) {
                res.json({ message: "data saved" })
            }


        })

    })
})

router.get('/cData', (req, res) => {
    var workbook = XLSX.readFile('data.xlsx');
    var sheet_name_list = workbook.SheetNames;
    console.log(sheet_name_list)
    var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[13]]);
    console.log(xlData[0])
    let count = 0
    xlData.forEach((ele, index) => {

        let newOwner = colorModel({
            color_id: ele.SM_ID,
            color_name: ele.SM_Name,
            created: ele.CreatedDate.toString().slice(0,10),


        })
        newOwner.save().then((data, err) => {

            count++
            if (count == xlData.length) {
                res.json({ message: "data saved" })
            }


        })

    })
})


router.get('/areaData', (req, res) => {
    var workbook = XLSX.readFile('data.xlsx');
    var sheet_name_list = workbook.SheetNames;
    console.log(sheet_name_list)
    var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
    console.log(xlData[0])
    let count = 0
    xlData.forEach((ele, index) => {

        let newOwner = areaModel({
            area_id: ele.A_ID,
            area_name: ele.A_Name,
            created: ele.CreatedDate.toString().slice(0,10),


        })
        newOwner.save().then((data, err) => {

            count++
            if (count == xlData.length) {
                res.json({ message: "data saved" })
            }


        })

    })
})


router.get('/breedData', (req, res) => {
    var workbook = XLSX.readFile('data.xlsx');
    var sheet_name_list = workbook.SheetNames;
    console.log(sheet_name_list)
    var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[2]]);
    console.log(xlData[0])
    let count = 0
    xlData.forEach((ele, index) => {

        let newOwner = breedModel({
            breed_id: ele.B_ID,
            breed_name: ele.B_Name,
            created: ele.CreatedDate.toString().slice(0,10),


        })
        newOwner.save().then((data, err) => {

            count++
            if (count == xlData.length) {
                res.json({ message: "data saved" })
            }


        })

    })
})


router.get('/vaccineData', (req, res) => {
    var workbook = XLSX.readFile('data.xlsx');
    var sheet_name_list = workbook.SheetNames;
    console.log(sheet_name_list)
    var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[14]]);
    console.log(xlData[0])
    let count = 0
    xlData.forEach((ele, index) => {

        let newOwner = vaccineModel({
            v_id: ele.V_ID,
            v_name: ele.V_Name,
            created: ele.CreatedDate.toString().slice(0,10),


        })
        newOwner.save().then((data, err) => {

            count++
            if (count == xlData.length) {
                res.json({ message: "data saved" })
            }


        })

    })
})


router.get('/dwData', (req, res) => {
    var workbook = XLSX.readFile('data.xlsx');
    var sheet_name_list = workbook.SheetNames;
    console.log(sheet_name_list)
    var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[3]]);
    console.log(xlData[0])
    let count = 0
    xlData.forEach((ele, index) => {

        let newOwner = dwModel({
            dw_id: ele.DW_ID,
            dw_name: ele.DW_Name,
            created: ele.CreatedDate.toString().slice(0,10),


        })
        newOwner.save().then((data, err) => {

            count++
            if (count == xlData.length) {
                res.json({ message: "data saved" })
            }


        })

    })
})


router.get('/dData', (req, res) => {
    var workbook = XLSX.readFile('data.xlsx');
    var sheet_name_list = workbook.SheetNames;
    console.log(sheet_name_list)
    var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[7]]);
    console.log(xlData[0])
    let count = 0
    xlData.forEach((ele, index) => {

        let newOwner = DewormingDetails({
            date: ele.Date.slice(0,10),
            dw_id: ele.DeWorm_ID,
            is_completed: ele.iscompleted,
            next_date: ele.NextDueDate.slice(0,10),
            remark: ele.Remark,
            pet_id: ele.Pet_ID,
            created: ele.CreatedDate.toString().slice(0,10),


        })
        newOwner.save().then((data, err) => {

            count++
            if (count == xlData.length) {
                res.json({ message: "data saved" })
            }


        })

    })
})


router.get('/vData', (req, res) => {
    var workbook = XLSX.readFile('data.xlsx');
    var sheet_name_list = workbook.SheetNames;
    console.log(sheet_name_list)
    var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[10]]);
    console.log(xlData[0])
    let count = 0
    xlData.forEach((ele, index) => {

        let newOwner = VaccinationDetails({
            date: ele.Date.slice(0,10),
            v_id: ele.Vaccin_ID,
            is_completed: ele.iscompleted,
            next_date: ele.NextDueDate.slice(0,10),
            remark: ele.Remark,
            pet_id: ele.Pet_ID,
            created: ele.CreatedDate.toString().slice(0,10),


        })
        newOwner.save().then((data, err) => {

            count++
            if (count == xlData.length) {
                res.json({ message: "data saved" })
            }


        })

    })
})


router.get('/pData', (req, res) => {
    var workbook = XLSX.readFile('data.xlsx');
    var sheet_name_list = workbook.SheetNames;
    console.log(sheet_name_list)
    var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[9]]);
    console.log(xlData[0])
    let count = 0
    xlData.forEach((ele, index) => {

        let newOwner = PrescriptionDetails({
            date: ele.Date.slice(0,10),
            pet_history : "",
            diangnosis : "",
            treatment : ele.Prescription,
            remark: "",
            pet_id: ele.Pet_ID,
            created: ele.CreatedDate.toString().slice(0,10),


        })
        newOwner.save().then((data, err) => {

            count++
            if (count == xlData.length) {
                res.json({ message: "data saved" })
            }


        })

    })
})




module.exports = router
