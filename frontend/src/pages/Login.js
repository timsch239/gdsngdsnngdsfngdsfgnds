import { useState } from "react"
import { useLogin } from "../hooks/useLogin"

const Login = () => {
    const [mail, setMail] = useState('')
    const [password, setPassword] = useState('')

    const { login, error, isLoading } = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(mail, password)
    }

    return (
        <form className="login" onSubmit={handleSubmit}>
            <h3>Log in</h3>

            <label>E-Mail:</label>
            <input
                type="email"
                onChange={(e) => setMail(e.target.value)}
                value={mail}
            />
            <label>Password:</label>
            <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />

            <button disabled={isLoading}>Log in</button>

            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default Login