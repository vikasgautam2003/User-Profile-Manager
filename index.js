const express = require('express');
const app = express();
const path = require('path');
const userModel = require('./models/user');



app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));



app.get("/", (req, res) => {
    res.render("index");
});

app.get("/read", async (req, res) => {

    let users = await userModel.find({});
    res.render("read", { users });
});


app.get("/delete/:id", async (req, res) => {
    let id = req.params.id;
    let deleted = await userModel.findByIdAndDelete(id);
    res.redirect("/read");
})


app.get("/edit/:id", async (req, res) => {
    let id = req.params.id;
    let user = await userModel.findById(id);
    res.render("edit", { user });
})


app.post("/update/:id", async (req, res) => {
    let {name, email, image} = req.body;
    let id = req.params.id;
    let user = await userModel.findOneAndUpdate( { _id: id }, { name, email, image }, { new: true });
    res.redirect("/read");
})


app.post("/create", async (req, res) => {
    let {name, email, image} = req.body;
    let created = await userModel.create({
        name,
        email,
        image
    })

    res.redirect("/read");
})








app.listen(3000);