import React from "react";
import { Doughnut } from "react-chartjs-2";

const data = {
  //   labels: ["Red", "Green", "Yellow"],
  datasets: [
    {
      data: [300, 100],
      backgroundColor: ["#FF6384", "#36A2EB"],
      hoverBackgroundColor: ["#FF6384", "#36A2EB"],
    },
  ],
};

export default function ProgressItem(props) {
  return (
    <div className="progress-item-container">
      <h2 className="progress-item-activity-name">{props.activity}</h2>
      <div className="doughnut-parent">
        <Doughnut
          className="doughnut"
          data={data}
          width={50}
          height={50}
          options={{ cutout: 42 }}
        />
      </div>
      <div className="progress-info">
        <p className="doughnut-data-done">5 days</p>
        <p className="doughnut-data-all">14 days</p>
      </div>
    </div>
  );
}
