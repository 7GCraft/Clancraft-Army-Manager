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

  fs.writeFile(`./data/${armyUrl}.json`, JSON.stringify(data), (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error saving data');
    }

    console.log('Data saved successfully');
    res.send('Data saved successfully');
  });
});

app.get('/api/get-army-data', (req, res) => {
    const armyUrl = req.query.armyName;
    const filePath = `./data/${armyUrl}.json`
    if (fs.existsSync(filePath)) {
      // read file
      console.log('GALAXY')
      fs.readFile(`./data/${armyUrl}.json`, 'utf8', (err, data) => {
        if (err) {
      
          return res.status(404).send('File not found');
        }
    
        console.log('Data retrieved successfully');
        res.send(data);
      });
    } else {
      console.log('GALAXY2')
      // handle file not found error
      res.status(200).send()
    }
  
 
  });


app.listen(3000, () => {
    console.log(`Server listening on port ${port}`);
  });