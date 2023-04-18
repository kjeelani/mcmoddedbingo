import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useState, ReactNode } from 'react';

interface UIProps {
    children?: ReactNode,
    type: string,
    value?: string,
    name?: string
}

interface ClickProps {
    children?: ReactNode,
    href?: string,
    callback?: () => void
}

interface Children {
    children?: ReactNode
}


function UI({ children, type, value, name }: UIProps) {
    return (
        <section className="ui-section">
            <input type={type} placeholder={value} name={name}></input>
            {children}
        </section>
    )
}

function Login({ children }: Children) {
    return (
        <form className="login-form" action="/teams" target="_self" method="get">
            {children}
        </form>
    )
}

function Register({ children }: Children) {
    return (
        <form className="register-form" action="/teams" target="_self" method="get">
            {children}
        </form>
    )
}

function Backing({ children }: Children) {
    return (
        <div className="backing">
            {children}
        </div>
    )
}

function LoginBox({ children }: Children) {
    return (    
        <div className="login">
            {children}
        </div>
    )
}

function Click({ children, href, callback }: ClickProps) {

    if(!callback) {
        return (
            <div className="linker">
                <Link href={href}>{children}</Link>
            </div>
        )
    } else {
        return (
            <div className="linker">
                <button onClick={callback}>{children}</button>
            </div>
        )
    }
}



export default function Home() {
    const [clicked, click] = useState(true)


    const callback = useCallback(async () => {
        click(clicked ? clicked : !clicked)
        const btn: HTMLButtonElement = document.querySelector(".login")!
        btn.style.transform = "scale(1)"
    }, [clicked])

    const callout = useCallback(async () => {
        click(clicked ? !clicked : clicked)
        const btn: HTMLButtonElement = document.querySelector(".login")!
        btn.style.transform = "scale(0)"
        console.log(clicked)
    }, [clicked])

    const registerCallback = useCallback(async (e) => {
        e.preventDefault()
        const loginForm: HTMLFormElement = document.querySelector(".login-form")!
        const registerForm: HTMLFormElement = document.querySelector(".register-form")!

        loginForm.style.transform = "translateX(-500px)"
        registerForm.style.transform = "translateX(0px)"
    }, [])

    const loginCallback = useCallback(async (e) => {
        e.preventDefault()
        const loginForm: HTMLFormElement = document.querySelector(".login-form")!
        const registerForm: HTMLFormElement = document.querySelector(".register-form")!

        loginForm.style.transform = "translateX(0px)"
        registerForm.style.transform = "translateX(500px)"
    }, [])

    return (
        <div className="App">
            <Backing>
                <h1>
                    <span className="text">BINGO!</span>
                    <Click href="/teams">Teams</Click>
                    <Click callback={callback}>Login</Click>
                </h1>
            </Backing>
            <LoginBox>
                <button className="x-mark" onClick={callout}>
                    <Image
                        style={{paddingLeft: "5px"}}
                        src="../exit-outline.svg"
                        height={24}
                        width={24}
                        alt="exit"
                    />
                </button>
                <Login>
                    <span>Login</span>
                    <UI type="text" value="Username" name="loginUser">
                        <Image
                            className="Image"
                            src="../person-circle-outline.svg"
                            height={24}
                            width={24}
                            alt="U"
                        />
                    </UI>
                    <UI type="password" value="Password"></UI>
                    <div className="under">
                        <section className="remember-me">
                            <input type="checkbox"></input>
                            <label>Remember Me</label>
                        </section>
                        <a style={{top: "3px"}} href="#">Forgot Password?</a>
                    </div>
                    <UI type="submit" />
                    <span id="reg">
                        Don't have an account?
                        <button onClick={registerCallback}>Register Here</button>    
                    </span>
                </Login>
                <Register>
                    <span>Register</span>
                    <UI type="email" value="Email" name="registerEmail">
                        <Image
                            className="Image"
                            src="../mail-outline.svg"
                            height={24}
                            width={24}
                            alt="U"
                        />
                    </UI>
                    <UI type="text" value="Username" name="registerEmail">
                        <Image
                            className="Image"
                            src="../person-circle-outline.svg"
                            height={24}
                            width={24}
                            alt="U"
                        />
                    </UI>
                    <UI type="password" value="Password"></UI>
                    <UI type="submit" />
                    <span id="reg">
                        <button style={{paddingLeft: 0}} onClick={loginCallback}>Back to Login</button>    
                    </span>
                </Register>
            </LoginBox>
        </div>
    )
}
