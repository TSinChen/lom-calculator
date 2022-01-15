import { Fragment, useState } from 'react'
import ReactGA from 'react-ga'

import Form from './components/Form/Form'
import GITHUB_ICON from './assets/icons/github.png'

ReactGA.initialize('G-B8P7WD2PGR')
ReactGA.pageview(window.location.pathname + window.location.search)

const App = () => {
  const [result, setResult] = useState('填完入伍日期還有折抵天數後就按下計算吧！')

  return (
    <Fragment>
      <main className="container">
        <h1 className="title">兵役計算機</h1>
        <Form setResult={setResult} />
        <div className="result">{result}</div>
      </main>
      <a
        className="github"
        href="https://github.com/TSinChen/lom-calculator"
        target="_blank"
        rel="noreferrer"
      >
        <img src={GITHUB_ICON} />
      </a>
    </Fragment>
  )
}

export default App
