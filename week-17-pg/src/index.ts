import {Client} from "pg";
import express from "express";

const pgClient=new Client("postgresql://neondb_owner:npg_c9HwoA6OZIYP@ep-flat-grass-a8shxklh-pooler.eastus2.azure.neon.tech/neondb?sslmode=require")

async function main(){
    await pgClient.connect();
    const response = await pgClient.query("SELECT email FROM users ;")
    console.log(response.rows);


}
main();




