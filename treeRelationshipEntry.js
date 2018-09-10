const fs = require("fs");
const csv = require("csv-parser");
const PizzaDataStructure = require("./pizzaBulk");

const csvData = "./data.csv";
const bulkDataStruct = new PizzaDataStructure();

// utility function to process the csv file and read in data row by row, uses csv-parser node package.
const readDataAndCalculate = file => {
  fs.createReadStream(file)
    .pipe(csv())
    .on("data", row => {
      bulkDataStruct.parseFileToAdjList(row);
    })
    .on("end", function() {
      bulkDataStruct.calculatePercentages("pizza bulk");
      bulkDataStruct.listRawMaterials();
    });
};

// Run the script and read the csv and calculate the proportions
readDataAndCalculate(csvData);
