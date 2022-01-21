import React, {FC, ChangeEvent, useState, useEffect} from 'react';
import './App.css';
import {ITask} from './ITask'
import AddTaskArea from './Components/AddTaskArea';
import TaskList from './Components/TaskList';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {CollectionReference, deleteDoc, DocumentData, getFirestore, Timestamp} from '@firebase/firestore';
import { addDoc, collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import firebaseConfig from './firebaseConfig'

import { Box, Grid } from '@mui/material';
import Header from './Components/Header';

// Initialize Firebase
// const app = initializeApp(firebaseConfig); 
const app = firebase.initializeApp(firebaseConfig); // add firebase in front of the function call
const analytics = getAnalytics(app);
const db = getFirestore(app);

// Firebaseui
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false,
  },
};

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

const App: FC = () => {
  
  const [task, setTask] = useState<string>("");
  const [deadline, setDeadline] = useState<Date>(new Date());
  // const [deadline, setDeadline] = useState<number>(0);
  const [todoList, setTodoList] = useState<ITask[]>([]);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false); // Local signed-in state.
  const [collectionRef, setCollectionRef] = useState<CollectionReference<DocumentData>>(collection(db, "todolists_datetime", "testuser", "tasks"));
  // Listen to the Firebase Auth state and set the local state.

  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      setIsSignedIn(!!user);
    });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  useEffect(()=>{
    if(isSignedIn) {
      setCollectionRef(collection(db, "todolists_datetime", firebase.auth().currentUser!.uid,"tasks"));
    } else {
      setCollectionRef(collection(db, "todolists_datetime", "testuser","tasks"));
    }
  },[isSignedIn]);

  useEffect(()=>{fetchTodoList();},[collectionRef]);

  const fetchTodoList = async() => {

    console.log(collectionRef)
    const querySnapshot = await getDocs(collectionRef);
    const cache: ITask[] = [];
  
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      cache.push({taskName:doc.data().name, deadLine: doc.data().deadline.toDate(), taskId: doc.id});
    });
  
    setTodoList(cache);

  }

  const addTask = async () => {
    if(task==="") {
      await addDoc(collectionRef, {
        name: "Untitled Task", deadline: deadline});
    } else {
      await addDoc(collectionRef, {
        name: task, deadline: deadline});
    }
    fetchTodoList();
    setTask("");
    setDeadline(new Date());
  }

  const completeTask = async (key: string) => {
    setTodoList(todoList.filter((task)=>{return task.taskId!=key}));
    await deleteDoc(doc(collectionRef,key));
    //fetchTodoList();
  }

  if(!isSignedIn) {
    return (
      <Grid container spacing={2} textAlign="center">
        <Grid item xs={12}><h1>TodoList</h1></Grid>
        <Grid item xs={12}><p>Please sign-in:</p></Grid>
        <Grid item xs={12}><StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} /></Grid>
      </Grid>
    );
  } else {
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

}

export default App;
