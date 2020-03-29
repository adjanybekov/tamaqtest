import React, { useState } from 'react';
import { Form, Input, InputNumber, Button, TimePicker } from 'antd';
import firebase from 'firebase/app';
import { useHistory } from "react-router-dom";

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

const validateMessages = {
  required: 'This field is required!',
  types: {
    email: 'Not a validate email!',
    number: 'Not a validate number!',
  },
  number: {
    range: 'Must be between ${min} and ${max}',
  },
};

const CreateRestarauntComponent = () => {
    let history  = useHistory();
  const [title,setTitle] = useState(null);
  const [address,setAddress] = useState(null);
  const [phone,setPhone] = useState(null);
  const [workingFrom,setWorkingFrom] = useState(null);
  const [workingUntil,setWorkingUntil] = useState(null);
  const [description,setDescription] = useState(null);

  const onFinish = values => {
    // console.log(values.food.title);    
    const db = firebase.firestore();

    const restaurant = {
        title: values.restaurant.title,
        address: values.restaurant.address,
        phone: values.restaurant.phone,
        workingFrom: workingFrom,
        workingUntil: workingUntil,
        description: !!values.restaurant.description?values.restaurant.description:null,        
    };
    console.log(restaurant);
    db.collection("restaurants").add(restaurant)
    .then(res=> {
        console.log("Document written with ID: ", res);
        history.push('/restaurant');
    })

    
  };

  return (
    <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
      <Form.Item name={['restaurant', 'title']} label="Название" rules={[{ required: true }]}>
        <Input onChange={(e)=>{setTitle(e.target.value)}}/>
      </Form.Item>

      <Form.Item name={['restaurant', 'address']} label="Адрес" rules={[{ required: true }]}>
        <Input onChange={(e)=>{setAddress(e.target.value)}}/>
      </Form.Item>    
      <Form.Item name={['restaurant', 'phone']} label="Телефон" rules={[{ required: true }]}>
        <Input onChange={(e)=>{setPhone(e.target.value)}}/>
      </Form.Item>
      <Form.Item name={['restaurant', 'workingFrom']} label="Открывается" rules={[{ required: true }]}>
        <TimePicker onChange={(time,timeString)=>{setWorkingFrom(timeString)}} format="HH:mm"/>
      </Form.Item>
      <Form.Item name={['restaurant', 'workingUntil']} label="Закрывается" rules={[{ required: true }]}>
        <TimePicker onChange={(time,timeString)=>{setWorkingUntil(timeString)}} format="HH:mm"/>
      </Form.Item>
      <Form.Item name={['restaurant', 'description']} label="Описание" >
        <Input.TextArea onChange={(e)=>{setDescription(e.target.value)}}/>
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
           Отправить
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateRestarauntComponent;
