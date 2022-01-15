import { useState } from 'react'

import Form from './components/Form/Form'

const App = () => {
  const [result, setResult] = useState('填完入伍日期還有折抵天數後就按下計算吧！')

  return (
    <main className="container">
      <Form setResult={setResult} />
      <div className="result">{result}</div>
    </main>
  )
}

export default App
