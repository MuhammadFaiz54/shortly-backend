const express = require('express');
const url_module = require('../modules/url_module');
const shortid = require('shortid');
router = express.Router()

router.post('/store_url',async(req,res)=>{
    try {
        const {url} = req.body
        const unique_url = shortid.generate()
        const shortUrl = new url_module({url:url})
        shortUrl.shortUrl = unique_url
       await shortUrl.save()
        res.status(201).json({"message":"your url stored",shortUrl})
    } catch (error) {
        res.status(500).json({"message":error.message})
    }
})
router.get('/:id',async(req, res)=>{
    try {
        const uniqueUrl = req.params.id
        console.log("uniqueUrl===",uniqueUrl)
        const urlChecked = await url_module.findOne({url:uniqueUrl})
        if (!urlChecked){
           return res.status(404).json({"message":"url not found"})
        }
        console.log("urlChecked===",urlChecked)
        res.status(200).json({"message":"url fetch successfully"})
        return  res.redirect(urlChecked.url)
    } catch (error) {
        res.status(500).json({"message":error.message})
    }
})
module.exports = router