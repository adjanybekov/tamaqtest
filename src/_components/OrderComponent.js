import React, { useEffect, useState } from 'react';
import { Table, Button,Row,Col,Modal } from 'antd';
import firebase from 'firebase/app';
import { Link } from 'react-router-dom';


function OrderComponent() {
    
    const [orders,setOrders] = useState([]);
    const [modal,setModal] = useState(null);
    const [visible,setVisible] = useState(false);
    useEffect(()=>{

        const db = firebase.firestore();

        db.collection("orders").get()
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
            setOrders(arr);
        })

    },[]);

    const orderedFoodsColumns =[
        {           
            title:'Название',
            render: (text,order) =>{
                console.log(text,order)
                return(order.food.title)
              },
        },
        {
            dataIndex:'count',
            title:'Количество'
        },
       
    ]
      const openModal = (order)=>{
        console.log(order);
        setVisible(true);

        let modal = <Modal
            title="Заказы"
            visible={!!order}
            onOk={()=>{setVisible(false);setModal(null)}}
            onCancel={()=>{setVisible(false);setModal(null)}}
        >
            <p>Some contents...</p>
           <Table
            columns={orderedFoodsColumns}
            dataSource={order.items}
            pagination={false}
           />
        </Modal>  
        setModal(modal);

      }
  const columns = [
    {
      title: 'Имя',
      dataIndex: 'name',
      key: 'title',
    },
    {
      title: 'Фдрес',
      dataIndex: 'address',
      key: 'address',
    },
    {
        dataIndex:'phone',
        title:'Телефон',
        key: 'address',
    },
    {
      title: 'Посмотреть',      
      render: (text,order) =>{
        return(<Button onClick={()=>openModal(order)}><i className="fa fa-eye"></i></Button>)
      },
      key: 'show',
    },

  ];

  return (
    <div> 
        <Row style={{marginBottom:'2vh'}}>
            <Button><Link  to="/order/create">Добавить заказ</Link></Button>
        </Row>
        <Row>
            <Col span={24}>
                <Table
                columns={columns}
                dataSource={orders}
                />
            </Col>            
        </Row>  
        {visible && modal}      
    </div>
  );
}

export default OrderComponent;
