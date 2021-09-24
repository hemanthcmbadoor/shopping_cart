const { response } = require('express');
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
        res.render("admin/add-product", { admin: true })
      }
      else {
        console.log(err)
      }
    })
  })
});

router.get('/delete-product/:id', function (req, res) {
  let prodId = req.params.id
  console.log(prodId)
  productHelpers.deleteProduct(prodId).then((response)=>{
    res.redirect('/admin')
  })
});

router.get('/edit-product/:id', async (req, res)=> {
  let product = await productHelpers.getProductDetails(req.params.id)
  res.render('admin/edit-product', { admin: true,product });
});

module.exports = router;
