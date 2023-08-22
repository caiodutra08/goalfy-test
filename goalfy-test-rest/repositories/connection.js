import * as dotenv from "dotenv";
dotenv.config();
import mysql from "mysql2/promise";
import bluebird from "bluebird";

export const db = await mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
	Promise: bluebird,
});