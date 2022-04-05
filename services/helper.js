export const formatTime = (secs) => {
  var minutes = Math.floor(secs / 60) || 0
  var seconds = Math.floor(secs - minutes * 60) || 0

  return minutes + ':' + (seconds < 10 ? '0' : '') + seconds
}


export let sound = null