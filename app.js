const express = require("express");
const app = express();

const db = require("./config/db");

app.get("/", (req,res) => res.send("respon nodejs berhasil"));

app.use(express.urlencoded({ extended: true }));

db.authenticate().then(() =>
    console.log("berhasil terkoneksi dengan database")
);

const User = require("./models/User");

app.post("/crud", async (req,res) => {
    try {
        const { username, email, password } = req.body;

        const newUser = new User({
            username,
            email,
            password
        });

        await newUser.save();

        res.json(newUser);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
});


app.get("/crud", async (req, res) => {
    try {
        const getAllUser = await User.findAll({})
        res.json(getAllUser);

    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
});

app.get("/crud/:id", async (req, res) =>  {
    try {
        const id = req.params.id;

        const getUser = await User.findOne({
            where: { id: id }
        });

        res.json(getUser);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
});

app.delete("/crud/:id", async (req, res) => {
    try {
        const id = req.params.id;

        const deleteUser = await User.destroy({
            where: { id: id }
        });

        await deleteUser;
        res.json("berhasil di hapus");
    } catch (error) {
        console.error(err.message);
        res.status(500).send("server error");
    }
});

app.put("/crud/:id",async (req, res) => {
    try {
        const {
            username,
            email,
            password
        } = req.body
        const id = req.params.id

        const updateUser = await User({
            username, email, password
        });

        await updateUser;
        res.json("Data bershasil di ubah")
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
})

app.listen(5000, () => console.log("port berjalan di 4500")); 