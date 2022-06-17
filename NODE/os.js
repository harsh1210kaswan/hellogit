//Implementing commands similiar to cat commands in linux in Windows
const fs =require('fs');
//Taking input

let inputarr= process.argv.slice(2);

//seprate them on basis os commands and input files

//If these are commands we will store them here
let commandarr= [];
//If these are file inputs we will then store them here below
let filearr=[];

for(var i=0;i<inputarr.length;i++)
{
    let ch=inputarr[i].charAt(0);
    if(ch=='-')
    {
        commandarr.push(inputarr[i]);
    }
    else
    {
        filearr.push(inputarr[i]);
    }
}

// We will check if the files exist or not 
// 1. If they exist we will conitnue
//2. If they do not exist we will throw an error 
//by saying that one or more files are missing

for(var i=0;i<filearr.length;i++)
{
    let ifexist= fs.existsSync(filearr[i])
    if(ifexist)
        continue;
    else
    {
        console.log("One or more files do not exist!");
        process.exit();
    }
}

//If all files are present we will add their content to 
// a string and will perform the commands
let content="";

//looping on file array
for(let i=0;i<filearr.length;i++)
{
    let addcontent=fs.readFileSync(filearr[i]);
    content+=addcontent+"\r\n";
}

//We will first output the normal content and their after 
console.log(content);

// We will now split the content into an array of contents
let contentarr= content.split("\r\n");

let isSpresent=commandarr.includes("-s");
//if the -s command is present we will remove all the 
if(isSpresent)
{
    for(let i=0;i<contentarr.length;i++)
    {
        if(contentarr[i]=="")
            contentarr[i]=null;
    }
    //console.log(contentarr);
}



//We will now push all the string except null ones in the final array
let finalarray=[];
for(let i=0;i<contentarr.length;i++)
{
    if(contentarr[i]!=null)
    {
        finalarray.push(contentarr[i]);
    }
}
if(isSpresent)
    console.log(finalarray);
//Now we will implement the -n command which we number all the lines
let isNpresent=commandarr.includes("-n");
if(isNpresent)
{
    {
        for(let i=0;i<finalarray.length;i++)
        {
            finalarray[i]=i+1+") "+finalarray[i];
        }
    }

    console.log(finalarray);
}
