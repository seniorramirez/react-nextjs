'use client';

import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { useLogin } from "@/utils/auth/useLogin";
import Input from '@/components/input/Input';
import { notification } from 'antd';
import type { NotificationPlacement } from 'antd/es/notification/interface';

export default function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorForm, setErrorForm] = useState({
        email: false,
        password: false
    });

    const { login } = useLogin();
    const router = useRouter();
    const onSubmit = (e:any) => {
        e.preventDefault();

        let errors = {
            email: false,
            password: false
        };

        let error = false;

        if(!email){
            errors.email = true;
            error = true;
        }

        if(!password){
            errors.password = true;
            error = true;
        }

        setErrorForm(errors);

        if(!error){
            login(email, password)
            .then((res) => {
                router.push('/');
            })
            .catch((e) => {
                notification.open({
                    message: 'Ocurrio un error',
                    description: 'El correo no se encuentra registrado.',
                });
            });
        }

        /*if (!email || !password) {
            alert("Please enter information");
        } else {
            /*login(email, password)
            .then((res) => router.push("/profile"))
            .catch((e) => alert(e));
        }*/
    };

    
    return (
        <main className="z-10">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Inición de sesión
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#" onSubmit={onSubmit}>
                            <div>
                                <Input 
                                    label="Usuario"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    error={errorForm.email}
                                />
                            </div>
                            <div>
                                <Input 
                                    label="Password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    error={errorForm.password}
                                />
                            </div>
                            
                            <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                Iniciar sesión
                            </button>

                        </form>
                    </div>
                </div>
            </div>
        </main>
    )
}
