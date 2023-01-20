import dotenv from "dotenv";

dotenv.config();

export const BASE_URL = process.env.Server_URL || "http://localhost:3000";
