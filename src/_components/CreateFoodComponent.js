import React, { useState, useEffect } from 'react';
import { Form, Input, InputNumber, Button,Select, Upload, message } from 'antd';
import firebase, { storage } from 'firebase/app';
import { useHistory } from "react-router-dom";
import { UploadOutlined } from '@ant-design/icons';
import 'firebase/storage';
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
  //image upload
  const allInputs = {imgUrl: ''}
  const [imageAsFile, setImageAsFile] = useState('')
  const [imageAsUrl, setImageAsUrl] = useState(allInputs)
  

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

    if(imageAsFile === '') {
      console.error(imageAsFile,`not an image, the image file is a ${typeof(imageAsFile)}`)
    }
   
    const uploadTask =  firebase.storage().ref(`images/${imageAsFile.name}`).put(imageAsFile)
    //initiates the firebase side uploading 
    uploadTask.on('state_changed', 
    (snapShot) => {
      //takes a snap shot of the process as it is happening
      console.log(snapShot)
    }, (err) => {
      //catches the errors
      console.log('fgjhfh')
    }, () => {
      // gets the functions from storage refences the image storage in firebase by the children
      // gets the download url then sets the image from firebase as the value for the imgUrl key:
      firebase.storage().ref('images').child(imageAsFile.name).getDownloadURL()
       .then(fireBaseUrl => {
         setImageAsUrl(prevObject => ({...prevObject, imgUrl: fireBaseUrl}));
         db.collection("food").add({  
          restaurantId:restaurantId,      
          title: values.food.title,
          description: values.food.description,
          price: values.food.price,
          imageUrl:fireBaseUrl
        })
        .then(res=> {
            console.log("Document written with ID: ", res);
            history.push('/food');
        })
       })
    })
    

    
  };

  const handleSelect = (e,obj)=>{
    console.log(e,obj);
    setRestaurantId(e);
  }

  const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      handleImageAsFile(info);
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  
  
  const handleImageAsFile = (e) => {
    const image = e.fileList[0];
    console.log(e,'imageasd asd asd asd');
    let asd = image.originFileObj;
    setImageAsFile((imageFile) => (asd))
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
      <Form.Item name={['food', 'price']} label="Цена" rules={[{ required: true,type: 'number', min: 0, max: 500 }]}>
        <InputNumber onChange={(e)=>{setPrice(e)}}/>
      </Form.Item>   
      <Form.Item name={['food', 'description']} label="Описание" rules={[{ required: true }]}>
        <Input.TextArea onChange={(e)=>{setDescription(e.target.value)}}/>
      </Form.Item>
      <Form.Item name={['food', 'photo']} label="Фотография" rules={[{ required: true }]}>
      <Upload {...props}>
        <Button onChange={handleImageAsFile}>
          <UploadOutlined /> Click to Upload
        </Button>
      </Upload>
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
