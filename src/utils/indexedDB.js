import { openDB } from 'idb';

const DB_NAME = 'QuizDB';
const STORE_NAME = 'quizHistory';

export const initDB = async () => {
    return openDB(DB_NAME, 1, {
        upgrade(db) {
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
            }
        },
    });
};

export const saveQuizAttempt = async (score, totalQuestions, timestamp) => {
    const db = await initDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    await store.add({ score, totalQuestions, timestamp });
    return tx.done;
};

export const getQuizHistory = async () => {
    const db = await initDB();
    return db.getAll(STORE_NAME);
};
