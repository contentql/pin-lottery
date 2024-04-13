const ConvertToHtml = ({ htmlContent }: { htmlContent: string }) => {
  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
}

export default ConvertToHtml
