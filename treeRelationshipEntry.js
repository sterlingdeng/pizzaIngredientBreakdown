const fs = require("fs");
const csv = require("csv-parser");
const bulkDataStructure = require("./treeRelationAlgo");

const csvData = "./data.csv";
const bulkDataStruct = new bulkDataStructure();

// utility function to process the csv file and read in data row by row, uses csv-parser node package.
const readDataAndCalculate = file => {
  fs.createReadStream(file)
    .pipe(csv())
    .on("data", row => {
      bulkDataStruct.parseFileToBranchStructure(row);
    })
    .on("end", function() {
      console.log(bulkDataStruct.nodeChildPercentRelationship);
      bulkDataStruct.combineBranchesToFormTreeStructure();
      // console.log(bulkDataStruct.bulkDataMap);
      console.log(bulkDataStruct.nodeChildPercentRelationship);
    });
};

// Run the script and read the csv and calculate the proportions
readDataAndCalculate(csvData);
