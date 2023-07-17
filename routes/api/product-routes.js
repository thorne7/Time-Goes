const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  try {
    const productsData = await Product.findAll({
      include: [Category, Tag],
    });
    res.status(200).json(productsData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// get one product
router.get('/:id', async (req, res) => {
  try {
    const productData = await Product.findByPk(req.params.id, {
      include: [Category, Tag],
    });
    if (!productData) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    res.status(200).json(productData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// create new product
router.post('/', (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
  Product.create(req.body)
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update product
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { tagIds, ...productData } = req.body;

  Product.update(productData, {
    where: { id },
    returning: true,
  })
    .then(([rowsAffected, [updatedProduct]]) => {
      if (rowsAffected === 0) {
        res.status(404).json({ message: 'Product not found' });
        return;
      }

      if (tagIds && tagIds.length) {
        // Find existing product tags
        ProductTag.findAll({
          where: { product_id: id },
        })
          .then((productTags) => {
            const existingTagIds = productTags.map((tag) => tag.tag_id);

            // Find tag IDs to remove
            const tagsToRemove = existingTagIds.filter(
              (tagId) => !tagIds.includes(tagId)
            );

            // Find tag IDs to add
            const tagsToAdd = tagIds.filter(
              (tagId) => !existingTagIds.includes(tagId)
            );

            // Remove tags
            ProductTag.destroy({
              where: {
                product_id: id,
                tag_id: tagsToRemove,
              },
            }).then(() => {
              // Add new tags
              const newProductTags = tagsToAdd.map((tagId) => ({
                product_id: id,
                tag_id: tagId,
              }));

              ProductTag.bulkCreate(newProductTags).then(() => {
                res.status(200).json({
                  message: 'Product updated successfully',
                  product: updatedProduct,
                });
              });
            });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      } else {
        res.status(200).json({
          message: 'Product updated successfully',
          product: updatedProduct,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});



router.delete('/:id', async (req, res) => {
  try {
    const productData = await Product.destroy({
      where: { id: req.params.id },
    });
    if (!productData) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    res.status(200).json({ message: 'Product Deleted'});
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
