import dotenv from "dotenv";

dotenv.config();

export const BASE_URL = process.env.SERVER_URL || "http://localhost:3000";
