'use client';

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { firestore }  from '@/utils/firebase/Firebase';
import ModalNewUser from '@/components/modal/ModalNewUser';
import { Table,Popconfirm } from "antd"; 
import { getAllUser,deleteUser } from "@/api/users/users";
import { UserType } from "@/api/users/users.model";
import { notification } from 'antd';

export default function IndexPage() {

  const [data_columns,setDataColumn] = useState<UserType[]>([]);
  const [open_modal_new_user,setOpenModalNewUser] = useState(false);
  const [table_loading,setTableLoading] = useState(true);
  const [user_selected,setUserSelected] = useState<UserType|null>(null);

  const columns_example = [ 
    { 
      key: "first_name", 
      title: "Nombre", 
      dataIndex: "first_name", 
    }, 
    { 
      key: "last_name", 
      title: "Apellido", 
      dataIndex: "last_name", 
    }, 
    { 
      key: "email", 
      title: "Correo", 
      dataIndex: "email", 
    }, 
    { 
      key: "company", 
      title: "Compañia", 
      dataIndex: "company", 
    }, 
   
    { 
      key: "options", 
      title: "Acciones", 
      dataIndex: "options", 
      render: (text:any,record:UserType) => (
        <div className='flex flex-row'>
          <a className='mr-2 ' onClick={() => { openModalEdit(record)}}>
            Editar
          </a>

          <Popconfirm
            title="Eliminar usuario"
            description="¿Está seguro de eliminar el usuario?"
            okText="Si"
            cancelText="No"
            onConfirm={() => removeUser(record.key)}
          >
            <a className="text-red-400">
              Eliminar
            </a>
          </Popconfirm>
        </div>
      ),
    }, 
  ];

  async function getUsers(){
    //setTableLoading(true);
    let data = await getAllUser();
    setDataColumn(data);
    setTableLoading(false);
  }

  async function removeUser(id:any){
    let data = await deleteUser(id);

    let new_data = data_columns.filter(elm => elm.key != id);

    setDataColumn(new_data);

    notification.open({
      message: 'Correcto',
      description: 'Se elimino el usuario correctamente',
    });
  }

  function saveUser(data:UserType){

    if(!user_selected){
      setDataColumn([...data_columns,data]);
    }else{
      let data_copy = data_columns;

      for(let i in data_copy){
        if(data_copy[i].key == data.key){
          data_copy[i] = data;
          setDataColumn([...data_copy]);
          break;
        }
      }

    }
    setUserSelected(null);
    setOpenModalNewUser(false)
  }

  function openModalNew(){
    setUserSelected(null);
    setOpenModalNewUser(true)
  }

  function openModalEdit(record:UserType){

    setUserSelected(record);
    setOpenModalNewUser(true)

  }


  useEffect(() => {getUsers();},[]);

  return (
    <main className="flex flex-col">

      <div className='flex flex-row justify-end'>
        <button onClick={(e) => openModalNew()} className='text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'>Nuevo usuario</button>
      </div>

      <div className='flex flex-row mt-5'>
        
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full">

          <Table dataSource={data_columns} columns={columns_example} pagination={false} loading={table_loading} /> 
        </div>

      </div>

      <ModalNewUser open={open_modal_new_user} onCancel={() => { setOpenModalNewUser(false)}} onOk={saveUser} record={user_selected}/>
    </main>
  )
}
