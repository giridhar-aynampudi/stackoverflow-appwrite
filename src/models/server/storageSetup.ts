import { Permission } from "node-appwrite";
import { questionAttachmentBucket } from "../name";
import { storage } from "./config";

export default async function getOrCreateStorage() {
    try {
        await storage.getBucket(questionAttachmentBucket);
        console.log("Storage Connected successfully.");
    } catch (error) {
        try {
            await storage.createBucket(questionAttachmentBucket, questionAttachmentBucket,
                [
                    Permission.read("any"),
                    Permission.read("users"),
                    Permission.create("users"),
                    Permission.update("users"),
                    Permission.delete("users")
                ],
                false,
                undefined,
                undefined,
                ["jpg", "png", "gif", "bmp", "jpeg", "avi", "webp", "heic"]
            );
            console.log("Storage bucket created successfully.");
        } catch (error) {
            console.error("Failed to connect or create storage bucket:", error);
        }
    }
}