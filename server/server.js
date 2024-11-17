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

const path = require('path');

// Serve static files from the React frontend app
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));

  // Handle any other routes and send back index.html
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}


app.get('/', (req, res) => res.send('Hello World!'))


 


app.listen(port, () => console.log(`Node JS Server Started in Port ${port}`))