import React, { useState, useEffect } from 'react';
import { Form, Input, InputNumber, Button,Select } from 'antd';
import firebase from 'firebase/app';
import { useHistory } from "react-router-dom";
const { Option } = Select;

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

const CreateFoodComponent = () => {
  let history  = useHistory();
  useEffect(()=>{


    getRestaraunts();

  },[]);  
  const [title,setTitle] = useState(null);
  const [price,setPrice] = useState(null);
  const [description,setDescription] = useState(null);
  const [restaurantId,setRestaurantId] = useState(null);
  const [restaurants,setRestaurants] = useState(null);
  

  const getRestaraunts = ()=>{
    const db = firebase.firestore();

    db.collection("restaurants").get()
    .then(
        function(querySnapshot) {
        let  arr = [];
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            const id= doc.id;
            let obj = {id,...doc.data()};
            arr.push(obj);
        //   console.log(doc.id, ...doc.data());
        });
        setRestaurants(arr); 
        console.log(arr)   
    })
    }


  const onFinish = values => {
    // console.log(values.food.title);    
    const db = firebase.firestore();

    db.collection("food").add({  
        restaurantId:restaurantId,      
        title: values.food.title,
        description: values.food.description,
        price: values.food.price,
    })
    .then(res=> {
        console.log("Document written with ID: ", res);
        history.push('/food');
    })

    
  };

  const handleSelect = (e,obj)=>{
    console.log(e,obj);
    setRestaurantId(e);
  }

  return (
    restaurants && 
    <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
      <Form.Item name={['food', 'restaurant']} label="Ресторан" rules={[{ required: true }]}>
      <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Select food"
            optionFilterProp="children"
            // onChange={onChange}
            // onFocus={onFocus}
            // onBlur={onBlur}
            // onSearch={onSearch}
            onSelect={handleSelect}
            filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
        >
           { restaurants.map(r=>
           <Option key={r.id}>
               {r.title}
           </Option>)}
        </Select>
      </Form.Item>      
      <Form.Item name={['food', 'title']} label="Название" rules={[{ required: true }]}>
        <Input onChange={(e)=>{setTitle(e.target.value)}}/>
      </Form.Item>      
      <Form.Item name={['food', 'price']} label="Цена" rules={[{ required: true,type: 'number', min: 0, max: 99 }]}>
        <InputNumber onChange={(e)=>{setPrice(e)}}/>
      </Form.Item>   
      <Form.Item name={['food', 'description']} label="Описание" rules={[{ required: true }]}>
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

export default CreateFoodComponent;
