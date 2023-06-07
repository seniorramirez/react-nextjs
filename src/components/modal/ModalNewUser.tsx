'use client';

import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import { ModalNewUserProps } from "./ModalNewUser.model";
import Input from '../input/Input';
import { createUser as apiCreateUser,updateUser as apiUpdateUser } from "@/api/users/users";
import { UserType,UserValidationType } from "@/api/users/users.model";
import { notification } from 'antd';

export default function ModalNewUser({open,onOk,onCancel,record} : ModalNewUserProps){

  const INITIAL_STATE:UserType = {
    first_name: "",
    last_name: '',
    email: '',
    company: ''
  }

  const INITIAL_STATE_VALIDATION:UserValidationType = {
    first_name: false,
    last_name: false,
    email: false,
    company: false
  }

  const [form,setForm] = useState<UserType>(INITIAL_STATE);

  const [form_validation,setFormValidate] = useState<UserValidationType>(INITIAL_STATE_VALIDATION);

  const [loading_create, setLoadingCreate] = useState(false);

  const [emailRegex, setEmailRegex] = useState("");

  async function createUser(){
    setLoadingCreate(true);
    try{
      let data = await apiCreateUser(form);

      let data_return: UserType = {
        key: data.id,
        ...form
      }
      
      setForm(INITIAL_STATE);
      onOk(data_return);

      notification.open({
        message: 'Correcto',
        description: 'Se registro el usuario correctamente',
      });
      setLoadingCreate(false);
    }catch(e){
      notification.open({
        message: 'Ocurrio un error',
        description: 'Ocurrio un error registrando el usuario',
      });
      setLoadingCreate(false);
    }
    
  }

  async function updateUser(){

    setLoadingCreate(true);

    try{
      let uid = record?.key;

      let data = await apiUpdateUser(uid,form);

      let data_return: UserType = {
        key: uid,
        ...form
      }
      
      setForm(INITIAL_STATE);
      onOk(data_return);

      notification.open({
        message: 'Correcto',
        description: 'Se actualizó el usuario correctamente',
      });
      setLoadingCreate(false);
    }catch(e){
      notification.open({
        message: 'Ocurrio un error',
        description: 'Ocurrio un error registrando el usuario',
      });
      setLoadingCreate(false);
    }
  }

  function closeModal (){
    setForm(INITIAL_STATE);
    setFormValidate(INITIAL_STATE_VALIDATION);
    onCancel();
  }

  function handleInputChange(event:any){
      setForm({
          ...form,
          [event.target.name] : event.target.value
      })
  }

  function validateForm(){

    let new_validation = {};
    let error = false;

    for(let i in form){
      if(!form[i]){
        new_validation[i] = true;
        error = true;
      }else{
        new_validation[i] = false;
      }
    }

    if(form.email){
      let regex_email = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
      if(!regex_email.test(form.email)){
        error = true;
        new_validation.email = true;
        setEmailRegex("Formato de correo incorrecto");
      }else{
        new_validation.email = false;
        setEmailRegex("");
      }
    }

    setFormValidate(new_validation);

    //SI HAY UN ERROR NO SIGUE
    if(error){
      return;
    }

    //SI EDITA RECORD DEBE TENER ALGUN VALOR
    if(record){
      updateUser();
    }else{
      createUser();
    }

  }

  useEffect(() => {
    
    if(record){
      setForm(record);
    }
  },[record]);

  return (
    <Modal
      open={open}
      title={record ? 'Actualizar usuario' : 'Crear usuario'}
      onOk={onOk}
      onCancel={closeModal}
      footer={[
        <button key="cancel_button" onClick={closeModal} className='py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'>
          Cancelar
        </button>,
        <button key="create_button" onClick={validateForm} disabled={loading_create} className='text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'>
          {record ? 'Actualizar usuario' : 'Crear usuario'}
        </button>
      ]}
    >
      <div className="grid grid-cols-12 gap-4 gap-y-3">
        <div className="col-span-6">
          <Input
              label="Nombre"
              type="text"
              name="first_name"
              value={form.first_name}
              onChange={handleInputChange}
              error={form_validation.first_name}
              
          />
        </div>
        <div className="col-span-6">
          <Input
              label="Apellido"
              type="text"
              name="last_name"
              value={form.last_name}
              onChange={handleInputChange}
              error={form_validation.last_name}
          />
        </div>
        <div className="col-span-6">
          <Input
              label="Correo"
              type="email"
              name="email"
              value={form.email}
              onChange={handleInputChange}
              error={form_validation.email}
              customerror={emailRegex}
          />
        </div>
        <div className="col-span-6">
          <Input
              label="Compañia"
              type="text"
              name="company"
              value={form.company}
              onChange={handleInputChange}
              error={form_validation.company}
          />
        </div>
      </div>
    </Modal>
  )
}