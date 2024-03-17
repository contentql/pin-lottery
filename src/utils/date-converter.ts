export const DateConverter = (value: string) => {
    
    const date = new Date(value)

    const options = {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }

     const weekday = date.toLocaleString('en-US', { weekday: 'long' })
    const month = date.toLocaleString('en-US', { month: 'long' })
    const day = date.getDate()
    const year = date.getFullYear()

    const formattedDate = `${weekday} ${month} ${day}, ${year}`

    return formattedDate;
}
