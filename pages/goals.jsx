import Layout from "../components/Layout";
import styles from './../components/Goals/goals.module.css'
import Image from 'next/image'
import GoalCard from "../components/Goals/GoalCard";
import {useRouter} from "next/router"
import { useState } from "react";


export default function Goals() {
  const router = useRouter()
  const goalsHeaders = [{title:"Meditate",image:'/goals_icons/meditate.svg'},{title:"Read",image:'/goals_icons/read.svg'},{title:"Spiritual",image:'/goals_icons/pisces.svg'},{title:"Workout",image:'/goals_icons/workout.svg'},{title:"Study",image:'/goals_icons/study.svg'},{title:"Other",image:'/goals_icons/other.svg'}]
  const [selected,setSelected] =useState(false)
  return (
    <Layout>
      <div className={styles.wrapper}>
      <div className="mt-3" />
      <div className={styles.header}>Logo.</div>
      <div className="mt-4"/>
      <div className={styles.header}>My goals</div>
      <div className="mt-4" />
      <div className={styles.subheaderText}>Set personal goal to optmize your time and
      set yourself higher.</div>
      <div className="mt-4" />
      <div className={styles.container}>
        {goalsHeaders.map((card,idx) => (
          <GoalCard selected={selected} setSelected={setSelected} card={card} idx={idx}/>
        ))}
      </div>
      <div className="mt-8 mb-8" />
      <div className={styles.flexCenter}>
        <button className={styles.button} onClick={()=>router.push("/")}>Done</button>
      </div>
      </div>
   </Layout>
  );
}
