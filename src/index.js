import express from "express";


const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "./../public"));

app.listen(PORT, () => {
    console.log("Server on port", PORT);
});