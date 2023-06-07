import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { ModalNewUserProps } from "./ModalNewUser.model";

export default function ModalNewUser({open,onOk,onCancel} : ModalNewUserProps){

    return (
        <Modal
        open={open}
        title="Title"
        onOk={onOk}
        onCancel={onCancel}
        footer={[
          <button className='text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'>
            Cancelar
          </button>,
          <button className='text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'>
            Crear usuario
          </button>
          ,
        ]}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    )
}