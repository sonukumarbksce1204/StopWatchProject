import React, { useState, useEffect } from 'react';

export default function Timer() {
    const defaultWorkTime = 25;
    const defaultBreakTime = 1;

    const [time, setTime] = useState(defaultWorkTime * 60);
    const [running, setRunning] = useState(false);
    const [isWorkPhase, setIsWorkPhase] = useState(true);
    const [workTime, setWorkTime] = useState(defaultWorkTime);
    const [breakTime, setBreakTime] = useState(defaultBreakTime);

    useEffect(() => {
        if (!running) return;
        const timer = setInterval(() => {
            setTime((prevTime) => {
                if (prevTime === 0) {
                    if (isWorkPhase) {
                        alert("Work time is completed");
                    } else {
                        alert("The break time is completed");
                        setTime(defaultWorkTime * 60);
                        setRunning(false);
                        setIsWorkPhase(true);
                        return prevTime;
                    }
                    setIsWorkPhase(!isWorkPhase);
                    return (isWorkPhase ? breakTime : workTime) * 60;
                }
                return prevTime - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [running, isWorkPhase, workTime, breakTime]);

    const fmt = (s) => `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;

    const setTm = () => {
        setTime(workTime * 60);
        setRunning(false);
        setIsWorkPhase(true);
    };

    return (
        <div>
            <h1>{fmt(time)}</h1>
            <h2>{isWorkPhase ? 'Work Time' : 'Break Time'}</h2>
            <button onClick={() => setRunning(true)} disabled={running}>Start</button>
            <button onClick={() => setRunning(false)} disabled={!running}>Stop</button>
            <button onClick={() => setTime(isWorkPhase ? workTime * 60 : breakTime * 60)}>Reset</button>
            <br />
            <input type="number" step="0.1" value={workTime}
            onChange={(e) => setWorkTime(parseFloat(e.target.value) || 0)}
            placeholder="Enter Work Time"
            />
            <input type="number" step="0.1" value={breakTime}
            onChange={(e) => setBreakTime(parseFloat(e.target.value) || 0)}
            placeholder="Enter Break time"
            />
            <button onClick={setTm}>Set</button>
        </div>
    );
}

