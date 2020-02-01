const fs = require('fs')
const multer = require('multer')
const { createWorker } = require("tesseract.js");
const worker = createWorker({
    logger: m => console.log(m)
});

const upload = multer({ dest: '../uploads' })

module.exports = {
    async conversion(req, res, err) {
        upload(req, res, err => {
            fs.readFile(`../uploads/${req.file.originalname}`, (err, data) => {
                if (err) return console.log('This is your error', err)

                    //Use Tesseract OCR
                    (async () => {
                        await worker.load()
                        await worker.loadLanguage('eng')
                        await worker.initialize('eng')
                        const { data: { text } } = await worker.recognize(data)
                        await res.send(text)
                        await worker.terminate()
                    })
            })
        })
    }
}