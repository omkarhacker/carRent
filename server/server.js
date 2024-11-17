const express = require('express')
const app = express()
const dotenv = require('dotenv')
const cors = require('cors');
const port = process.env.PORT || 5000
dotenv.config();
const dbConnection = require('./db')
app.use(express.json())
app.use(cors());
app.use(cors({
    origin:  process.env.URL // Allow requests from this frontend
  }));
//env config

app.use('/api/cars/' , require('./routes/carsRoute'))
app.use('/api/users/' , require('./routes/usersRoute'))
app.use('/api/bookings/' , require('./routes/bookingsRoute'))


const path = require('path');
const { SystemModule } = require('@faker-js/faker');

if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use('/', express.static('client/build'));

  app.get('*', (req, res) => {
      // Serve index.html for all other routes
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}


app.get('/', (req, res) => res.send('Hello World!'))


 


app.listen(port, () => console.log(`Node JS Server Started in Port ${port}`))