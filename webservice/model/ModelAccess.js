const fs=require('fs');
const HandleDBMSMySQL=require('../config/database/HandleDBMSMySQL');

class ModelAcess{
    constructor(){
        this._HandleDBMSMySQL = new HandleDBMSMySQL();
        var envFile = JSON.parse(fs.readFileSync('./config/server/env.json','utf8','r'));
    }
    destroy(param=null){
        var varToString = avarObj => Object.keys(varObj)[0];
        new Error('Parametros incorretos para a classe: \`%s\`, parâmetro \`%s\`',this.constructor.name,varToString({param}));
    }
    postAccess(timestamp=null,hostname=null,ip=null){
        this._timestamp=(typeof timestamp !== 'string' || timestamp ===null)?this.destroy(timestamp):timestamp;
        this._hostname=(typeof hostname !== 'string' || hostname ===null)?this.destroy(hostname):hostname;
        this._ip=(typeof ip !== 'string' || ip ===null)?this.destroy(ip):ip;

        var table = 'acess';
        var sqlInsert=`insert into ${envFile.database}.${table} values(null,${this._timestamp},${this._hostname},${this._ip}))`

        this._HandleDBMSMySQL.query(sqlInsert);
        this._HandleDBMSMySQL.close();
    }
}
module.exports=ModelAcess;