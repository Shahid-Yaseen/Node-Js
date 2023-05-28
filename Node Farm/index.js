const http=require('http');
const url=require('url');
const fs=require('fs');
const productTemplate=fs.readFileSync('./templates/productTemplate.html','utf-8');
const cardTemplate=fs.readFileSync('./templates/cardTemplate.html','utf-8');
const overviewTemplate=fs.readFileSync('./overview.html','utf-8');
const data=JSON.parse(fs.readFileSync('./Data/data.json','utf-8'));

//console.log(dataObj)
//console.log(productTemplate);
const replaceTemplate=function(temp,obj){
    let newTemp=temp.replace(/{%IMAGE%}/g,obj.image);
    newTemp=newTemp.replace(/{%PRODUCT_NAME%}/g,obj.productName);
    newTemp=newTemp.replace(/{%QUANTITY%}/g,obj.quantity);
    newTemp=newTemp.replace(/{%PRICE%}/g,obj.price);   
    newTemp=newTemp.replace(/{%ID%}/g,obj.id);
    newTemp=newTemp.replace(/{%FROM%}/g,obj.from);
    newTemp=newTemp.replace(/{%DESCRIPTION%}/g,obj.description)
    newTemp=newTemp.replace(/{%NUTRIENTS%}/g,obj.nutrients)
    if(!obj.organic) newTemp=newTemp.replace(/{%ORGANIC%}/g,'hidden');
    return newTemp;
}

const server=http.createServer((req,res)=>{
    //console.log(url.parse(req.url, true))
    const {query:q,pathname:pathName}=url.parse(req.url,true);
    console.log(q)
    console.log(pathName)
    if(pathName==='/overview'||pathName==='/'){
       res.writeHead(200,{
        'content-type':'text/html'
       })
      
       const tempCards=data.map(el=>replaceTemplate(cardTemplate,el)).join('');
       const output=overviewTemplate.replace(/{%OVERVIEW%}/g,tempCards);
       res.end(output);
    }
    else if(pathName==='/product'){
        res.writeHead(200,{'content-type':'text/html'});
        const pro=data[q.id];
        const output=replaceTemplate(productTemplate,pro);
        res.end(output);
    }
   
});
server.listen(8000,'127.0.0.1',()=>{
  
})