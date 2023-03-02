const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
router.get('/', async (req, res) => {
  // find all categories // be sure to include its associated Products
  try{
    const getCat = await Category.findAll({
      include: {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    })
    res.status(200).json(getCat)
  }catch(err){
    res.status(500).json(err)
  }
})

router.get('/:id', async (req, res) => {
  // find one category by its `id` value // be sure to include its associated Products
  try{
    const getCatId = await Category.findOne({
      where: {
        id: req.params.id,
      },
      include: {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    })
      res.status(200).json(getCatId)
    }catch(err){
      res.status(500).json(err)
    }
    }
);

router.post('/', async (req, res) => {
  // create a new category
  try {
    const postCat = await Category.create({
      category_name: req.body.category_name,
    })
    res.status(200).json(postCat)
  }catch(err){
    res.status(500).json(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const putCat = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    if(!putCat){
      res.status(404).json({ message: 'There is no category associated with this id.'})
      return
    }
      res.status(200).json(putCat)
  }catch(err){
      res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCat = await Category.destroy({
      where: {
        id: req.params.id,
      }
    })
    if(!deleteCat) {
      res.status(404).json({ message: 'There is no category associated with this id.'})
      return
    }
      res.status(200).json(deleteCat)
  }catch(err){
      res.status(500).json(err)  
  }
});

module.exports = router;
