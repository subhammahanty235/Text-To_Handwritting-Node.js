const express = require('express')
const cors = require('cors')
const path = require('path')

const handwritten = require('handwritten.js')
const fs = require('fs')

const app = express();
app.use(cors());
app.use(express.json())
// app.use('/static', express.static('public'))
app.use('/static', express.static('uploads'))
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "templates/index.html"));
})
app.post('/convert', async (req, res) => {
    // const rawtext = "Hello, world!"
    const { data } = req.body;
    console.log(data)
    let fnname = new Date().getTime();

    let randomn = Math.floor(Math.random() * 10);
    let finalname = "tran" + fnname + randomn + "img"

    // fs.readFile('sample.txt','utf8',async(err,data)=>{
    //     await handwritten(data).then((converted) => {
    //         converted.pipe(fs.createWriteStream(`uploads/${finalname}.pdf`))
    //         res.redirect(`http://localhost:5000/static/${finalname}.pdf`)
    // })
    //     })

    // from form responce
    await handwritten(data).then((converted) => {
        converted.pipe(fs.createWriteStream(`uploads/${finalname}.pdf`))
    })
    console.log('done con')

    res.json({ rurl: `http://localhost:5000/static/${finalname}.pdf` })
})

// })


app.listen(5000, () => [
    console.log("Done")
])
