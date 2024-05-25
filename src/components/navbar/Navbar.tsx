'use client';

import Image from 'next/image';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { Menu, Dropdown } from "antd";
import { useLogin } from "@/utils/auth/useLogin";
import { useRouter } from 'next/navigation';

export default function Navbar(){

    const { logout } = useLogin();
    const router = useRouter();

    const items = [
        {
          key: '1',
          danger: true,
          label: 'Salir',
          icon: <UserOutlined />
        },
    ];

    const handleMenuClick = (e) => {
        if (e.key === '1') {
            logout();
            router.push('/login');
        }
    };

    return (
        <nav className="border-b border-white/[0.08]">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a  className="flex items-center">
                    <span className="self-center text-xl font-semibold whitespace-nowrap text-white">Entrevista</span>
                </a>
                <div className="flex items-center md:order-2">
                    <Dropdown menu={{ items,onClick: handleMenuClick }} placement="bottomRight" arrow trigger={['click']}>
                        <button type="button" className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                            <span className="sr-only">Open user menu</span>
                            <Image className="w-10 h-10 rounded-full" src="/avatar.jpg" alt="user photo" width="100" height="100"/>
                        </button>
                    </Dropdown>

                </div>
            </div>
        </nav>
    )
}