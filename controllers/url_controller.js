const {validationResult } = require('express-validator')
const url_module = require('../models/url_module');
const shortid = require('shortid');


const urlStoreController = async (req, res) => {
    try {
        const validateError = validationResult(req)
        if (!validateError.isEmpty()){
            return res.status(400).json({message:validateError.array()})
        }
         const { url } = req.body
        const unique_url = shortid.generate()
        const shortUrl = new url_module({ url: url })
        shortUrl.shortUrl = unique_url
        await shortUrl.save()
        res.status(201).json({ "message": "your url stored", shortUrl })
    } catch (error) {
        res.status(500).json({ "message": error.message })
    }
}
const getUrlController = async (req, res) => {
    try {
        const url = req.params.id
        console.log("url===", url)
        const urlChecked = await url_module.findOne({ shortUrl: url })
        if (!urlChecked) {
            return res.status(404).json({ "message": "url not found" })
        }
        console.log("urlChecked===", urlChecked)
        // res.status(200).json({"message":"url fetch successfully"})
        return res.redirect(urlChecked.url)
    } catch (error) {
        res.status(500).json({ "message": error.message })
    }
}
module.exports = {
    urlStoreController,
    getUrlController
}