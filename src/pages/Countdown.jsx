import React, {useState} from 'react'

function Countdown() {

    const [times, setTimes] = useState(0);
    const [countdowns, setCountdowns] = useState();
    const [seconds, setSeconds] = useState();

    function handleTime() {
        function run(val) {
            if(val <= 0){
                console.log('called 1', val);
                return;
            }
            let v = 60;
            val -= 1;
            setCountdowns(val);
            var inter = setInterval(() => {
                setSeconds(v);
                v--;
                if(v == 0){
                    clearInterval(inter);
                    run(val);
                }
            }, 1000);
            
            
        }
        run(times);
    }

  return (
    <div>
        <h1>Countdown Timer</h1>
        <div>
            <h1>{countdowns} : {seconds}</h1>
        </div>
        <div>
            Enter Minutes: <input type="text" onChange={(e) => {setTimes(e.target.value)}} value={times} />
            <button onClick={handleTime}>Submit</button>
        </div>
    </div>
  )
}

export default Countdown