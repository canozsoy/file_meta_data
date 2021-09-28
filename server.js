const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config()
const multer = require("multer");
const upload = multer({dest: "uploads/"})

// Middlewares

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
app.use(express.urlencoded({
    extended: false
}))

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

app.post("/api/fileanalyse", upload.single("upfile"), async(req, res) => {
    if (req.file) {
        const {originalname: name, mimetype: type, size} = req.file;
        
        return res.json({
            name: name,
            type: type,
            size: size
        });
    } else {
        return res.json({
            error: "No file uploaded"
        })
    }
    
})

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
