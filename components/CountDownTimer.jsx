import Image from 'next/image'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { useState } from 'react'
import React from 'react'
// import { useWakeLock } from 'react-screen-wake-lock'


const renderTime = ({ remainingTime }) => {

  if (remainingTime === 0) {
    return <div className="timer" class="flex flex-col items-center text-orange-500 text-lg font-['Montserrat']">You did it!</div>;
  }

  return (
    <div className="timer" class="text-orange-500"  >
      <div className="text">Remaining</div>
      <div className="value">{remainingTime}</div>
      <div className="text" class="text-white">seconds</div>
    </div>
  );
};

export default function CountDownTimer() {
  const [key, setKey] = useState(false)
  const [playingKey, setPlayingKey] = useState(false)
  const [buttonTitle, setButtonTitle] = useState("Start Activity")
  const [circleColor, setColorCircle] = useState('#2D842B')

  const changeBG = () => {
    if (typeof window !== 'undefined') {
      if (playingKey == true) {
        // 'always on display' mode for activating breaktime
        document.body.style.backgroundColor = 'black'
        document.getElementById('break-button').style.backgroundColor = '#3d3d3d'
        document.getElementById('pause-button').style.backgroundColor = '#3d3d3d'
        document.getElementById('task').style.color = '#3d3d3d'
        document.getElementById('desc').style.color = '#676767'
      }
      else {
        // pausing or quitting task
        document.body.style.backgroundColor = '#2a322a'
        document.getElementById('break-button').style.backgroundColor = '#f7631c'
        document.getElementById('pause-button').style.backgroundColor = '#f7631c'
        document.getElementById('task').style.color = '#f7631c'
        document.getElementById('desc').style.color = 'white'
      }
    }
  }

  // changeBG()

  // const { isSupported, released, request, release } = useWakeLock({
  //   onRequest: () => console.log('Screen Wake Lock: requested!'),
  //   onError: () => console.log('An error happened 💥'),
  //   onRelease: () => console.log('Screen Wake Lock: released!'),
  // });
  const changeTitle = () => {
    if(playingKey){
      setButtonTitle("Continue Activity")

    }else{
      setButtonTitle("Take a break")
    }
  };


  return (
    <div className="App" class="place-items-center text-center">
      <div className='back-button-wrapper'>
        <button className="back-button">
          <Image
            src='/public/arrow.png/'
            width={20}
            height={20}
          />
        </button>
      </div>

      <p id="desc">
        Focus on improving yourself
      </p>
      <p id="task" className='task' class="text-3xl font-bold text-orange-600">
        TIME TO INDULGE IN READING
      </p>
      <div className="timer-wrapper" class="flex justify-center">
        <CountdownCircleTimer
          key={key}
          isPlaying={playingKey}
          duration={30}
          size={300}
          rotation={'counterclockwise'}
          strokeWidth={18}
          trailStrokeWidth={17}
          colors={circleColor}
          colorsTime={[7, 5, 2, 0]}
          onComplete={() => [true, 1000]}
        >
          {renderTime}

        </CountdownCircleTimer>
      </div>
      <div class="button" className="button-wrapper">
        <button id="break-button" className="break-button" class="font-['Montserrat'] bg-orange-600 text-sm text-white w-[50vw] max-w-[281px] h-[6vh] rounded-[15px] hover:bg-orange-700 cursor-pointer"
          onClick={() => { 
            // (request()); 
          setPlayingKey(!playingKey);setColorCircle('#3d3d3d'); changeTitle() }}>
          {buttonTitle}
        </button>
      </div>

      {/* <div className="pause">
        <button id="pause-button" className="pause-button" class="bg-orange-600 text-white inline-block w-16 h-16 text-center m-4 rounded-full hover:bg-orange-700 cursor-pointer"
          onClick={() => { 
            // (release()); 
            setPlayingKey(false);setColorCircle('#2D842B');setButtonTitle("Continue Activity") }}>
          | |
        </button>
      </div> */}

      {/* <p>
        Screen Wake Lock API supported: <b>{`${isSupported}`}</b>
        <br />
        Released: <b>{`${released}`}</b>
      </p> */}
    </div>
  );
}