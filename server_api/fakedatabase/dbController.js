import fs from "fs";
import path from "path";


const dbPath = path.join(__dirname,"database.json");


export const database = {
    /* 
    --- DB Structure ---
    db = {
        users:[],
    }
    
    */
    getData:()=>{
        try {
            const data = fs.readFileSync(dbPath);
            const parsedData = JSON.parse(data);
            if(!parsedData.users){
                parsedData.users = [];
            }
            return parsedData;
        } catch (error) {
            return {users:[]};
        }
    },

    write:(data)=>{
        const db = database.getData();
        db.users.push(data);
        fs.writeFileSync(dbPath,JSON.stringify(db,null,2));

    }


}