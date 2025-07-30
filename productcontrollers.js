let products = [];
let idCounter = 1;

exports.getAllProducts = (req, res) => {
  const { q, page = 1, limit = 10 } = req.query;
  let result = [...products];

  if (q) {
    result = result.filter(p => p.name.toLowerCase().includes(q.toLowerCase()));
  }

  const startIndex = (page - 1) * limit;
  const paginated = result.slice(startIndex, startIndex + Number(limit));

  res.json(paginated);
};

exports.getProductById = (req, res) => {
  const product = products.find(p => p.id === Number(req.params.id));
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
};

exports.addProduct = (req, res) => {
  const { name, price, description } = req.body;
  if (!name || typeof price !== 'number') {
    return res.status(400).json({ message: 'Invalid input' });
  }
  const newProduct = { id: idCounter++, name, price, description };
  products.push(newProduct);
  res.status(201).json(newProduct);
};

exports.updateProduct = (req, res) => {
  const product = products.find(p => p.id === Number(req.params.id));
  if (!product) return res.status(404).json({ message: 'Product not found' });

  const { name, price, description } = req.body;
  if (name) product.name = name;
  if (typeof price === 'number') product.price = price;
  if (description) product.description = description;

  res.json(product);
};

exports.deleteProduct = (req, res) => {
  const index = products.findIndex(p => p.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'Product not found' });
  products.splice(index, 1);
  res.json({ message: 'Product deleted' });
};
