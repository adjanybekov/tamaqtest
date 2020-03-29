import React, { useEffect, useState } from 'react';
import { Table,Button, Row,Col} from 'antd';
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
      title: 'Название',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Цена',
      dataIndex: 'price',
      key: 'price',
    }  
  ];


function MenuComponent() {

    const [foods,setFoods] = useState([]);
    useEffect(()=>{

        const db = firebase.firestore();

        db.collection("food").get()
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
            setFoods(arr);
        })

    },[]);
  return (
    <div> 
        <Row style={{marginBottom:'2vh'}}>
            <Button><Link to="/food/create">Добавить Блюдо</Link></Button>
        </Row>
        <Row>
            <Col span={24}>
                <Table
                columns={columns}
                dataSource={foods}
                />
            </Col>            
        </Row>         
    </div>
  );
}

export default MenuComponent;
