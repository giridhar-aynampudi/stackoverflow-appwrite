import {db} from '../name';
import createAnswerCollection from './answer.collection';
import createCommentCollection from './comment.collection';
import createQuestionCollection from './question.collection';
import createVoteCollection from './vote.collection';

import { databases } from './config';

export default async function getOrCreateDB() {
    try {
        await databases.get(db);
        console.log(`Database "${db}" connected.`);
    } catch (error) {
        try {
            await databases.create(db, db);
            console.log(`Database "${db}" created successfully.`);
            // create collections
            await Promise.all([
                createQuestionCollection(),
                createAnswerCollection(),
                createCommentCollection(),
                createVoteCollection()
            ]);
            console.log("Collections created successfully.");
            console.log("database connected successfully.");
        } catch (error) {
            console.error("Failed to create database or connect to it.", error);
        }
    }

    return databases;
}