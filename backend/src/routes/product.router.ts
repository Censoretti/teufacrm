import express, { Router, Request, Response } from 'express';
import { connect } from '../db/connect';
import { ObjectId } from 'mongodb';
import { Product } from '../models/product';

const router: Router = express.Router();

router.get('/products', async (req: Request, res: Response) => {
  try {
    const db = await connect();
    const products = await db.collection('products').find().toArray();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
});

router.get('/products/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const db = await connect();
    const product = await db.collection('products').findOne({ _id: new ObjectId(id) });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error });
  }
});

router.post('/products', async (req: Request, res: Response) => {
  try {
    const newProduct: Product = req.body;
    const db = await connect();
    await db.collection('products').insertOne(newProduct);
    res.status(201).json({ message: 'Product created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error });
  }
});

router.put('/products/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const updatedProduct: Partial<Product> = req.body;
    const db = await connect();
    await db.collection('products').updateOne({ _id: new ObjectId(id) }, { $set: updatedProduct });
    res.json({ message: 'Product updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error });
  }
});

router.delete('/products/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const db = await connect();
    await db.collection('products').deleteOne({ _id: new ObjectId(id) });
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error });
  }
});

export default router;
