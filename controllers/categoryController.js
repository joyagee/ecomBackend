const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createCategory = async (req, res) => {
  const { name } = req.body;
  try {
    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "Missin Name Field" });
    }

    //check for existing category
    const existingCategory = await prisma.category.findUnique({
      where: { name },
    });
    if (existingCategory) {
      return res
        .status(400)
        .json({ success: false, message: "Category Already Existing" });
    }
    const newCategory = await prisma.category.create({
      data:{
        name,
      },
    });

    if (!newCategory) {
      return res
        .status(400)
        .json({ success: false, message: "unable to create category" });
    }
    return res
      .status(201)
      .json({ success: true, message: "created category succesfully" });
  } catch (error) {
    console.log("error", error.message);
    return res
      .status(500)
      .json({
        success: false,
        message: "internal server error try again later",
      });
  }
};

exports.getAllCategory = async (res, req) => {
  try {
    const allCategory = await prisma.category.findMany();
    if (!allCategory) {
      return res
        .status(500)
        .json({ success: false, message: "unable to get categories" });
    }
    return res
      .status(200)
      .json({
        success: true,
        message: "category retrived successfully",
        data: allCategory,
      });
  } catch (error) {
    console.log("error", error.message);
    return res
      .status(500)
      .json({ success: false, message: "internal server error!" });
  }
};
 exports.getSingleCategory = async (res, req) => {
  const {name} = req.params;
  try {
    const singleCategory = await prisma.category.findUnique({
      where : { name },

    })
if (!singleCategory) {
  return res
      .status(400)
      .json({ success: false, message: "category not found!" });
}
 return res
      .status(200)
      .json({ success: true, message: "category received successfully", data : singleCategory });

  } catch (error) {
    console.log("error", error.message);
     return res
      .status(500)
      .json({ success: false, message: "internal server error" });
  }
 };

 exports.updateCategory = async (req, res) => {
const {name, id } =req.body;
const parsedId = parseInt(id)
try {
  //check if category exist
  const existingCategory = await prisma.category.findUnique ({
    where : {id : parsedId},
  });
  if (!existingCategory) {
      return res
      .status(400)
      .json({ success: false, message: "category does not exist in database!" });
  }

  const updatedCategory = await prisma.category.update ({
    where : { id },
    data : {
      name,
    },
  });

  if (!updatedCategory) {
    return res
      .status(400)
      .json({ success: false, message: "unable to update category!" });
  }
  return res
      .status(201)
      .json({ success: true, message: "category updated successfully" });
  

} catch (error) {
  console.log("error", error.message);
  return res
      .status(500)
      .json({ success: false, message: "internal server error, pls try again later!" });
  
}
 }

 exports.deleteCategory = async (req, res) =>
 {
  const {id} = req.body;
  //check if it exist
  console.log("reqbody:", req.body);
  const parsedId = parseInt(id);
  try {
    const existingCategory = await prisma.category.findUnique ({where:{id: parsedId},
    });

    if (!existingCategory) {
      return res
      .status(400)
      .json({ success: false, message: "category does not exist in database!" });
  
    }

    const deleteCategory = await prisma.category.delete({where:{id:parsedId},
    });
    if (!deleteCategory){
       return res
      .status(400)
      .json({ success: false, message: "unable to delete Category!"});
  
    }
     return res
      .status(200)
      .json({ success: true, message: "Category deleted succesfully!" });
  
  } catch (error) {
    console.log("error", error.message);
     return res
      .status(500)
      .json({ success: false, message: "internal server error, try again later" });
  }
  
 }