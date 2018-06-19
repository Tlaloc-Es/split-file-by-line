const fs = require('fs');

module.exports = {
  split: function(fileIn, fileOut, numLines, callback) {
    var fileArray = []
    var lines = require('fs').readFileSync(fileIn, 'utf-8')
    .split('\n')
    .filter(Boolean);
    
    var counterFile = 0
    var counterLines = 0
    for (i = 0; i < lines.length; i++) { 
      counterLines++
      fileName = fileOut + String(counterFile)
      fs.appendFileSync(fileName, lines[i], function (err) {
        if (err) {throw err}
      })
      if(i != lines.length || counterLines != numLines){
        fs.appendFileSync(fileName, "\n", function (err) {
          if (err) {throw err}
        })
      }
      
      if(counterLines == numLines){
        fileArray.push(fileName)
        counterFile++
        counterLines = 0
      }

      if(i==(lines.length-1)){
        fileArray.push(fileName)
      }
    
    }
    
    callback(fileArray)

  }
};
