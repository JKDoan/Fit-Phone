import React from 'react'
import Records from '../pages/api/records.json'
import ProgressBar from "@ramonak/react-progress-bar"
import Link from 'next/link'

//TO INSERT JENNY'S PAGE ON LINK AND SEE IF IT INTERACTS BETWEEN SCREENS SUCCESSFULLY 
export default function HomePage() {
  return (
    Records && Records.map(record => {
      return(   
        <>
        <Link href={`/rewards`}>
        <div className="flex flex-row h-32 my-12 border-2 rounded-lg border-white-text mx-2.5">
          <div className="mx-4 mt-8 w-15 ">
          <img src={record.icon}/>
          </div>
          <div className="relative mr-8 text-white-text top-8 align-center ">
          {record.title}
          <br></br>
          {record.description}
          </div>
          <div className="w-32 mt-2 mr-2"> 
          <ProgressBar
          completed={80}
          className="wrapper"
          maxCompleted={100}
    bgColor="#ED5005"
          />
          </div>
          </div>
          </Link>
        </>
         
      )
    
    }) 
       
  )
     
}

     

      


