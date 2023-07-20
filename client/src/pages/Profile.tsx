import { useState, useEffect } from "react"
import { useStateContext } from "../context"
import DisplayCampaigns from "../components/DisplayCampaigns"

function Profile() {
  const [isLoading, setIsLoading] = useState(false)
  const [campaigns, setCampaigns] = useState<any>([])

  const { address, contract, getMyCampaigns } = useStateContext()

  useEffect(() => {
    if (address && contract) {
      fetchCampaigns()
    }
  }, [address, contract, fetchCampaigns])

  async function fetchCampaigns() {
    setIsLoading(true)
    const data = await getMyCampaigns?.()
    if (data) {
      setCampaigns(data)
    } else {
      console.error("Couldn't fetch user campaigns")
    }
    setIsLoading(false)
  }

  return (
    <DisplayCampaigns
      title="My Campaigns"
      isLoading={isLoading}
      campaigns={campaigns}
    />
  )
}

export default Profile
