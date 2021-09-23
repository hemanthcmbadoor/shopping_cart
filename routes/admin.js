var express = require('express');
var router = express.Router();
var productHelper = require('../helpers/product-helpers');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('admin/view-products',{ admin:true });
});

router.get('/add-product',function(req,res){
  res.render('admin/add-product',{ admin:true });
});

router.post('/add-product',(req,res)=>{
  
  productHelper.addProduct(req.body,(id)=>{
    let image_file=req.files.image
    image_file.mv('./public/images/product-images/'+id+'.jpg',(err,done)=>{
      if(!err){
        res.render("admin/add-product")
      }
      else{
        console.log(err)
      }
    })
    
  })
});

module.exports = router;
