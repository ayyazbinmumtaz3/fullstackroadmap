import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { useEffect, useState } from "react";
import "./App.css";
import Modal from "react-modal";
import TimezoneData from "./assets/timezones.json";

dayjs.extend(utc);
dayjs.extend(timezone);

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

function App() {
  const [dateTime, setDateTime] = useState({
    time: null,
    date: null,
    zone: null,
  });

  useEffect(() => {
    const currentDate = dayjs();

    setDateTime((prevState) => ({
      ...prevState,
      zone: dayjs.tz.guess(),
      date: currentDate.format("dddd, MMMM D, YYYY"),
    }));
  }, []);

  useEffect(() => {
    setDateTime((prevState) => ({
      ...prevState,
      date: dayjs()
        .tz(dateTime.zone ?? dayjs.tz.guess())
        .format("dddd, MMMM D, YYYY"),
    }));
    const timeInterval = setInterval(() => {
      setDateTime((prevState) => ({
        ...prevState,
        time: dayjs()
          .tz(dateTime.zone ?? dayjs.tz.guess())
          .format("h:mm:ss A"),
      }));
    }, 1000);

    return () => {
      clearInterval(timeInterval);
    };
  }, [dateTime.zone]);

  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#000";
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <div className="container">
        <div className="box">
          <div className="timezoneContainer">
            <p className="timezone">{dateTime.zone}</p>
            <button className="editbutton" onClick={openModal}>
              <img className="editicon" src="src/assets/edit.png" alt="" />
            </button>
          </div>
          <p className="time">{dateTime.time}</p>
          <p className="date">{dateTime.date}</p>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Change Timezone</h2>
        <button className="closebutton" onClick={closeModal}>
          x
        </button>
        <form>
          <select
            name="zone"
            id=""
            value={dateTime.zone}
            onChange={(e) => {
              setDateTime((prevState) => ({
                ...prevState,
                zone: e.target.value,
              }));
              closeModal();
            }}
          >
            {TimezoneData.map((timezone) => (
              <option key={timezone.zone} value={timezone.zone}>
                {`${timezone.name} ${timezone.gmt}`}
              </option>
            ))}
          </select>
        </form>
      </Modal>
    </>
  );
}

export default App;
