// call framework

const express = require("express");
const app = express();

// call connect config database
const db = require("./config/db");

app.get("/", (req,res) => res.send("respon nodejs berhasil"));

app.use(express.urlencoded({ extended: true }));

db.authenticate().then(() =>
    console.log("berhasil terkoneksi dengan database")
);

// call user
const User = require("./models/User");

app.post("/crud_admin", async (req,res) => {
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


app.get("/crud_admin", async (req, res) => {
    try {
        const getAllUser = await User.findAll({})
        res.json(getAllUser);

    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
});

app.get("/crud_admin/:id", async (req, res) =>  {
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

app.delete("/crud_admin/:id", async (req, res) => {
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

app.put("/crud_admin/:id",async (req, res) => {
    try {
        const {
            username,
            email,
            password
        } = req.body
        const id = req.params.id

        const updateUser = await User({
            username, email, password
        }, { where: {id:id} });

        await updateUser;
        res.json("Data bershasil di ubah")
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
});

// call product
const Product = require("./models/Product");

app.post("/crud_product", async (req,res) => {
    try {
        const { product_id, product_name, product_price } = req.body;

        const newProduct = new Product({
            product_id,
            product_name,
            product_price
        });

        await newProduct.save();

        res.json(newProduct);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
});


app.get("/crud_product", async (req, res) => {
    try {
        const getAllProduct = await Product.findAll({})
        res.json(getAllProduct);

    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
});

app.get("/crud_product/:id", async (req, res) =>  {
    try {
        const id = req.params.id;

        const getProduct = await Product.findOne({
            where: { id: id }
        });

        res.json(getProduct);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
});

app.delete("/crud_product/:id", async (req, res) => {
    try {
        const id = req.params.id;

        const deleteProduct = await Product.destroy({
            where: { id: id }
        });

        await deleteProduct;
        res.json("berhasil di hapus");
    } catch (error) {
        console.error(err.message);
        res.status(500).send("server error");
    }
});

// app.put("/crud_admin/:id",async (req, res) => {
//     try {
//         const {
//             username,
//             email,
//             password
//         } = req.body
//         const id = req.params.id

//         const updateUser = await User({
//             username, email, password
//         }, { where: {id:id} });

//         await updateUser;
//         res.json("Data bershasil di ubah")
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send("server error");
//     }
// });



// konek ke router postman
app.listen(5000, () => console.log("port berjalan di 4500")); 