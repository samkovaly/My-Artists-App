


export const getDisplayDate = (isoString, fullDayString) => {
    const days = ['SUN', 'MON', 'TUES', 'WED', 'THURS', 'FRI', 'SAT'];
    const fullDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const date = new Date(isoString);
    const now = new Date();

    let dayOfWeek = null;
    if(fullDayString){
      dayOfWeek = fullDays[date.getUTCDay()];
    }else{
      dayOfWeek = days[date.getUTCDay()];
    }
    const month = months[date.getUTCMonth()];
    const dayOfMonth = date.getUTCDate();
    const year = date.getUTCFullYear();

    let displayDate = dayOfWeek + ' ' + month + ' '+ dayOfMonth;
    if(year > now.getUTCFullYear()){
      displayDate += ', ' + year
    }
    return displayDate;
  }

  
export const getDisplayTime = (isoString) => {


  const date = new Date(isoString);
  const hour24 = date.getUTCHours();
  let hour = null;

  // 0 = 12am
  // 12 = 12pm
  let period = ''; 
  if(hour24 < 12){
    period = 'am';
    hour = hour24
    if(hour == 0){
      hour = 12;
    }
  }else{
    period = 'pm';
    hour = hour24 - 12;
  }

  let minute = date.getMinutes();
  if(minute < 10){
    minute = '0' + minute;
  }

  const displayTime = hour + ':' + minute + period;
  console.log(displayTime, '\n')
  return displayTime;
}