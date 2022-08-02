import React, { useState, useRef, useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import {
    Button,
    Modal,
    Tabs,
    Input,
    DatePicker,
    Form,
    Select,
    Space,
    Spin,
    Row,
    Col,
    message,
    Descriptions,
    Card,
    Table
} from 'antd';

import "../../css/index.less"
import BreadNav from '../breadNav'

const {Option} = Select;
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;
const InstaceList = (props)=>{
    const [form] = Form.useForm();
    const [tableheight,setTableheight] = useState(0)
    const [spinning,setSpinning]  = useState(false)
    const [selecteddbRowKeys,setselecteddbRowKeys] = useState([])
    const [showdetail,setShowdetail]  = useState(false)
    const [showaddinstance,setShowaddinstance]  = useState(false)
    const [showcontactproject,setShowcontactproject]  = useState(false)
    const [showcompare,setshowcompare] = useState(false)

    const [data,setData] = useState([])
    const [projectlist,setProjectlist] = useState([])
    const [instancetypelist,setInstancetypelist]  = useState([])
    const [dbtypelist,setDbtypelist]  = useState([])
    const [record,setRecord]  = useState({})
    const [dbdata,setDbdata]  = useState([])
    const [tabledata,setTabledata]   = useState([])
    const [tabledbdata,setTabledbdata]   = useState([])
    const [addType,setAddType] = useState('')
    const [instancerecord,setInstancerecord] = useState('')
    const [comparedata,setcomparedata]  = useState([])
    const [buttonable,setbuttonable] = useState('')
    const [params,setParams] = useState({
        name: "",
        type:""
    })
    const columns = [
        {
            dataIndex: 'name',
            title: "实例别名",
            align:"center",
        },
        {
            dataIndex: 'type',
            title: "类型",
            align:"center",
        },
        {
            dataIndex: 'ip',
            title: "IP",
            align:"center",
        },
        {
            dataIndex: 'port',
            title: "端口",
            align:"center",
        },
        {
            dataIndex: 'projectInfo',
            title: "项目信息",
            align:"center",
        },
        {
            dataIndex: 'status',
            title: "状态",
            align:"center",
            render:(text,record)=>{
                return <span>{text == 'inuse'?'可用':'停用'}</span>
            }
        },
        {
            dataIndex: 'action',
            title: "操作",
            align:"center",
            render: (text, record)=>{
                return(
                    <Space>
                        <Button type="plain" size='small' onClick={()=> showdetaildio(record)}>详情</Button>
                        <Button type="plain" size='small'  onClick={()=> addinstance(record,'edit')}  disabled={buttonable?false:true}>编辑</Button>
                        <Button type="plain" size='small' onClick={()=> contactproject(record)}  disabled={buttonable?false:true}>关联项目</Button>
                    </Space>
                )
            }
        }
    ]
    const dbcolumns = [
        {
            dataIndex: 'name',
            title: "名称",
            align:"center",
            filters: [
                ...dbdata
            ],
            filterSearch: true,
            onFilter: (value, record) => record.name.startsWith(value),
            filterSearch: (input, record) => record.value.indexOf(input) > -1,
        },
        {
            dataIndex: 'character',
            title: "字符集",
            align:"center",
        },
        {
            dataIndex: 'dataSizeMB',
            title: "数据大小(MB)",
            align:"center",
        },
        {
            dataIndex: 'collation',
            title: "排序类型",
            align:"center",
        },
        {
            dataIndex: 'indexSizeMB',
            title: "索引大小(MB)",
            align:"center",
        },
    ]
    const datacolumns = [
        {
            dataIndex: 'name',
            title: "表名",
            align:"center",
            filters: [
                ...tabledata
            ],
            filterSearch: true,
            onFilter: (value, record) => record.name.startsWith(value),
            filterSearch: (input, record) => record.value.indexOf(input) > -1,
        },
        {
            dataIndex: 'dbName',
            title: "数据库名",
            align:"center",
            filters: [
                ...tabledbdata
            ],
            filterSearch: true,
            onFilter: (value, record) => record.dbName.startsWith(value),
            filterSearch: (input, record) => record.value.indexOf(input) > -1,
        },
        {
            dataIndex: 'dataSizeMB',
            title: "数据大小(MB)",
            align:"center",
        },
        {
            dataIndex: 'indexSizeMB',
            title: "索引大小(MB)",
            align:"center",
        },
        {
            dataIndex: 'showCreateTable',
            title: "创表语句",
            align:"left",
            render:(text,record)=>{
                return <pre style={{whiteSpace:'pre-line'}}>{text}</pre>
            }
        },
    ]
    const rowSelection = {
        selectedRowKeys: selecteddbRowKeys,
        onChange: selectedRowKeys => {
            console.log('selectedRowKeys changed: ', selectedRowKeys);
            // this.setState({ selectedRowKeys });
            if(selectedRowKeys.length>2){
                message.warning('只能选择两个实例别名,请重新选择')
                return false
            } else {
                setselecteddbRowKeys(selectedRowKeys)
            }
           console.log(selectedRowKeys)
          
          },
        getCheckboxProps: (record) => ({
          disabled: record.status !== 'inuse',
          // Column configuration not to be checked
          name: record.inuse,
        }),
    }
 
    const contactproject = (obj)=>{
        setInstancerecord(obj)
        setShowcontactproject(true)
    }
    const cancelContact = ()=>{
        setShowcontactproject(false)
    }
    const addinstance = (obj,type)=>{
        setAddType(type)
        setInstancerecord(obj)
        setShowaddinstance(true)
    }
    const cancelinstance = ()=>{
        setShowaddinstance(false)
        setInstancerecord({})
        setAddType('')
    }
    const cpmpare = ()=>{
        console.log('selections',selecteddbRowKeys)
        let arr = []
        for( let i = 0;i <= selecteddbRowKeys.length -1;i++){
            let obj = selecteddbRowKeys[i]
            arr.push((data.filter(item=> item.id == obj))[0])
        }
        console.log('arr',arr)
        setcomparedata(arr)
        setshowcompare(true)
    }
    const cancelcpmpare = ()=>{
        setshowcompare(false)
    }
    useEffect(()=>{
        getprojectlist()
        getdata(params)
    },[])
    useEffect( async()=>{ 
        let boxheight = (document.documentElement.clientHeight || document.body.clientHeight)  -260;
        setTableheight(boxheight)
        window.addEventListener('resize', handleResize);
        return ()=>{
        window.removeEventListener('resize', handleResize);
        }
    },[]);
    const showdetaildio = (record)=>{
        setRecord(record)
        let dbarr = []
        if(record.db && record.db.length >0){
            record.db.map((item,index)=>{
                let _db = {}
                _db.value = item.name
                _db.text = <span>{item.name}</span>
                item.key = index;
                item.index = index
                dbarr.push(_db)
            })
            setDbdata(dbarr)
        }
        if(record.table && record.table.length >0){
            let _tabledata = []
            let _tabledbarr = []
            record.table.map((item,index)=>{
                let _table = {}
                let _arr = {}
                let flag = true
                let _flag = true
                _table.value = item.name
                _table.text = <span>{item.name}</span>

                _arr.value = item.dbName
                _arr.text = <span>{ item.dbName}</span>
                item.key = index;
                item.index = index;
                _tabledata.map( _item =>{
                    if(_item.value == item.name){
                        flag = false
                    } 
                })
                _tabledbarr.map( _item1 =>{
                    if(_item1.value == item.dbName){
                        _flag = false
                    } 
                })
              if( flag ){
                _tabledata.push(_table)
              }
              if( _flag ){
                _tabledbarr.push(_arr)
              }
            })
            setTabledbdata(_tabledbarr)
            setTabledata(_tabledata)
        }
        setShowdetail(true)
    }
    const doseacher = (values)=>{
        let _values = form.getFieldsValue()
        let _params = {
            name: _values.name?_values.name.trim():'',
            type: _values.type?_values.type:'',
            projectEnv: _values.projectEnv?_values.projectEnv:'',
            projectName: _values.projectName?_values.projectName:'',
            status: _values.status?_values.status:''
        }
        getdata(_params)
    }
    const getdata = async(params)=>{
       
    }
    const getprojectlist = async()=>{
       
    }
    const dbtypeOnchange = (value)=>{}
    const handleResize = ()=>{
        let boxheight = (document.documentElement.clientHeight || document.body.clientHeight) -260;
        
        setTimeout(()=>{
            setTableheight(boxheight)
        },100)
    }
  return(
    <>
      <BreadNav title={"实例管理"} props={props} childtitle={'实例列表'}></BreadNav>
        <Modal title="详情展示" visible={showdetail} width="80%" onOk={()=>setShowdetail(false)} onCancel={()=>setShowdetail(false)}>
            <Descriptions title="基础信息" bordered size="small">
                <Descriptions.Item label="ID">{record.id}</Descriptions.Item>
                <Descriptions.Item label="名称">{record.name}</Descriptions.Item>
                <Descriptions.Item label="类型">{record.type}</Descriptions.Item>
                <Descriptions.Item label="IP">{record.ip}</Descriptions.Item>
                <Descriptions.Item label="端口">{record.port}</Descriptions.Item>
                {
                     buttonable?
                     <>
                        <Descriptions.Item label="用户名">{record.username}</Descriptions.Item>
                        <Descriptions.Item label="密码">{record.password}</Descriptions.Item>
                     </>:
                     null
                }
                <Descriptions.Item label="状态">{record.status}</Descriptions.Item>
                <Descriptions.Item label="项目信息">{record.projectInfo}</Descriptions.Item>
            </Descriptions>
            <Card title="数据库信息">
                <Table
                    columns = {dbcolumns}
                    dataSource={record.db} 
                    />
            </Card>
            <Card title="数据表信息">
                <Table
                    columns = {datacolumns}
                    dataSource={record.table} 
                    />
            </Card>
        </Modal>
        {
            showaddinstance? <Modal title={addType == 'add'?'新增':'编辑'} visible={showaddinstance} width="500px" footer={null} maskClosable={false} onCancel={cancelinstance}>
            
        </Modal>:
        null
        }
       
        {
            showcompare?
            <Modal title="实例对比" visible={showcompare} width="90%" footer={null}  onCancel={cancelcpmpare}>
            
            </Modal>:
            null
            }
        {
            showcontactproject?
            <Modal title="关联项目" visible={showcontactproject} width="700px" footer={null} maskClosable={false} onCancel={cancelContact}>
                </Modal>
                :
                null
        }
       
        <div className="seacher" style={{padding: '12px 20px',height: 'auto'}}>
            <Form
                form={form}
                onFinish={doseacher}
                >
               <Row gutter={4}>
                   <Col span={5}>
                        <Form.Item label="实例别名" name="name">
                            <Input  />
                        </Form.Item>
                   </Col>
                   <Col span={4}>
                        <Form.Item label="项目环境" name="projectEnv">
                           <Select allowClear>
                               <Select.Option value={'it'}>it</Select.Option>
                               <Select.Option value={'uat'}>uat</Select.Option>
                               <Select.Option value={'sim'}>sim</Select.Option>
                               <Select.Option value={'pro'}>pro</Select.Option>
                               <Select.Option value={'out'}>out</Select.Option>
                           </Select>
                        </Form.Item>
                   </Col>
                   <Col span={5}>
                        <Form.Item label="项目名" name="projectName">
                           <Select allowClear>
                              {
                                  projectlist.map((item,index)=>{
                                      return  <Select.Option value={item.name} key={index}>{item.name}</Select.Option>
                                  })
                              }
                           </Select>
                        </Form.Item>
                   </Col>
                   <Col span={5}>
                        <Form.Item label="状态" name="status">
                           <Select allowClear>
                               <Select.Option value={'inuse'}>可用</Select.Option>
                               <Select.Option value={'notuse'}>停用</Select.Option>
                           </Select>
                        </Form.Item>
                   </Col>
                   <Col span={5}>
                        <Form.Item label="类型" name="type">
                           <Select allowClear>
                               <Select.Option value={'mysql'}>mysql</Select.Option>
                           </Select>
                        </Form.Item>
                   </Col>
                  
               </Row>
               <Row>
                    <Col span={24}  style={{textAlign: 'right'}}>
                        <Form.Item label="" style={{marginBottom: 0}}>
                            <Space>
                                <Button type="primary"  htmlType='submit' >查询</Button>
                                <Button type="primary"  onClick={()=>addinstance({},'add')} disabled={buttonable?false:true}>新增实例</Button>
                                <Button type="primary" onClick={cpmpare} disabled={selecteddbRowKeys.length == 2?false:true}>实例对比</Button>
                            </Space>
                        </Form.Item>
                    </Col>
               </Row>
            </Form>
        </div> 
        <div style={{height: tableheight+'px',overflow:'hidden',overflowY:'scroll',background: '#fff',marginTop:'10px',padding: '0 20px'}} className="configmapbox">
            <Spin spinning={spinning}>
                <div>
                    <Table
                        rowSelection={rowSelection}
                        columns = {columns}
                        bordered={true}
                        loading={spinning}
                        dataSource={data} 
                    />
                </div>
            </Spin>
        </div>
    </>
  )
};
export default withRouter(InstaceList);
