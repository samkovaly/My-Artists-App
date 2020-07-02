


export const getDisplayDate = (isoString) => {
    const days = ['SUN', 'MON', 'TUES', 'WED', 'THURS', 'FRI', 'SAT'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const date = new Date(isoString);
    const now = new Date();

    const dayOfWeek = days[date.getDay()];
    const month = months[date.getMonth()];
    const dayOfMonth = date.getDate();
    const year = date.getFullYear();

    let displayDate = dayOfWeek + ' ' + month + ' '+ dayOfMonth;
    if(year > now.getFullYear()){
      displayDate += ', ' + year
    }
    return displayDate;
  }

  
export const getDisplayTime = (isoString) => {

  const date = new Date(isoString);
  const hour24 = date.getHours();
  let hour = null;

  // 0 = 12am
  // 12 = 12pm
  let period = ''; 
  if(hour24 < 12){
    period = 'am';
    hour = hour24
  }else{
    period = 'pm';
    hour = hour24 - 12;
  }

  let minute = date.getMinutes();
  if(minute < 10){
    minute = '0' + minute;
  }

  const displayTime = hour + ':' + minute + period;
  return displayTime;
}