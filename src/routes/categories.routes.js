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

// PRISMA MORE TOOLS QUERY BUILDER PRISMA
router.get('/categories/getall', async(req, res)=>{
  //UpdateMany 
  // const dataUpdated = await prisma.category.updateMany({
  //   where:{
  //     name:'categories'
  //   },
  //   data:{
  //     name:'todasss'
  //   }
  // })
  // const dataDeleted = await prisma.category.deleteMany({
  //   where:{
  //     name:'categories'
  //   },
  //   data:{
  //     name:'todasss'
  //   }
  // })
  // // UPSERT 
  // //Esto lo que hace es buscar por un dato y si esta ejecutar el update, si no existe ejecutar el create

  // const upsert = await prisma.category.upsert({
  //   where:{
  //     name:'categories'
  //   },
  //   create:{
  //     name:'categories',
  //     id:5
  //   },
  //   update:{
  //     name:'nuevocategories'
  //   }
  // })
  // // JOIN IN CREATE WITH RELATIONS
  // const user = await prisma.user.create({
  //   data:{
  //     name:'nuevo usuario',
  //     email:"nuevo@usuario.com",
  //     lastname:"lastname"
  //   }
  // })

  // const post = await prisma.post.create({
  //   data:{
  //     title:'Nuevo usuario post',
  //     content: "NUevo contenido del post",
  //     // userId:user.id
  //     user: {
  //       connect:{
  //         id:user.id
  //       }
  //     }
  //     //CUALQUIERA DE ESTAS DOS OPCIONES FUNCIONA A LA PERFECCIÓN
  //   }
  // })

  // TAMBIEN PODEMOS CREAR UNA RELACION DESDE OTRO POR EJEMPLO
  //UN POST DESDE UNA CREACION DE UN USUARIO

  await prisma.user.create({
    data:{
      name:'Luis',
      email:"luis@gmail.com",
      lastname:"Martinez",
      posts:{
        create:[
          {
            title:'Tutorial de prisma',
            content:' Contenido desde le usuario'
          },
          {
            title:'Tutorial de prisma',
            content:' Contenido desde le usuario'
          },
          {
            title:'Tutorial de prisma',
            content:' Contenido desde le usuario'
          }
        ]
      }
    }
  })

  const posts = await prisma.post.findMany()

  res.json(posts)
})
export default router;