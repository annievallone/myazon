var mysql = require("mysql");
var inquirer = require("inquirer");
var purchase = {buyID:"", buyQty:"", stock:""}
var maxID = [];
var inputValid = false;

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
            maxID.push(res[i].item_id);
            // console.log(maxID)
      }
        buying()
  })

  function buying() {
    inquirer.prompt({
        name: "selectionID",
        type: "input",
        message: "What is the ID of the item you wish to buy?"
        }).then(function(answer){
                    purchase.buyID = answer.selectionID;
                    // console.log(answer)
                    parseInt(purchase.buyID)
                    console.log(typeof purchase.buyID)
                    if (Number.isInteger(purchase.buyID) && maxID.includes(purchase.buyID) ) {
                        inputValid = true
                        purchase.buyQty = answer.selectionQty;
                        inventoryCheck()
                    }
                    else{
                        inputValid = false
                        console.log("Sorry that is not a valid selection ")
                        buying()
                    }
      }).then(function(answer){
                
                inquirer.prompt({
                    name: "selectionQty",
                    type: "input",
                    message: "How many would you like?"
                    
                // }).then(function(answer){
                //     console.log(answer)
                //     var input = parseInt(answer.selectionQty)
                //     console.log(typeof input)
                //     if (Number.isInteger(input) && maxID.includes(input) ) {
                //         purchase.buyQty = answer.selectionQty;
                //         inventoryCheck()
                //     }
                //     else{
                //         console.log("Sorry that is not a valid selection ")
                //     }
                    
                })
      })
    }
   
    function inventoryCheck(){
        var query = "SELECT * FROM products WHERE ?";
        connection.query(query, {item_id: purchase.buyID}, function(err, res){
            purchase.stock = parseInt(res[0].stock_quantity)
        
            if (purchase.buyQty > purchase.stock) {
                if (purchase.stock > 0) {
                    console.log("Sorry we only have " + purchase.stock + "left")
                    
                    buying();
                }
                else {
                    console.log("Sorry we don't have any of those items in stock!")
                }
                
            }
            else {
                console.log("yes we have enough")
                parseInt(purchase.buyQty)
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