import React, {FC, ChangeEvent, useState, useEffect} from 'react';
import './App.css';
import {ITask} from './ITask'
import AddTaskArea from './Components/AddTaskArea';
import TaskList from './Components/TaskList';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {deleteDoc, getFirestore, Timestamp} from '@firebase/firestore';
import { addDoc, collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import firebaseConfig from './firebaseConfig'
import { Box, Grid } from '@mui/material';
import Header from './Components/Header';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// const citiesRef = collection(db, "cities");

// async function addData() {
//   await setDoc(doc(citiesRef, "SF"), {
//     name: "San Francisco", state: "CA", country: "USA",
//     capital: false, population: 860000,
//     regions: ["west_coast", "norcal"] });
//   await setDoc(doc(citiesRef, "LA"), {
//     name: "Los Angeles", state: "CA", country: "USA",
//     capital: false, population: 3900000,
//     regions: ["west_coast", "socal"] });
//   await setDoc(doc(citiesRef, "DC"), {
//     name: "Washington, D.C.", state: null, country: "USA",
//     capital: true, population: 680000,
//     regions: ["east_coast"] });
//   await setDoc(doc(citiesRef, "TOK"), {
//     name: "Tokyo", state: null, country: "Japan",
//     capital: true, population: 9000000,
//     regions: ["kanto", "honshu"] });
//   await setDoc(doc(citiesRef, "BJ"), {
//     name: "Beijing", state: null, country: "China",
//     capital: true, population: 21500000,
//     regions: ["jingjinji", "hebei"] });
// }

// const readTodoList = async () => {
//   const docRef = doc(db, "cities", "SF");
//   const docSnap = await getDoc(docRef);
//   if (docSnap.exists()) {
//     console.log("Document data:", docSnap.data());
//   } else {
//     // doc.data() will be undefined in this case
//     console.log("No such document!");
//   }  
// }

const user:string = "testuser";

const collectionRef = collection(db, "todolists_datetime", user, "tasks");

const App: FC = () => {
  
  const [task, setTask] = useState<string>("");
  const [deadline, setDeadline] = useState<Date>(new Date());
  // const [deadline, setDeadline] = useState<number>(0);
  const [todoList, setTodoList] = useState<ITask[]>([]);

  const updateTodoList = async() => {
    const querySnapshot = await getDocs(collectionRef);
  
    const cache: ITask[] = [];
  
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      cache.push({taskName:doc.data().name, deadLine: doc.data().deadline.toDate(), taskId: doc.id});
    });
  
    setTodoList(cache);
  }

  useEffect(()=>{updateTodoList();},[]);

  const addTask = async () => {
    
    await addDoc(collectionRef, {
    name: task, deadline: deadline});
    updateTodoList();
    setTask("");
    setDeadline(new Date());
  }

  const completeTask = async (key: string) => {
    await deleteDoc(doc(collectionRef,key));
    // setTodoList(todoList.filter((task, index)=>{return index!=key}));
    updateTodoList();
  }

  return (
    <Grid container spacing={2}  text-align="center" alignItems="center"
    justifyContent="center"
    >
      {/*value*/}
      <Grid item xs={12}>
        <Header/>
      </Grid>
      <Grid item xs={12}>
        <AddTaskArea task={task} deadline={deadline} setTask={setTask} setDeadline={setDeadline} addTask={addTask}/>
      </Grid>
      <Grid item xs={12}>
        <TaskList todoList={todoList} completeTask={completeTask}/>
        {/* {todoList.map((task: ITask, key: number) => {return <TodoTask key={key} task={task} completeTask={completeTask}/>})}   */}
      </Grid>      
    </Grid>
  );
}

export default App;
