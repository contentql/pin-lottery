import { Contest } from '@/payload-types'
import ConvertToHtml from '@/utils/convertToHtml'
import Tabs from './Tabs'
import VehicleSpecifications from './VehicleSpecifications'

interface ContestDetails extends Contest {
  features_html: string
  description_html: string
}

const VehicleOverview = ({
  contestDetails,
}: {
  contestDetails: ContestDetails
  }) => {
   const tabs = [
     {
       title: 'Description',
       content: (
         <ConvertToHtml htmlContent={contestDetails?.description_html} />
       ),
     },
     {
       title: 'Features',
       content: <ConvertToHtml htmlContent={contestDetails?.features_html} />,
     },
     {
       title: 'Specifications',
       content: <VehicleSpecifications contestDetails={contestDetails} />,
     },
   ]
  return (
      <div>
        <Tabs tabs={tabs} />
      </div>
  )
}

export default VehicleOverview
