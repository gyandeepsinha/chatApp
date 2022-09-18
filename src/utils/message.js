const generateMessage   =   (userName,text) => {
    console.log('userName'+userName);
    return{
        userName,
        text,
        createdAt : new Date().getTime()
    }
}
module.exports  =   { generateMessage}