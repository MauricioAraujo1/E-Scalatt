import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

import { auth } from "@/DataBase/dbConnection";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export function SignUp(){
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [phone, setPhone] = useState("")

    const navigate = useNavigate();

    async function handleSignUp(e: any){
        e.preventDefault();

        if(name !== '' && email !== '' && password !== '' && confirmPassword !== '' && phone !== ''){
            await createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                navigate('/sign-in', { replace: true })
            })
            .catch(() => {
                console.log("ERRO AO FAZER CADASTRO")
            })
        }
    }

    return (
        <>
            <Helmet title="Cadastro" />
            <div className="p-8">
            <Button variant="ghost" asChild className="absolute right-8 top-8">
                    <Link to="/sign-in">
                        Fazer Login
                    </Link>
                </Button>
                <div className="w-[350px] flex flex-col justify-center gap-6">
                    <div className="flex flex-col gap-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Crie sua conta e-scalatt
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Seja um parceiro e realize suas otimizações de escala 
                        </p>
                    </div>

                    <form className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="managerName">Seu nome</Label>
                            <Input id="managerName" type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Seu e-mail</Label>
                            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Sua senha</Label>
                            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Confirme sua senha</Label>
                            <Input id="password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">Seu celular</Label>
                            <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}/>
                        </div>

                        <Button className="w-full" type="submit" onClick={handleSignUp}>
                            Finalizar cadastro
                        </Button>

                        <p className="px-6 text-center text-sm loading-relaxed text-muted-foreground">
                            Ao continuar, você concorda com nossos{' '} 
                            <a className="underline underline-offset-4" href="">
                                termos de serviço
                            </a>{' '} 
                            e{' '} 
                            <a className="underline underline-offset-4" href="">
                                políticas de privacidade
                            </a>
                            .
                        </p>
                    </form>
                </div>
            </div>
        </>
    )
}