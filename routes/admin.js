var express = require('express');
const productHelpers = require('../helpers/product-helpers');
var router = express.Router();
/* GET users listing. */
router.get('/', function (req, res, next) {
  productHelpers.getAllProducts().then((products) => {
    res.render('admin/view-products', { admin: true, products });
  })
});

router.get('/add-product', function (req, res) {
  res.render('admin/add-product', { admin: true });
});

router.post('/add-product', (req, res) => {
  productHelpers.addProduct(req.body, (id) => {
    let image_file = req.files.image
    image_file.mv('./public/images/product-images/' + id + '.jpg', (err, done) => {
      if (!err) {
        res.render("admin/add-product")
      }
      else {
        console.log(err)
      }
    })
  })
});

module.exports = router;
