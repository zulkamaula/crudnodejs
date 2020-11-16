const Sequelize = require("sequelize");
const db = require("../config/db");

const Product = db.define(
    "product",
    {
        product_id: {type: Sequelize.INTEGER.PRIMARY_KEY.AUTO_INCREMENT},
        product_name: {type: Sequelize.STRING},
        product_price: {type: Sequelize.STRING},
    },
    {
        freezeTableName: true
    }
);

module.exports = Product;