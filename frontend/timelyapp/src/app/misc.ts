function msToTime(duration: number) {
  var milliseconds = Math.floor((duration % 1000) / 100);
  var seconds = Math.floor((duration / 1000) % 60);
  var minutes = Math.floor((duration / (1000 * 60)) % 60);
  var hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  var str_hours = hours < 10 ? '0' + hours : hours;
  var str_minutes = minutes < 10 ? '0' + minutes : minutes;
  var str_seconds = seconds < 10 ? '0' + seconds : seconds;

  return str_hours + ':' + str_minutes + ':' + str_seconds;
}

export function durationsBetweenTimestamps(start:string, end:string):string{
    var durations_ms = new Date(end).valueOf() -
    new Date(start).valueOf();
    return msToTime(durations_ms);
}