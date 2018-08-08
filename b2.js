var mysql = require("mysql");
var inquirer = require("inquirer");
var purchase = {buyID:"", buyQty:"", stock:""}
// var maxID = [];
// var inputValid = false;
var id = "";
var qty = ""; 

var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon"
  });

  connection.connect(function(err) {
    if (err) throw err;
    ;
  });
  connection.query("SELECT item_id, product_name, price from products where stock_quantity > 0", function(err, res){
    for (var i = 0; i < res.length; i++) {
        console.log(res[i].item_id, res[i].product_name, res[i].price)
       }
      buying()
})
function buying() {
    inquirer.prompt({
        name: "selectionID",
        type: "input",
        message: "What is the ID of the item you wish to buy?"
    }).then(function(answer){
        console.log(answer)
        connection.query("SELECT COUNT(item_id) AS NumberOfIDs FROM products where ?;", {item_id: answer}, function(err, res){
            id = answer;
            console.log(res)
            if (res > 0 ) {
                inquirer.prompt({
                    name: "selectionQty",
                    type: "input",
                    message: "How many would you like?"
            })
        }
        else {
            console.log("Sorry that is not a valid ID")
        }
    })
}).then(function(answer){
    inventoryCheck()
    qty = answer
})
}

function inventoryCheck(){
    connection.query("SELECT COUNT(stock_quantity) AS NumberOfStock FROM products where ?;", {item_id: id}, function(err,res){
        if (res > qty) {
            reduceStock();
        }
    })
}
function reduceStock(){
    var newStock = purchase.stock - purchase.buyQty
    console.log(newStock)
    var query = "UPDATE products SET ? WHERE ?"
    connection.query(query, [{stock_quantity: newStock},{item_id: purchase.buyID}], function(err, res) {
console.log("Your order has been fullfilled")
buying()
    })
     }