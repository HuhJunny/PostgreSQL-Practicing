import { useState } from 'react'
import axios from 'axios'
import './App.css'

const API_BASE_URL = 'http://localhost:3000'

const api = axios.create({
  baseURL: API_BASE_URL,
})

function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [token, setToken] = useState(localStorage.getItem('token') || '')

  const [amount, setAmount] = useState('')
  const [memo, setMemo] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)

  const [expenses, setExpenses] = useState([])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const response = await api.post('/users/login', { email, password })
      const jwtToken = response.data?.data?.token

      if (!jwtToken) {
        console.error('로그인 응답에 token이 없습니다.', response.data)
        return
      }

      localStorage.setItem('token', jwtToken)
      setToken(jwtToken)
    } catch (error) {
      console.error('로그인 실패:', error)
    }
  }

  const handleCreateExpense = async (event) => {
    event.preventDefault()

    if (!token) {
      console.error('토큰이 없습니다. 먼저 로그인하세요.')
      return
    }

    if (!amount) {
      console.error('amount가 없습니다.')
      return
    }

    try {

      console.log({
        amount,
        parsedAmount: parseInt(amount),
        memo,
        imageUrl,
      })

      await api.post(
        '/expenses',
        {
          amount: parseInt(amount),
          memo,
          imageUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      setAmount('')
      setMemo('')
      setImageUrl('')
      setSelectedFile(null)
      await fetchExpenses()
    } catch (error) {
      console.error('지출 등록 실패:', error)
    }
  }

  const fetchExpenses = async () => {
    if (!token) {
      console.error('토큰이 없습니다. 먼저 로그인하세요.')
      return
    }

    try {
      const response = await api.get('/expenses', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setExpenses(Array.isArray(response.data?.data) ? response.data.data : [])
    } catch (error) {
      console.error('지출 목록 조회 실패:', error)
    }
  }

  const handleFileChange = (event) => {
    const file = event.target.files?.[0] || null
    setSelectedFile(file)
  }

  return (
    <main className="container">
      <h1>Expense Log API Tester</h1>
      <p className="description">Base URL: {API_BASE_URL}</p>

      <section className="card">
        <h2>1) 로그인</h2>
        <form onSubmit={handleLogin} className="form">
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          <button type="submit">로그인</button>
        </form>
        <p className="token-status">
          Token 상태: {token ? '저장됨(localStorage)' : '없음'}
        </p>
      </section>

      <section className="card">
        <h2>2) 지출 등록</h2>
        <form onSubmit={handleCreateExpense} className="form">
          <input
            type="number"
            placeholder="amount"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            required
          />
          <input
            type="text"
            placeholder="memo"
            value={memo}
            onChange={(event) => setMemo(event.target.value)}
            required
          />
          <input
            type="text"
            placeholder="imageUrl (현재는 문자열 입력 방식)"
            value={imageUrl}
            onChange={(event) => setImageUrl(event.target.value)}
          />

          <label className="file-input">
            이미지 파일 선택 (추후 presigned URL 업로드 용도)
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </label>
          <p className="file-name">
            선택 파일: {selectedFile ? selectedFile.name : '없음'}
          </p>

          <button type="submit">지출 등록</button>
        </form>
      </section>

      <section className="card">
        <h2>3) 지출 목록 조회</h2>
        <button type="button" onClick={fetchExpenses}>
          목록 새로고침
        </button>
        <ul className="expense-list">
          {expenses.map((expense) => (
            <li key={expense.id ?? `${expense.memo}-${expense.amount}`}>
              <div>id: {expense.id ?? '-'}</div>
              <div>amount: {expense.amount}</div>
              <div>memo: {expense.memo}</div>
              <div>imageUrl: {expense.imageUrl || '-'}</div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}

export default App
