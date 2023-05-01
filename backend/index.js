const fs = require('fs');
const express = require('express');
const { application } = require('express');
const app = express();

const port = process.env.PORT || 3000;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
app.use(express.json());



app.post('/api/save-army-data', (req, res) => {
  const data = req.body.armyData;
  const armyUrl = req.body.armyName;



  fs.writeFile(`./data/armies/${armyUrl}.json`, JSON.stringify(data), err => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error saving data');
    }

    res.send('Data saved successfully');
  });
});

app.get('/api/get-army-data', (req, res) => {
  if (!fs.existsSync('./data/armies')) {
    fs.mkdirSync('./data/armies');
  }

  const armyUrl = req.query.armyName;

  const filePath = `./data/armies/${armyUrl}.json`;
  if (fs.existsSync(filePath)) {
    // read file
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        return res.status(404).send('File not found');
      }

      res.send(data);
    });
  } else {
 
    // handle file not found error
    res.status(200).send();
  }
});

app.get('/api/get-state-list', (req, res) => {

  const filePaths = {
    armyMap: './data/references/STATE_MAP.json',
    armyData: './data/references/STATE_ID.json',
    currency: './data/references/Currency.json'
  };

  const data = {};

  for (const [key, filePath] of Object.entries(filePaths)) {
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, 'utf8');
      data[key] = JSON.parse(fileData);
    }
  }
  

  res.send(data);
});

app.post('/api/add-new-state', (req, res) => {
  const filePaths = {
    armyMap: './data/references/STATE_MAP.json',
    armyData: './data/references/STATE_ID.json',
    currency: './data/references/CURRENCY.json'
  };
  for (const [key, filePath] of Object.entries(filePaths)) {
    if (fs.existsSync(filePath)) {
      fs.writeFile(filePath, JSON.stringify(req.body[key]), err => {
        if (err) {
          console.error(err);
          return res.status(500).send('Error saving data');
        }
      });
    }
  }
  res.send('Data saved successfully');
});


app.post('/api/replenish-all-state',(req,res)=>{
  let folderPath = './data/armies'
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error(`Error reading directory: ${err}`);
      return;
    }
  
    // Iterate over each file in the directory
    files.forEach((file) => {
      const filePath = path.join(directoryPath, file);
  
      // Read the file contents
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          console.error(`Error reading file ${filePath}: ${err}`);
          return;
        }
  
        try {
          // Parse the JSON data
          const jsonData = JSON.parse(data);
  
          // Add the new property to each object in the JSON data
          jsonData.forEach((obj) => {
            obj.newProperty = propertyToAdd;
          });
  
          // Write the modified JSON data back to the file
          fs.writeFile(filePath, JSON.stringify(jsonData), (err) => {
            if (err) {
              console.error(`Error writing file ${filePath}: ${err}`);
              return;
            }
            console.log(`Successfully updated file ${filePath}`);
          });
        } catch (err) {
          console.error(`Error parsing JSON in file ${filePath}: ${err}`);
        }
      });
    });
  });
})
app.listen(port, () => {});
