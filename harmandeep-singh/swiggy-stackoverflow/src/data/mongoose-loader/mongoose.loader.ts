import { Db } from "mongodb";
import mongoose from "mongoose";
import { config } from "../../config";

export default async function (): Promise<Db> {
    const dbUri = config["DB_URI"] as string;
    const connection = await mongoose.connect(dbUri, {});
    return connection.connection.db;
} 