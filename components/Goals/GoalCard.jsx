import styles from "./goals.module.css";
import Image from "next/image";
import TimePicker from "rc-time-picker";
import "rc-time-picker/assets/index.css";
import React from "react";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";

const str = "HH:mm";

export default function GoalCard({ card, selected, setSelected, idx }) {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [time, setTime] = React.useState("00:00");

  function selectedCard() {
    setSelected(!selected);
    setModalOpen(!modalOpen);
  }

  function onChange(value) {
    // console.log(value && value.format(str));
    console.log(value && value.format(str));
    try {
      setTime(value.format(str));
    } catch (error) {}
    console.log(time);
  }

  const sendData = (newTime) => {
    if (time == "00:00") {
      alert("Select meaningful time!");
    } else {
      alert("Your activity time was successfully set! " + time);
      setModalOpen(!modalOpen)
    }
    setTime("00:00")
  };
  return (
    <div
      onClick={() => selectedCard()}
      className={selected ? styles.selectedCard : styles.card}
    >
      <div className={styles.containerColumn}>
        <div className="mt-9" />
        <Image width={40} height={40} src={card.image} alt="image" />
        <div className="mt-2" />
        <div>{card.title}</div>
      </div>



      <Modal toggle={() => setModalOpen(!modalOpen)} isOpen={modalOpen}>
        <div className=" modal-header">
          <h5 className=" modal-title" id="exampleModalLabel">
            {card.title} Time Practice Select
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
          <h4>
            Select how much time you would like to practice this activity.
          </h4>
          <TimePicker
            placeholder="hh-mm"
            style={{ width: 100 }}
            showSecond={false}
            // defaultValue={moment()}
            className="time-picker"
            disabledHours={() => [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]}
            hideDisabledOptions
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
          <Button color="primary" type="button" onClick={() => sendData(time)}>
            Save changes
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
