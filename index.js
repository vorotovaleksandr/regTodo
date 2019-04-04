const app =require('./app');
const database = require('./database');
const config = require('./config')

database().then(info =>{
    console.log(`Conected to ${info.host}:${info.port}/${info.name}`);
    app.listen(config.PORT, () => 
    console.log(`Example app listening ${config.PORT}!`)
);
})
.catch(() =>{
    console.error('Unable to connect to database');
    process.exit(1);
}
)
