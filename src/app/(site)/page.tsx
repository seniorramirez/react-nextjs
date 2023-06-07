'use client';

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { collection, doc, setDoc,getDocs } from "firebase/firestore";
import { firestore }  from '@/utils/firebase/Firebase';
import ModalNewUser from '@/components/modal/ModalNewUser';

interface ColumnDataType {
  key: string;
  firstName: string;
  lastName: string;
  email: string;
  company: string;
}

export async function getAllUser(usersCollection: any) {
  const data = await getDocs(usersCollection);

  const new_data: ColumnDataType[] = [];

  data.forEach(elm => {
    let row:any = elm.data();
    let key = elm.id;
    new_data.push({
      key: key,
      firstName: row.first_name,
      lastName: row.last_name,
      email: row.email,
      company: row.company
    });
  });

  return new_data;
}

export default function IndexPage() {

  const usersCollection = collection(firestore, "users");

  const [data_columns,setDataColumn] = useState([]);
  const [open_modal_new_user,setOpenModalNewUser] = useState(false);

  async function getUsers(){
    let data = await getAllUser(usersCollection);
    setDataColumn(data);
  }

  useEffect(() => {
    getUsers();
  });

  return (
    <main className="flex flex-col">

      <div className='flex flex-row justify-end'>
        <button onClick={(e) => setOpenModalNewUser(true)} className='text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'>Nuevo usuario</button>
      </div>

      <div className='flex flex-row mt-5'>
        
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                    Nombre
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Apellido
                  </th>
                  <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                    Correo
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Empresa
                  </th>
                  <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                  data_columns.map((record,i) => <tr className="border-b border-gray-200 dark:border-gray-700" key={record.key}>
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                          {record.firstName}
                        </th>
                        <td className="px-6 py-4">
                          {record.lastName}
                        </td>
                        <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                          {record.email}
                        </td>
                        <td className="px-6 py-4">
                          {record.company}
                        </td>
                        <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                          -
                        </td>
                    </tr>
                  )
                }
                
              </tbody>
          </table>
        </div>

      </div>

      <ModalNewUser open={open_modal_new_user} onCancel={(e) => {console.log("cancel");}} onOk={(e) => {console.log("Ok");}}/>
    </main>
  )
}
