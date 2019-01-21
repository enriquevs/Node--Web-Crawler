const http = require('http')
const fs = require('fs')
const path = require('path')
const uuidv5 = require('uuid/v5');

const downloadpage = async (URL) => {
  console.log(' downloading' + URL)

    const folder = await uuidv5(URL, uuidv5.URL)
    fs.mkdirSync(`./${folder}`, { recursive: true }, (err) =>{
    if (err) throw err;
});
const fetchPage = (linkUrl, callback) => {
    let content = "";
    const req = http.request(linkUrl, function (res){
        res.setEncoding("utf8");
        res.on("data", chunk => content+=chunk);
        res.on("end", function(){
            callback(folder, content, URL);
        });
    });
    req.on('error', e=> console.error(e))
    req.end();
    }
    const write = (carpet, data, urlData) =>{
    fs.writeFile(`./${carpet}/file.html`, data, (err) =>{
    if (err) throw err;
    //console.log('The file has been saved');
    });
    fs.writeFile(`./${carpet}/url.txt`, urlData, (err) =>{
    if (err) throw err;
  });

  console.log(' downloading is done in folder' + carpet)

}
    fetchPage(URL, write)
}
downloadpage(process.argv[2]);
// downloadpage("http://www.google.com.mx/");
