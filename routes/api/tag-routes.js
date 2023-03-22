const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models')

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags // be sure to include its associated Product data
  try {
    const getTag = await Tag.findAll({
      include: {
        model: Product,
        attributes: ['product_name', 'price', 'stock', 'category_id']
      }
    })
    res.status(200).json(getTag)
  }catch(err){
    res.status(500).json(err)
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id` // be sure to include its associated Product data
  try {
    const getTagId = await Tag.findOne({
      where: {
        id: req.params.id
      },
      include: {
        model: Product,
        attributes: ['product_name', 'price', 'stock', 'category_id']
      }
    })
    if(!getTagId){
      res.status(404).json({ message: 'No tag associated with that id.'})
      return
    }
    res.status(200).json(getTagId)
  }catch(err){
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try{
    const postTag = await Tag.create({
      tag_name: req.body.tag_name
    })
    res.status(200).json(postTag)
  }catch(err){
    res.status(500).json(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const putTag = await Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    if(!putTag){
      res.status(404).json({ message: 'No tag associated with this id.'})
      return
    } res.status(200).json(putTag)
  }catch(err){
      res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deleteTag = await Tag.destroy({
      where: {
        id: req.params.id
      }
    })
    if (!deleteTag){
      res.status(404).json({ message: 'No tag associated with this id.'})
      return
    } res.status(200).json(deleteTag)
  }catch(err){
      res.status(500).json(err)
  }
});

module.exports = router
