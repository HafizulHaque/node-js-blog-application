let express = require('express');
let morgan = require('morgan');
let mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes')

const dbURI = `mongodb+srv://nemonobody:nemo97@mycluster.mbhyp9f.mongodb.net/blog-collection?retryWrites=true&w=majority`;

//connect to database
mongoose.connect(dbURI, {
  useNewUrlParser: true, 
  useUnifiedTopology: true
})
  .then(res => console.log('connected to db'))
  .catch(err => {
    console.log('database connection failed');
    console.log(err);
  })

//express app
let app = express();
//browser port
let port = 8082;

//register view engine
app.set('view engine', 'ejs')

//app listen
app.listen( process.env.PORT | port, ()=>{
  console.log(`app listening on port ${port}`);
})

//--------middleware-----------

//static 
app.use(express.static('public'));

//paring body
// app.use(express.urlencoded({extended: true}));
app.use(express.json());

//logging
app.use(morgan('dev'));

//---------routes---------------

app.get('/', (req, res)=>{
  res.redirect('/blogs');
})

//---- blog routes ----
app.use('/blogs', blogRoutes)


app.get('/about', (req, res)=>{
  res.status(200).render('about', {title: 'About'});
})

//---- default route ----
app.use((req, res)=>{
  res.status(404).render('404', {title: '404', errMsg: 'Page not found!'});
})