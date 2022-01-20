const express = require('express');
const app = express();
const PORT = 3000;
app.set('view engine', 'ejs');
//setting up views path;
const path = require('path');
app.set('views', path.join(__dirname, '/views'));
//setting up public path
app.use(express.static(path.join(__dirname, 'public')))
//setting up request with a body
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
//UUID
const { v4: uuid } = require('uuid');
uuid()
//method-override
const methodOverride = require('method-override');
app.use(methodOverride('_method'))

comments=[
  {
    id : uuid(),
    name : 'angela',
    comment : 'i am confused as to what u r telling'
  },
  {
    id: uuid(),
    name: 'david',
    comment: 'i am talking about the time machine panandrum'
  },
  {
    id:uuid(),
    name :'katy',
    comment: 'SAME!!!Confused'
  }
]
app.get('/', (req, res) => {
  res.render('home.ejs')

})

app.get('/comments', (req, res) => {
  res.render('comments/index.ejs',{comments});
})

app.get('/comments/new', (req,res) => {
  res.render('comments/new.ejs')
})

app.post('/comments', (req,res) => {
  let {comment,name}=req.body;
  comments.push({id:uuid(),comment:comment,name:name})
  res.redirect('/comments')
})

app.get('/comments/:id',(req, res)=>{
  let {id}=req.params;
  let fcom=comments.find(c => c.id == id);
  res.render('comments/show.ejs',{fcom})
})


app.get('/comments/:id/edit', (req, res)=>{
  let {id} = req.params;
  let fcom=comments.find(c => c.id == id);
  res.render('comments/edit.ejs',{fcom});

})

app.patch('/comments/:id', (req, res) => {
  let {comment} = req.body;
  let {id} = req.params;
  let fcom=comments.find(c => c.id == id);
  fcom.comment = comment;
  res.redirect('/comments')
})

app.delete('/comments/:id', (req, res) =>{
  let {id} = req.params;
  comments = comments.filter(c => c.id != id);
  res.redirect('/comments')
})

app.get('*', (req, res)=>{
  res.send("<h1>Nothing found if nothing useful searched!!!</h1>")
})

app.listen(PORT, () => {
  console.log("Listening on port " + PORT);
})