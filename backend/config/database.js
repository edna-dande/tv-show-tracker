import mysql from "mysql2";
import fs from "fs";
import { Client } from "ssh2";

const ssh = new Client();
// create the connection to database

const dbServer = {
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '2023Really!',
    database: 'tv_show_tracker'
};
const tunnelConfig = {
    host: '127.0.0.1',
    port: 2200,
    username: 'vagrant',
    privateKey:  fs.readFileSync('/Users/eamondi/first-vagrant/.vagrant/machines/default/virtualbox/private_key'),
    password: '2023Really!'
};
const forwardConfig = {
    srcHost: '127.0.0.1',
    srcPort: 3306,
    dstHost: dbServer.host,
    dstPort: dbServer.port
};
const db = new Promise((resolve, reject) => {
    ssh.on('ready', () => {
        ssh.forwardOut(
        forwardConfig.srcHost,
        forwardConfig.srcPort,
        forwardConfig.dstHost,
        forwardConfig.dstPort,
        (err, stream) => {
             if (err) reject(err);
             const updatedDbServer = {
                 ...dbServer,
                 stream
            };
            const connection =  mysql.createConnection(updatedDbServer);
           connection.connect((error) => {
            if (error) {
                reject(error);
            }
            resolve(connection);
            });
        });
    }).connect(tunnelConfig);
});
  
export default db;