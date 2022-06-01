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
          Github repo.{' '}
        </a>
      </p>

      <p className="features-subtitle bold text-center mb-3 p-2">
        Key Features:
      </p>

      <ul className="feature-list">
        <li className="feature">
          <strong>1.)</strong> Bootstrapped with{' '}
          <strong>create-react-app</strong>
        </li>
        <li className="feature">
          <strong>2.) Supports typescript</strong> out of the box
        </li>
        <li className="feature">
          <strong>3.) Includes wallet connectors</strong> for most popular web3
          wallets
        </li>
        <li className="feature">
          <strong>4.) Includes mock contracts</strong> for tokens, NFTs,
          oracles, etc.
        </li>
        <li className="feature">
          <strong>5.)</strong> Includes{' '}
          <strong>dozens of helpful utility functions</strong> to help you build
          projects faster
        </li>
        <li className="feature">
          <strong>6.) Responsive design</strong> with mobile first approach
        </li>
        <li className="feature">
          <strong>7.)</strong> Uses <strong>bootstrap</strong> together with{' '}
          <strong>SCSS</strong>
        </li>
      </ul>

      <p className="features-subtitle bold text-center mt-5 mb-3 p-2">Setup:</p>

      <ul className="feature-list">
        <li className="feature">
          <strong>1.)</strong> Fork the code from{' '}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/mihailo-maksa/web3-starter-pack"
            className="link github-link bold"
          >
            this Github repo.
          </a>{' '}
        </li>
        <li className="feature">
          <strong>2.) Create a .env file</strong> and add the{' '}
          <strong>REACT_APP_INFURA_API_KEY</strong>
        </li>
        <li className="feature">
          <strong>3.)</strong> Add any{' '}
          <strong>other environment variables</strong> you want to set
        </li>
        <li className="feature">
          <strong>4.)</strong> Run the following command:{' '}
          <code className="bold">shell npm install && npm start</code>
        </li>
        <li className="feature">
          <strong>5.)</strong> A local development server will be started on{' '}
          <strong>port 3000</strong>
        </li>
        <li className="feature">
          <strong>6.) Enjoy building your next web3 venture!</strong>
        </li>
      </ul>

      <Filler />
      <Filler />
      <Filler />
      <Filler />
    </div>
  )
}

export default Home
