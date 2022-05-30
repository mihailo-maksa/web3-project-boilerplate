import React, { useContext, useEffect, useState } from 'react'
import { getContract } from '../../helpers/contract'
import contracts from '../../contracts/contracts.json'
import WETHAbi from '../../contracts/WETH.json'
import ERC20Abi from '../../contracts/ERC20.json'
import UniV2Pair from '../../contracts/UniV2Pair.json'
import {
  SwitchToRinkebyAlert,
  Filler,
  notifyUser,
  errorNotification,
  RINKEBY_CHAIN_ID,
} from '../../helpers/utils'
import { ConnectContext } from '../../state/ConnectContext'
import { ThemeContext } from '../../state/ThemeContext'
import './vaults.scss'
import { ethers } from 'ethers'

const Vaults: React.FC = (): JSX.Element => {
  const { isDarkMode } = useContext(ThemeContext)
  const { library, account } = useContext(ConnectContext)
  const [networkWarning, setNetworkWarning] = useState<boolean>(true)
  const [currentChainId, setCurrentChainId] = useState<number>(0)

  useEffect(() => {
    const main = async () => {
      try {
        // @ts-ignore
        const { chainId: chain_id } = await new ethers.providers.Web3Provider(
          window.ethereum,
        ).getNetwork()

        setCurrentChainId(chain_id)
      } catch (error) {
        console.error(error)
      }
    }

    main()
  }, [])

  const signMessageWithEthers = async () => {
    // @ts-ignore
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const message = 'Hello World!'
    const signature = await signer.signMessage(message)
    console.log(signature)
  }

  const verifyMessageWithEthers = async () => {
    // @ts-ignore
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const message = 'Hello World!'
    const signature = await signer.signMessage(message)
    const address = await signer.getAddress()
    const derivedAddress = await ethers.utils.verifyMessage(message, signature)
    console.log({
      address,
      derivedAddress,
      isSignatureValid: address === derivedAddress,
      message,
      signature,
    })
  }

  return (
    <div className="vaults">
      <Filler />
      <SwitchToRinkebyAlert
        currentChainId={currentChainId}
        requiredChainId={RINKEBY_CHAIN_ID}
        alertCondition={networkWarning}
        alertConditionHandler={() => setNetworkWarning(false)}
        isDarkMode={isDarkMode}
      />

      <h1 className="vaults-title bold">MoonFarm Vaults</h1>

      <p className="vaults-subtitle bold">
        GM fren! Welcome to the MoonFarm! Feel free to pick your favorite farm &
        let your portfolio moon! 🚀
      </p>

      <div className="vaults-container"></div>
    </div>
  )
}

export default Vaults
