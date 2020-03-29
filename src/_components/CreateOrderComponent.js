import React, { useState, useEffect } from 'react';
import { Form, Input, InputNumber, Button, TimePicker, Select } from 'antd';
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

const CreateOrderComponent = () => {
    let history  = useHistory();
  useEffect(()=>{


    getRestaraunts();

  },[]);  
  const [name,setName] = useState(null);
  const [phone,setPhone] = useState(null);
  const [address,setAddress] = useState(null);
  const [restaurantId,setRestaurantId] = useState(null);
  const [restaurants,setRestaurants] = useState(null);  
  const [foods,setFoods] = useState(null);
  const [food,setFood] = useState(null);
  

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
  const getFoodsByRestaurantId = (restaurantId)=>{
    const db = firebase.firestore();
    

    db.collection("food").where('restaurantId', '==', restaurantId).get()
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
        setFoods(arr); 
        console.log(arr,'foods')   
    })
    }


  const onFinish = values => {
    // console.log(values.food.title);    
    const db = firebase.firestore();

    db.collection("orders").add({  
        restaurantId:restaurantId,      
        items:[{count:1,food:food}],      
        name: values.order.fullname,
        address: values.order.address,
        phone: values.order.phone,
    })
    .then(res=> {
        console.log("Document written with ID: ", res);
        history.push('/order');
    })

    
  };

  const handleSelect = (e,obj)=>{
    console.log(e,obj);
    getFoodsByRestaurantId(e);
    setRestaurantId(e);

  }
  const handleSelectFood = (e,obj)=>{
    console.log(e,obj);
    // getFoodsByRestaurantId(e);
    setFood({id:obj.key,title:obj.children});
  }
 

  return (
    restaurants && 
    <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
      <Form.Item name={['order', 'restaurant']} label="Ресторан" rules={[{ required: true }]}>
      <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Select rest"
            optionFilterProp="children"
            // onChange={handleRestaurantChange}
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
      <Form.Item name={['order', 'food']} label="Блюдо" rules={[{ required: true }]}>
      <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Select food"
            optionFilterProp="children"
            // onChange={onChange}
            // onFocus={onFocus}
            // onBlur={onBlur}
            // onSearch={onSearch}
            onSelect={handleSelectFood}
            filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
        >
           {!!foods && foods.map(r=>
           <Option key={r.id}>
               {r.title}
           </Option>)}
        </Select>
      </Form.Item>      
      <Form.Item name={['order', 'fullname']} label="ФИО" rules={[{ required: true }]}>
        <Input onChange={(e)=>{setName(e.target.value)}}/>
      </Form.Item>         
      <Form.Item name={['order', 'address']} label="Адрес" rules={[{ required: true }]}>
        <Input onChange={(e)=>{setAddress(e.target.value)}}/>
      </Form.Item>         
      <Form.Item name={['order', 'phone']} label="Телефон" rules={[{ required: true }]}>
        <Input onChange={(e)=>{setPhone(e.target.value)}}/>
      </Form.Item>             
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Отправить
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateOrderComponent;
