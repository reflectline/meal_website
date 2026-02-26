// DISCOUNT DATE -------------------------------------------------------------------------------------------------------

function discount(id, deadline){


    function timeDifference(endtime){
        let days, hours, minutes, seconds;

        let t = Date.parse(endtime) - Date.parse(new Date());

        if (t <= 0){
            days = 0
            hours = 0
            minutes = 0
            seconds = 0
        } else {
            days = Math.floor(t / (1000*60*60*24));
            hours = Math.floor((t / (1000*60*60*24) % 24))
            minutes = Math.floor((t / 1000 / 60) % 60)
            seconds = Math.floor((t / 1000) % 60)
        }

        return {
            total: t,
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds
        }
    }

    function setTime(selector,endtime){
        const timer = document.querySelector(selector);
        const days = timer.querySelector('#days');
        const hours = timer.querySelector('#hours');
        const minutes = timer.querySelector('#minutes');
        const seconds = timer.querySelector('#seconds');

        updateClock ()
        function updateClock (){
            const t = timeDifference(endtime);
            days.textContent = getZeroInTimer(t.days);
            hours.textContent = getZeroInTimer(t.hours);
            minutes.textContent = getZeroInTimer(t.minutes);
            seconds.textContent = getZeroInTimer(t.seconds);

            if (t.total <= 0){
                clearInterval(timeInterval);
            }
        }

        const timeInterval = setInterval(updateClock, 1000)
    }

    function getZeroInTimer(num){
        if (num >= 0 && num <= 10){
            return `0${num}`;
        } else {
            return num;
        }
    }

    setTime (id, deadline);

}

export default discount;