const RendererCountdown = ({
  hours,
  minutes,
  seconds,
  days,
  completed,
}: {
  hours: number
  minutes: number
  seconds: number
  days: number
  completed: boolean
}) => {
  if (completed) {
    return (
      <>
        <div>
          <span>Contest</span>
        </div>
        <div>
          <span>Ended</span>
        </div>
      </>
    )
  } else {
    return (
      <>
        <div>
          <span>{days}</span>
          <p>days</p>
        </div>
        <div>
          <span>{hours}</span>
          <p>hours</p>
        </div>
        <div>
          <span>{minutes}</span>
          <p>minutes</p>
        </div>
        <div>
          <span>{seconds}</span>
          <p>seconds</p>
        </div>
      </>
    )
  }
}

export default RendererCountdown
