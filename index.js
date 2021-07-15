
const express = require("express");
const app = express();
const bp = require("body-parser");
const qr = require("qrcode");

// Using the ejs (Embedded JavaScript templates) as our template engine
// and call the body parser  - middleware for parsing bodies from URL
//                           - middleware for parsing json objects

app.set("view engine", "ejs");
app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());

// Simple routing to the index.ejs file
app.get("/", (req, res) => {
    res.render("index");
});


//Add a POST request listener to convert Text/URL to QR Code.
app.post("/scan", (req, res) => {
    const url = req.body.url;

    // If the input is null return "Empty Data" error
    if (url.length === 0) res.send("Empty Data!");

    // Let us convert the input stored in the url and return it as a representation of the QR Code image contained in the Data URI(Uniform Resource Identifier)
    // It shall be returned as a png image format
    // In case of an error, it will save the error inside the "err" variable and display it

    qr.toDataURL(url, (err, src) => {
        if (err) res.send("Error occured");

        // Let us return the QR code image as our response and set it to be the source used in the webpage
        res.render("scan", { src });
    });
});

// Setting up the port for listening requests
const port = 7000;
app.listen(port, () => console.log("Server started at localhost:" + port));