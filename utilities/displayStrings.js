


export const getDisplayDate = (isoString) => {
    const days = ['SUN', 'MON', 'TUES', 'WED', 'THURS', 'FRI', 'SAT'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const date = new Date(isoString);
    
    const dayOfWeek = days[date.getDay()];
    const month = months[date.getMonth()];
    const dayOfMonth = date.getDate();

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

    const fullDisplayDate = dayOfWeek + ' ' + month + ' '+ dayOfMonth + ', ' + hour + ':' + minute + period;
    return fullDisplayDate;
  }