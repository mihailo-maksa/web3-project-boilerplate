import React, { useContext, useEffect, useState } from 'react'
// import { getContract } from '../../helpers/contract'
// import contracts from '../../contracts/contracts.json'
import {
  SwitchToRinkebyAlert,
  Filler,
  RINKEBY_CHAIN_ID,
} from '../../helpers/utils'
// import { ConnectContext } from '../../state/ConnectContext'
import { ThemeContext } from '../../state/ThemeContext'
import './home.scss'
import { ethers } from 'ethers'

const Home: React.FC = (): JSX.Element => {
  const { isDarkMode } = useContext(ThemeContext)
  // const { library, account } = useContext(ConnectContext)
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

  return (
    <div className={`${isDarkMode ? 'home home-dark-mode' : 'home'}`}>
      <Filler />
      <SwitchToRinkebyAlert
        currentChainId={currentChainId}
        requiredChainId={RINKEBY_CHAIN_ID}
        alertCondition={networkWarning}
        alertConditionHandler={() => setNetworkWarning(false)}
        isDarkMode={isDarkMode}
      />

      <h1 className="home-title bold text-center mb-3 mt-4 p-2">
        Web3 Starter Pack
      </h1>

      <p className="home-subtitle bold text-center mb-2 p-2">
        A simple & easy to use boilerplate to quickly bootstrap web3 projects.
      </p>

      <p className="home-subtitle bold text-center mb-5 p-2">
        To learn more about the project and how to use it, please visit the
        official{' '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/mihailo-maksa/web3-starter-pack"
          className="link github-link"
        >
          Github repo{' '}
        </a>
      </p>

      <Filler />
      <Filler />
      <Filler />
    </div>
  )
}

export default Home
