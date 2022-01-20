import { Timestamp } from "firebase/firestore";

export interface ITask {
    taskId: string;
    taskName: string;
    deadLine: Date;
}