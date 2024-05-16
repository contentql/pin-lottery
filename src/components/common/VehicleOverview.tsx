import { Contest } from '@/payload-types'
import ConvertToHtml from '@/utils/convertToHtml'


const VehicleOverview = ({ contestDetails }: { contestDetails: Contest }) => {
  // const tabs = [
  //   {
  //     title: 'Specifications',
  //     content: <VehicleSpecifications contestDetails={contestDetails} />,
  //   },
  //   {
  //     title: 'Description',
  //     content: (
  //       <ConvertToHtml htmlContent={contestDetails?.description_html!} />
  //     ),
  //   },
  //   {
  //     title: 'Features',
  //     content: <ConvertToHtml htmlContent={contestDetails?.features_html!} />,
  //   },
  // ]
  return (
    <div>
      <h2 className='product-description'>Description:</h2>
       <ConvertToHtml htmlContent={contestDetails?.description_html!} />
    </div>
  )
}

export default VehicleOverview
