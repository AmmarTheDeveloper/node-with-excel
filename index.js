const express = require('express')
const app = express()
const db = require('./db/db')
const exceljs = require('exceljs')

app.set('view engine','ejs')
app.use(express.urlencoded({extended : true}))

app.get('/' , (req , res)=>{
    res.render('form')
})

app.post('/getdata' , async (req , res)=>{

    await db.connectDb.insertOne(req.body)
    res.json("data send successfully")

})

app.get('/excel' , async (req , res)=>{

    const workbook = new exceljs.Workbook()
    const worksheet = workbook.addWorksheet('FormData')
    const formData = await db.connectDb.find().toArray()
     worksheet.columns = [
      { header: 'نمبر شمار', key: 'field1', width: 20 },
      { header: 'کتاب نمبر', key: 'field1', width: 20 },
      { header: 'اسمائے کتب', key: 'field1', width: 20 },
      { header: 'زبان', key: 'field1', width: 20 },
      { header: 'تعداد', key: 'field1', width: 20 },
      { header: 'حصے', key: 'field1', width: 20 },
      { header: 'صفحات', key: 'field1', width: 20 },
      { header: 'فن نمبر', key: 'field1', width: 20 },
      { header: 'مؤلف / مرتب', key: 'field1', width: 20 },
      { header: 'مترجم / جمع', key: 'field1', width: 20 },
      { header: 'ناشر / مظبخ', key: 'field1', width: 20 },
      { header: 'قیمت تخمیا', key: 'field1', width: 20 },
      { header: 'تاریخ', key: 'field1', width: 20 },
      { header: 'ایڈیشن', key: 'field1', width: 20 },
      { header: 'سن اشاعت', key: 'field1', width: 20 },
      { header: 'کیفیات', key: 'field1', width: 20 },
    ];

    // console.log(formData)
    
    formData.forEach(({SrNo , BookNumber , BookName , Lang , Quantity , Parts , Pages , FunNumber , Author , Translator , Publisher , Price , Date , Edition , PublicationDate , Conditions}) => {

        worksheet.addRow([SrNo , BookNumber , BookName , Lang , Quantity , Parts , Pages , FunNumber , Author , Translator , Publisher , Price , Date , Edition , PublicationDate , Conditions]);
    });
    

      const filePath = `files/formData${Date.now()}.xlsx`;
      await workbook.xlsx.writeFile(filePath);
      res.download(filePath);

})

app.listen(8080)
