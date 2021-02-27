const { log } = require("console");
const fs = require("fs");
const path = require("path");
const sizeOf = require("image-size");

const filePath = path.resolve("./images");

const outputPath = "images/photos.json";

const outputArr = [];

function fileDisplay(filePath) {
  fs.readdir(filePath, function (err, files) {
    if (err) {
      console.log(err);
    } else {
      files.forEach((filename) => {
        const filedir = path.join(filePath, filename);
        fs.stat(filedir, function (err, stats) {
          if (err) {
            console.log(err);
          } else {
            var isFile = stats.isFile(); //是文件
            var isDir = stats.isDirectory(); //是文件夹
            if (isFile) {
              // console.log(filedir); // 读取文件内容
              // var content = fs.readdir(filedir, "utf-8");
              // console.log(content);
            } else {
              const name = fs.readdirSync(filedir);
              fname = name.map (v => {
                const dimensions = sizeOf(filedir + '/' + v);
                console.log(dimensions);
                return `${dimensions.width}.${dimensions.height} ${v}`
              })
              console.log(fname);
              const sss = {
                name: filename,
                children: fname,
              };
              outputArr.push(sss);
              fs.writeFile(outputPath, JSON.stringify(outputArr), (err) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log('写入')
                }
              })
              // fileDisplay(filedir);
            }
          }
        });
      });
    }
  });
}
fileDisplay(filePath);
