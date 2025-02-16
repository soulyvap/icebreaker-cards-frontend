import SQLite from "react-native-sqlite-storage";
import { QuestionModel } from "../../domain/models/QuestionModel";

export const localDB = SQLite.openDatabase(
  { name: "questions.db", location: "default" },
  () => console.log("✅ Database connected!"),
  error => console.error("❌ Database connection error:", error)
);

export const setupDatabase = () => {
  localDB.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS questions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        text TEXT NOT NULL,
        level INTEGER NOT NULL,
        isFavorite INTEGER DEFAULT 0,
        isWildcard INTEGER DEFAULT 0,
        isSynced INTEGER DEFAULT 0,
        lastModified INTEGER NOT NULL
      );`,
      [],
      () => console.log("✅ Questions table ready!"),
      error => console.error("❌ Error creating table:", error)
    );
  });
};

export const insertQuestions = (questions: QuestionModel[]) => {
  localDB.transaction(tx => {
    questions.forEach(question => {
      tx.executeSql(
        `INSERT INTO questions (text, level, isFavorite, isWildcard, isSynced, lastModified) VALUES (?, ?, ?, ?, ?, ?);`,
        [question.text, question.level, question.isFavorite ? 1 : 0, question.isWildcard ? 1 : 0, question.isSynced ? 1 : 0, question.lastModified],
        () => console.log(`✅ Inserted question: ${question.text}`),
        error => console.error("❌ Error inserting question:", error)
      );
    });
  });
};

export const getQuestions = (callback: (questions: QuestionModel[]) => void) => {
  localDB.transaction(tx => {
    tx.executeSql(
      `SELECT * FROM questions;`,
      [],
      (_, results) => {
        let questions = [];
        for (let i = 0; i < results.rows.length; i++) {
          questions.push(results.rows.item(i));
        }
        callback(questions);
      },
      error => console.error("❌ Error fetching questions:", error)
    );
  });
};
