// Helper function to validate product input
function validateProductInput(product) {
  const { name, price, description } = product;
  if (!name || typeof name !== 'string') {
    return 'Product name is required and must be a string.';
  }
  if (typeof price !== 'number' || price < 0) {
    return 'Price must be a non-negative number.';
  }
  if (!description || typeof description !== 'string') {
    return 'Description is required and must be a string.';
  }
  return null;
}

// Modified POST endpoint
exports.createProduct = (req, res) => {
  const error = validateProductInput(req.body);
  if (error) return res.status(400).json({ error });

  const newProduct = { id: Date.now(), ...req.body };
  products.push(newProduct);
  res.status(201).json(newProduct);
};

// Modified PUT endpoint
exports.updateProduct = (req, res) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex(p => p.id === id);
  if (index === -1) return res.status(404).json({ error: 'Product not found' });

  const error = validateProductInput(req.body);
  if (error) return res.status(400).json({ error });

  products[index] = { id, ...req.body };
  res.json(products[index]);
};
