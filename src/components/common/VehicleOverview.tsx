import { Contest } from '@/payload-types'
import ConvertToHtml from '@/utils/convertToHtml'
import Tabs from './Tabs'
import VehicleSpecifications from './VehicleSpecifications'

const VehicleOverview = ({ contestDetails }: { contestDetails: Contest }) => {
  const tabs = [
    {
      title: 'Specifications',
      content: <VehicleSpecifications contestDetails={contestDetails} />,
    },
    {
      title: 'Description',
      content: (
        <ConvertToHtml htmlContent={contestDetails?.description_html!} />
      ),
    },
    {
      title: 'Features',
      content: <ConvertToHtml htmlContent={contestDetails?.features_html!} />,
    },
  ]
  return (
    <div>
      <Tabs tabs={tabs} />
    </div>
  )
}

export default VehicleOverview
