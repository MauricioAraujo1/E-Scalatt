import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

import { auth } from "@/DataBase/dbConnection";
import { signInWithEmailAndPassword } from "firebase/auth";

import { useNavigate } from "react-router-dom";

export function SignIn(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate();

    async function handleSignIn(e: any){
        e.preventDefault();

        if(email !== '' && password !== ''){

            await signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                navigate('/', {replace: true})
            })
            .catch(() => {
                console.log("ERRO AO FAZER LOGIN")
            })
        }
    }

    return (
        <>
            <Helmet title="Login" />
            <div className="p-8">
                <Button variant="ghost" asChild className="absolute right-8 top-8">
                    <Link to="/sign-up">
                        Registre-se
                    </Link>
                </Button>


                <div className="w-[350px] flex flex-col justify-center gap-6">
                    <div className="flex flex-col gap-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Acessar painel
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Acompanhe suas otimizações de escala pelo painel 
                        </p>
                    </div>

                    <form className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Seu e-mail</Label>
                            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Sua senha</Label>
                            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </div>

                        <Button className="w-full" type="submit" onClick={handleSignIn}>
                            Fazer Login
                        </Button>
                    </form>
                </div>
            </div>
        </>
    )
}