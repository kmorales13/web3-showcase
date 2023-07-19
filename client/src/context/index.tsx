import { SmartContract, useAddress, useContract, useContractWrite, useMetamask } from "@thirdweb-dev/react"
import { createContext, useContext } from "react"
import type { BaseContract } from "ethers"
import type { MetaMaskWallet } from "@thirdweb-dev/wallets"

type TStateContext = {
  address?: string
  contract?: SmartContract<BaseContract>
  connect?: () => void
  createCampaign?: (form: any) => Promise<void>
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
      connectMetaMask()
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
          new Date(form.deadline).getTime,
          form.image,
          form.title,
        ]
      })

      console.log("[publishCampaign] Success", data)
    } catch (err) {
      console.log("[publishCampaign] Error", err)
    }
  }

  return (
    <StateContext.Provider value={{ address, connect, contract, createCampaign: publishCampaign }}>
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext)