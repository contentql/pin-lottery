const RendererCountdown = ({ hours, minutes, seconds, days }: any) => {
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

export default RendererCountdown
