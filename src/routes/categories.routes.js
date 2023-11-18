import { Router } from "express";
import { prisma } from "../db.js";

const router = Router();


router.get('/categories/', async(req, res)=>{
  const data = await prisma.category.findMany({
    include:{
      products:true
    }
  })
  res.json(data)
})

export default router;