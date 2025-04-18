const { exec } = require('child_process');
const os = require('os')

const getMinimizer = () => {
  const platform = os.platform();

  return new Promise((resolve, reject) => {
    if (platform.includes('darwin')) {
      exec('pbpaste', (error, stdout, stderr) => {
        if (error) {
          resolve("");
        }
        resolve(stdout.trim());
      }); 
    }
    else if (platform.includes('win')) {
      exec('powershell Get-Clipboard', (error, stdout, stderr) => {
        if (error) {
          resolve("");
        }
        resolve(stdout.trim());
      });    
    }
    else if (platform.includes('linux')) {
      exec('xclip -o', (error, stdout, stderr) => {
        if (error) {
          resolve("");
        }
        resolve(stdout.trim());
      });      
    }
  })
}

module.exports = {
  getMinimizer,
}