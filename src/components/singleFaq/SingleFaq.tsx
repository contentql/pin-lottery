const SingleFaq = ({ singleFaq }: { singleFaq: any }) => {
  const { id, question, answer } = singleFaq

  return (
    <div className='card'>
      <div className='card-header' id={`heading${id}`}>
        <button
          className='btn btn-link btn-block text-left'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target={`#collapse${id}`}
          aria-expanded='true'
          aria-controls={`collapse${id}`}
        >
          {question}
        </button>
      </div>
      <div
        id={`collapse${id}`}
        className={`collapse show`}
        aria-labelledby={`heading${id}`}
        data-bs-parent='#accordionExample'
      >
        <div className='card-body'>
          <p>{answer}</p>
        </div>
      </div>
    </div>
  )
}

export default SingleFaq
