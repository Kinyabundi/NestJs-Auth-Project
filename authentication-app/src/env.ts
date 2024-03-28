require("dotenv").config();

export const JWT_SECRET = process.env.JWT_SECRET || "";
export const POSTGRES_HOST = process.env.POSTGRES_HOST || "";
export const POSTGRES_PORT = process.env.POSTGRES_PORT || "";
export const POSTGRES_USER = process.env.POSTGRES_USER || "";
export const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD || "";
export const POSTGRES_DB = process.env.POSTGRES_DB || "";