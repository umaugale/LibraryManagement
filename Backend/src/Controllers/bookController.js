const prisma = require('../../db');


exports.getAll = async(req,res,next) => {
    try{
      const books = await prisma.book.findMany({
        select:{
            id:true,
            title:true,
            author:true,
            publishedYear:true,
            status:true
        }
      });
      res.json(books)
    }
    catch(err){
        next(err)
    }
};
exports.create = async(req,res,next) => {
    try{
        if(req.body === undefined) return res.status(400).json({message:"Provide the required details"});

        const {title,author,publishedYear} = req.body;

        if(!title) return res.status(400).json({message:"Title is required"})
        if(!author) return res.status(400).json({message:"Author is required"})
        if(!publishedYear) return res.status(400).json({message:"Published Year is required"})

        const checkUnique = await prisma.book.findFirst({where:{title,author}})
        
        if(checkUnique) return res.status(409).json({message:"Book is already exists"}); 

        const books = await prisma.book.create({data:{title,author,publishedYear}});
        res.status(200).json(books)
    }
    catch(err){
        next(err)
    }

};

exports.deleteBook = async(req,res,next) => {
    try{
       const{id} = req.params;
       const findFirst =  await prisma.book.findUnique({where:{id:Number(id)}})
       if(!findFirst){
        return res.status(400).json({message:"Book not found"})
       } 
       await prisma.book.delete({where:{id:Number(id)}})
       return res.status(200).json({message:"Deleted Successfully"})
    }
    catch(err){
        next(err)
    }
    
}

exports.updateBook = async(req,res,next) => {
    try{
     const{id} = req.params;
     const{title,author,publishedYear,updatedAt} = req.body;
     const findFirst = await prisma.book.findUnique({where:{id:Number(id)}})
    if(!findFirst){
        return res.status(400).status({message:"Book Not Found"})
    }
    const updatedBook = await prisma.book.update({
        where:{id:Number(id)},
        data:{title,author,publishedYear,updatedAt:new Date()}
    })  
    res.status(200).json(updatedBook)
    }
    catch(err){
        next(err)
    }
    
}
exports.updateStatus = async(req,res,next) => {
      try {
    const { id } = req.params;
    const { status } = req.body;
    if (!['AVAILABLE','BORROWED'].includes(status)) return res.status(400).json({ message: 'Invalid status' });
    const book = await prisma.book.update({ where: {id:Number(id) }, data: { status }});
    res.json(book);
  } catch (err) { next(err); }
};