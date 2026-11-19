const express = require('express');
const router = express.Router();
const multer = require('multer');
const CropQuery = require('../Models/cropQuery');
const {protect} = require('../middleware/authMiddleware');

const storage = multer.memoryStorage();
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } }); // Limit file size to 5MB


router.post('/upload', protect, upload.single('cropImage'), async (req, res) => {
    try {
        const { cropName, cropDescription } = req.body;
        if(!cropName || !cropDescription || !req.file) {
            return res.status(400).json({ msg: 'Please provide all required fields and an image.' });
        }   

        if(!req.file){
            return res.status(400).json({ msg: 'No file uploaded.' });  

        }

        const newQuery = new CropQuery({
            farmerId: req.user.id,
            cropName,
            cropDescription,
            cropImage: req.file.buffer // Store the image as a buffer

        });

        await newQuery.save();
        res.status(201).json({ msg: 'Crop query uploaded successfully.' });
    }
    catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
});


// sabhi Querys
router.get('/my-queries',protect, async (req,res)=>{
    try{
        const queries = await CropQuery.find({farmerId:req.user.id})
        .select('-ImageBuffer') // Exclude the image buffer from the response
        .sort({createdAt:-1});
        res.json(queries);
    }catch(error){
        res.status(500).json({msg:error.msg});
    }
});

router.get('/images/:id', async (req, res) => {
    try {
        const cropQuery = await CropQuery.findById(req.params.id);
        if (!cropQuery || !cropQuery.cropImage) {
            return res.status(404).json({ msg: 'Image not found' });
        }
        res.set('Content-Type', 'image/jpeg'); // Set the appropriate content type
        res.send(cropQuery.cropImage);
    }   
    catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;