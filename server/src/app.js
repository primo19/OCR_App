const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const { sequelize } = require('./models')
const config = require('./config/config')


// For Uploading Files and Using Tesseractjs
const fs = require("fs");
const multer = require('multer')
const { createWorker } = require("tesseract.js");
const worker = createWorker({
    logger: m => console.log(m)
});

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

// Uploading and Converting (Out of controller knowledge constraints)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "../uploads");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage }).single('file')

app.post('/sendimage', (req, res) => {
    upload(req, res, err => {
        fs.readFile(`../uploads/${req.file.originalname}`, (err, image) => {
            if (err) return console.log('This is your error', err);

            //Use Tesseractjs
            (async () => {
                await worker.load();
                await worker.loadLanguage('eng');
                await worker.initialize('eng');
                const { data: { text } } = await worker.recognize(image)
                console.log(text)
                const { data } = await worker.getPDF('Tesseract OCR Result')
                fs.writeFileSync('tesseract-ocr-result.pdf', Buffer.from(data))
                console.log('Generate PDF: tesseract-ocr-result.pdf')
                await worker.terminate();
            })();
        });
    })
})

require('./routes')(app)

sequelize.sync()
    .then(() => {
        app.listen(config.port)
        console.log(`Server started on port ${config.port}`)
    })
