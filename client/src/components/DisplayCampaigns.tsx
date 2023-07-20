import { useNavigate } from 'react-router-dom'
import { loader } from '../assets'
import FundCard from './FundCard'

interface DisplayCampaignsProps {
  title: string
  isLoading: boolean
  campaigns: any
}

function DisplayCampaigns({ title, isLoading, campaigns }: DisplayCampaignsProps) {
  const navigate = useNavigate()

  const handleNavigate = (campaign: any) => {
    navigate(`/campaign-details/${campaign.pId}`, { state: campaign })
  }

  return (
    <div>
      <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">{title} ({campaigns.length > 0 ? campaigns.length - 1 : 0})</h1>

      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading && (
          <img src={loader} alt="loader" className="w-[100px] h-[100px] object-contain" />
        )}

        {!isLoading && campaigns.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
            No campaigns have been created yet
          </p>
        )}

        {!isLoading && campaigns.length > 0 && campaigns.map((campaign: any) =>
          campaign.pId === 0 ? null : // don't display test campaign
            <FundCard
              key={campaign.pId}
              {...campaign}
              handleClick={() => handleNavigate(campaign)}
            />)}
      </div>
    </div>
  )
}

export default DisplayCampaigns