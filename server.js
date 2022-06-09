const express = require('express');
const hbs = require('express-handlebars');
const path = require('path');

const app = express();

app.engine('.hbs', hbs());
//app.engine('hbs', hbs({ extname: 'hbs', layoutsDir: './layouts', defaultLayout: 'main' }));

app.set('view engine', '.hbs');



app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/public')));



app.post('/contact/send-message', (req, res) => {

  const allowedExtensions = /(\.png|\.jpg|\.jpeg |\.gif)$/i;
  const { author, sender, title, message, image } = req.body;

  if (author && sender && title && message && allowedExtensions.exec(image)) {
    res.render('contact', { isSent: true, image: req.body.image });
  }
  else {
    res.render('contact', { isError: true });
  }

});

app.get('/hello/:name', (req, res) => {
  res.render('hello', { name: req.params.name });
});

app.get('/', (req, res) => {
  res.render('index',);
});

app.get('/about', (req, res) => {
  res.render('about.hbs', { layout: 'dark' });
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.get('/info', (req, res) => {
  res.render('info',);
});

app.get('/history', (req, res) => {
  res.render('history',);

});



app.use((req, res) => {
  res.status(404).send('404 not found...');
})

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});