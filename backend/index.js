const fs = require('fs');
const express = require('express');
const app = express();

const port = process.env.PORT || 3000;



app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(express.json());


app.post('/api/save-army-data', (req, res) => {
  const data = req.body.armyData;
  const armyUrl = req.body.armyName;

  if (!fs.existsSync('./data')) {
    fs.mkdirSync('./data');
  }

  fs.writeFile(`./data/${armyUrl}.json`, JSON.stringify(data), (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error saving data');
    }

 
    res.send('Data saved successfully');
  });
});

app.get('/api/get-army-data', (req, res) => {

  if (!fs.existsSync('./data')) {
    fs.mkdirSync('./data');
  }

    const armyUrl = req.query.armyName;
    const filePath = `./data/${armyUrl}.json`
    if (fs.existsSync(filePath)) {
      // read file
      fs.readFile(`./data/${armyUrl}.json`, 'utf8', (err, data) => {
        if (err) {
      
          return res.status(404).send('File not found');
        }
    
   
        res.send(data);
      });
    } else {

      // handle file not found error
      res.status(200).send()
    }
  
 
  });


app.listen(port, () => {
  });