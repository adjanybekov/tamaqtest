import React, { useEffect, useState } from 'react';
import { Table, Button,Row,Col } from 'antd';
import firebase from 'firebase/app';
import { Link } from 'react-router-dom';


const dataSource = [
    {
      key: '1',
      name: 'Mike',
      age: 32,
      address: '10 Downing Street',
    },
    {
      key: '2',
      name: 'John',
      age: 42,
      address: '10 Downing Street',
    },
  ];
  
  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    }  
  ];


function HomeComponent() {

    const [restaurants,setRestaurants] = useState([]);
    useEffect(()=>{

        const db = firebase.firestore();

        db.collection("restaurants").get()
        .then(
            function(querySnapshot) {
            let  arr = [];
            querySnapshot.forEach(function(doc) {
              // doc.data() is never undefined for query doc snapshots
              const id= doc.id;
              let obj = {...doc.data(), id};
              arr.push(obj);
            //   console.log(doc.id, ...doc.data());
            });
            setRestaurants(arr);
        })

    },[]);
  return (
    <div> 
        <Row style={{marginBottom:'2vh'}}>
            <h1>Добро пожаловать в TamaQ Админ панель)</h1>
        </Row>        
    </div>
  );
}

export default HomeComponent;
