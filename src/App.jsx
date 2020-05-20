import React, { useState } from "react";
import "./App.scss";

function App() {
  const [timer, setTimer] = useState({
    hour: 0,
    minute: 0,
    seconds: 0,
    milliseconds: 0,
    timerOn: false
  });
  const [interv, setInterv] = useState();
  const [resumeOn, setResumeOn] = useState(false);

  let updatedMs = timer.milliseconds,
    updatedS = timer.seconds,
    updatedM = timer.minute,
    updatedH = timer.hour;

  const startTimer = () => {
    run();
    setInterv(setInterval(run, 10));
    setResumeOn(false);
  };

  const stopTimer = () => {
    clearInterval(interv);
    setResumeOn(true);
  };
  const resetTimer = () => {
    setTimer({
      ...timer,
      hour: 0,
      minute: 0,
      seconds: 0,
      milliseconds: 0,
      timerOn: false
    });
  };

  const run = () => {
    if (updatedM === 60) {
      updatedH++;
      updatedM = 0;
    }
    if (updatedS === 60) {
      updatedM++;
      updatedS = 0;
    }
    if (updatedMs === 99) {
      updatedS++;
      updatedMs = 0;
    }
    updatedMs++;

    return setTimer({
      ...timer,
      milliseconds: updatedMs,
      seconds: updatedS,
      minute: updatedM,
      hour: updatedH,
      timerOn: true
    });
  };

  return (
    <div className="App">
      <div className=" timer">
        <span className="timer__numbers">{`${(timer.hour < 10 ? "0" : "") +
          timer.hour} :`}</span>
        <span className="timer__numbers">{`${(timer.minute < 10 ? "0" : "") +
          timer.minute} :`}</span>
        <span className="timer__numbers">{`${(timer.seconds < 10 ? "0" : "") +
          timer.seconds} .`}</span>
        <span className="timer__numbers">{`${(timer.milliseconds < 10
          ? "0"
          : "") + timer.milliseconds}`}</span>

        <div className="timer__btn-wrapper">
          {timer.timerOn === false && (
            <button onClick={startTimer} className="btn">
              Start
            </button>
          )}

          {timer.timerOn === true && timer.milliseconds > 0 && (
            <div className="btn-container">
              <button onClick={stopTimer} className="btn btn-stop">
                Stop
              </button>

              {resumeOn === true && (
                <div>
                  <button onClick={startTimer} className="btn btn-resume">
                    Resume
                  </button>

                  <button onClick={resetTimer} className="btn btn-reset">
                    Reset
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
