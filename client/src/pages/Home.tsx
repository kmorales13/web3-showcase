import { useState, useEffect } from "react"
import { useStateContext } from "../context"
import DisplayCampaigns from "../components/DisplayCampaigns"

function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [campaigns, setCampaigns] = useState<any>([])

  const { contract, getCampaigns } = useStateContext()

  useEffect(() => {
    async function fetchCampaigns() {
      setIsLoading(true)
      const data = await getCampaigns?.()
      if (data) {
        setCampaigns(data)
      } else {
        console.error("Couldn't fetch user campaigns")
      }
      setIsLoading(false)
    }

    if (contract) {
      fetchCampaigns()
    }
  }, [contract, getCampaigns])

  return (
    <DisplayCampaigns
      title="All Campaigns"
      isLoading={isLoading}
      campaigns={campaigns}
    />
  )
}

export default Home
