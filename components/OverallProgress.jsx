import React from "react";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
// import useState from 'react'
// import Datepicker
import Script from "next/script";
// import {
//     Chart as ChartJS,
//     CategoryScale,
//     LinearScale,
//     PointElement,
//     LineElement,
//     Title,
//     Tooltip,
//     Line,
//     Legend,
//   } from 'chart.js';

//   ChartJS.register(
//     CategoryScale,
//     LinearScale,
//     PointElement,
//     LineElement,
//     Title,
//     Tooltip,
//     Legend
//   );
import { Chart as ChartJS } from "chart.js/auto";
import { Chart, Line } from "react-chartjs-2";
import ProgressItem from "./ProgressItem";
import TimePicker from "rc-time-picker";
import "rc-time-picker/assets/index.css";

// import {Chart as ChartJS} from 'chart.js/auto'

// ChartJS.register(
//     CategoryScale,
//     LinearScale,
//     PointElement,
//     LineElement,
//     Title,
//     Tooltip,
//     Legend,
//     Line
//     );
// import {ChartConfig} from '../components/ChartConfig';
const data = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      label: "My First dataset",
      data: [1, 2, 3, 1, 5, 6],
      // backgroundColor: "rgba(59, 130, 246, 0.2)",
      borderColor: "#FF6384",
    },
    {
      label: "My First dataset",
      data: [6, 3, 3, 2, 1, 6],
      // backgroundColor: "#FF6384",
      borderColor: "#3B82F6",
    },
  ],
};
const options = {
  plugins: {
    // show legends for our graph
    legend: {
      display: true,
    },
  },
  elements: {
    line: {
      tension: 0.4,
      borderWidth: 2,
      // fill: "start",
      // legend: 'end',
      pointHoverRadius: 5,
    },
    point: {
      radius: 3,
      hitRadius: 10,
    },
  },
  lineHeightAnnotation: {
    always: true,
    lineWeight: 1.5,
  },

  //   animate in
  animation: {
    duration: 1,
  },
  responsive: true,
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

function useOverallProgressData() {
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const callback = React.useCallback(async () => {
    const response = await fetch("http://localhost:3000/api/overall-progress");
    const json = await response.json();
    setData(json);
    setIsLoading(false);
  }, []);

  return { data, isLoading, callback };
}
const str = 'HH:mm';




export default function OverallProgress() {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [time, setTime] = React.useState("");

  const {
    data: myData,
    isLoading,
    callback: loadData,
  } = useOverallProgressData();

  function onChange(value) {

    // console.log(value && value.format(str));
    try{
    setTime(value.format(str))
    }catch(error){

    }
    console.log(time)
  }

  const sendData = (newTime) => {
    if(time == "00:00"){
    alert("Select meaningful time!");

    }else{
    alert("Your question was successfully sent!" + time);
    }
  };

  React.useEffect(() => {
    loadData();
  }, []);

  console.log("myData", myData);

  return (
    <>
      <div className="container">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div>

         
        <div className="chart-container p-2">
          <h1 className="overall-progress-title">Overall Progress</h1>
          <Line data={data} options={options} />
        </div>
        <h1 className="overall-progress-title">Status Per Activity</h1>
        <div className="items">
          <div className="item">
            <ProgressItem activity="Meditation" />
          </div>
          <div className="item">
            <ProgressItem activity="Reading" />
          </div>
          <div className="item">
            <ProgressItem activity="Workout" />
          </div>
          <div className="item">
            <ProgressItem activity="Spirituality" />
          </div>
        </div>
        <Button
          color="primary"
          type="button"
          onClick={() => setModalOpen(!modalOpen)}
        >
          Launch demo modal
        </Button>
        <Modal toggle={() => setModalOpen(!modalOpen)} isOpen={modalOpen}>
          <div className=" modal-header">
            <h5 className=" modal-title" id="exampleModalLabel">
              Modal title
            </h5>
            <button
              aria-label="Close"
              className=" close"
              type="button"
              onClick={() => setModalOpen(!modalOpen)}
            >
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <ModalBody className="modal-body">
            <h1></h1>
            <TimePicker
                  placeholder="hh-mm"
                  style={{ width: 100}}
                  showSecond={false}
                  // defaultValue={moment()}
                  className="time-picker"
                  onChange={onChange}
            />

            {/* {time} */}
          </ModalBody>
          <ModalFooter>
            <Button
              color="secondary"
              type="button"
              onClick={() => setModalOpen(!modalOpen)}
            >
              Close
            </Button>
            <Button
              color="primary"
              type="button"
              onClick={() => sendData(time)}
            >
              Save changes
            </Button>
          </ModalFooter>
        </Modal>
        </div>
        )}
      </div>
      {/* <Script src="../scripts/script.js" strategy="lazyOnload" /> */}
    </>
  );
}
