import { IndexType, Permission } from 'node-appwrite';

import {db, answerCollection} from '../name';
import {databases} from './config';

export default async function createAnswerCollection() {
    // create collection
    await databases.createCollection(db, answerCollection, answerCollection, [
        Permission.read("any"),
        Permission.read("users"),
        Permission.create("users"),
        Permission.update("users"),
        Permission.delete("users")
    ]);

    console.log(`Collection "${answerCollection}" created successfully.`);

    // creating atrributes
    await Promise.all([
        databases.createStringAttribute(db, answerCollection, "questionId", 50, true),
        databases.createStringAttribute(db, answerCollection, "content", 10000, true),
        databases.createStringAttribute(db, answerCollection, "authorId", 50, true)

    ]);

    console.log("Attributes created successfully.");

    // creating indexes
    // await databases.createIndex(db, answerCollection, "questionId", IndexType.Equal, ["questionId"], ["asc"]);
}