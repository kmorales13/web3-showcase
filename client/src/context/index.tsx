import { SmartContract, useAddress, useContract, useContractWrite, useMetamask } from "@thirdweb-dev/react"
import { createContext, useContext } from "react"
import { ethers, type BaseContract } from "ethers"

export interface Campaign {
  owner: string
  title: string
  description: string
  target: ethers.BigNumber
  deadline: ethers.BigNumber
  amountCollected: ethers.BigNumber
  image: string
  pId: number
}

type TStateContext = {
  address?: string
  contract?: SmartContract<BaseContract>
  connect?: () => void
  createCampaign?: (form: any) => Promise<void>
  getCampaigns?: () => Promise<any[]>
  getMyCampaigns?: () => Promise<any[]>
  getDonations?: (pId: number) => Promise<any>
  donateToCampaign?: (pId: number, amount: string) => Promise<any>
}

const initialState = {
  address: undefined,
  contract: undefined,
  createCampaign: undefined
}

const StateContext = createContext<TStateContext>(initialState)

interface StateContextProviderProps {
  children: React.ReactNode
}

export function StateContextProvider({ children }: StateContextProviderProps) {
  const { contract } = useContract("0x1c7ae933aEf1f6EB8A4adaff133d2AEAAD4f5B63")
  const { mutateAsync: createCampaign } = useContractWrite(contract, "createCampaign")
  const address = useAddress()
  const connectMetaMask = useMetamask()

  function connect() {
    try {
      connectMetaMask().catch(err => console.error("connectMetaMask", err))
    } catch (err) {
      console.error("connectMetaMask", err)
    }
  }

  async function publishCampaign(form: any) {
    try {
      const data = await createCampaign({
        args: [
          address,
          form.title,
          form.description,
          form.target,
          new Date(form.deadline).getTime(),
          form.image,
        ]
      })

      console.log("[publishCampaign] Success", data)
    } catch (err) {
      console.log("[publishCampaign] Error", err)
    }
  }

  async function getCampaigns() {
    const campaigns: Campaign[] = await contract?.call("getCampaigns")

    const parsedCampaigns = campaigns.map((campaign: Campaign, idx: number) => ({
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      target: ethers.utils.formatEther(campaign.target.toString()),
      deadline: campaign.deadline.toNumber(),
      amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
      image: campaign.image,
      pId: idx,
    }))

    return parsedCampaigns
  }

  async function getMyCampaigns() {
    const allCampaigns = await getCampaigns()
    return allCampaigns.filter(campaign => campaign.owner === address)
  }

  async function getDonations(pId: number) {
    const donations = await contract?.call("getDonators", [pId])

    const parsedDonations = donations[0].map((donator: any, idx: number) => ({
      donator,
      donation: ethers.utils.formatEther(donations[0][idx].toString())
    }))

    return parsedDonations
  }

  async function donateToCampaign(pId: number, amount: string) {
    const data = await contract?.call("donateToCampaign", [pId], { value: ethers.utils.parseEther(amount) })

    return data
  }

  return (
    <StateContext.Provider value={{ address, connect, contract, createCampaign: publishCampaign, getCampaigns, getMyCampaigns, getDonations, donateToCampaign }}>
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext)