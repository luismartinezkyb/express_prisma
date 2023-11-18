import { Router } from "express";
import { prisma } from "../db.js";
const router = Router();

router.get('/products', async(req, res) => {
  const products = await prisma.product.findMany();
  res.json(products)
})
router.get('/products/:id', async(req, res) => {
  const id = parseInt(req.params.id);
  console.log(isNaN(id), id)
  if(!id || isNaN(id)){
    return res.status(404).json({error:"Invalid id"})
  }
  const product = await prisma.product.findUnique({
    where: {
      id
    },
    include: {
      category:true
    }
  });
  if(!product){ 
    return res.status(404).json({error:"not found"})
  }
  res.json(product)
})

router.post('/products', async(req, res) => {
  try {
    const data = req.body
    const newProduct = await prisma.product.create({
      data
    })
  
    res.json(newProduct)
  } catch (error) {
    console.log(error)
    return res.json({
      error:"Something went wrong"
    })
  }
})
router.put('/products/:id', async(req, res) => {
  try {
    const data = req.body
    console.log(data)
    const id = parseInt(req.params.id)
    const updatedProduct = await prisma.product.update({ 
      where:{
        id
      },
      data
    })
  
    res.json(updatedProduct)
  } catch (error) {
    console.log(error)
    return res.json({
      error:"Something went wrong"
    })
  }
})

export default router;