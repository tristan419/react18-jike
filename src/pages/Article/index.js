import { Link } from 'react-router-dom'
import { Card, Breadcrumb, Form, Button, Radio, DatePicker, Select, Popconfirm } from 'antd'
import locale from 'antd/es/date-picker/locale/zh_CN'

import { Table, Tag, Space } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
// import img404 from '@/https://cdn.jsdelivr.net/npm/itheima-react/assets/error.png'
import {Image} from 'antd'
import { useChannel } from '@/hooks/useChannel'
import { use, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { deleteArticleAPI, getArticleListAPI } from '@/apis/article'


const { Option } = Select
const { RangePicker } = DatePicker

const Article = () => {
    const img404 = 'https://source.unsplash.com/random/80x60'

    const {channelList} = useChannel()

    const statusList = {
        1:<Tag color="red">草稿</Tag>,
        2:<Tag color="green">审核通过</Tag>,
    }

    //筛选功能
    const [reqData, setReqData] = useState({
        status: '',
        channel_id: '',
        begin_pubdate: '',
        end_pubdate: '',
        page:1,
        per_page: 4,
    })

    const onPageChange = (page) => {
        // console.log('page:', page)
        //修改参数依赖项引发数据的重新获取列表重新渲染
        setReqData({
            ...reqData,
            page: page,
        })
    }

    //获取当前的筛选数据
    const onFinish = (values) => {
        // console.log(values)
        //把表单收集到数据放到参数中
        setReqData({
            ...reqData,
            status: values.status,
            channel_id: values.channel_id,
            begin_pubdate: values.date[0].format('YYYY-MM-DD'),
            end_pubdate: values.date[1].format('YYYY-MM-DD'),
        })

        //重新拉取文章列表
        

    }

    //编辑跳转
    const navigate = useNavigate()



    const columns = [
        {
          title: '封面',
          dataIndex: 'cover',
          width: 120,
          render: cover => {
            return <img src={cover.images[0] || img404} width={80} height={60} alt="" />
          }
        },
        {
          title: '标题',
          dataIndex: 'title',
          width: 220
        },
        {
          title: '状态',
          dataIndex: 'status',
          render: data => statusList[data]
        },
        {
          title: '发布时间',
          dataIndex: 'pubdate'
        },
        {
          title: '阅读数',
          dataIndex: 'read_count'
        },
        {
          title: '评论数',
          dataIndex: 'comment_count'
        },
        {
          title: '点赞数',
          dataIndex: 'like_count'
        },
        {
          title: '操作',
          render: data => {
            return (
              <Space size="middle">
                <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={() => navigate(`/Publish?id=${data.id}`)}/>
                <Popconfirm
                    title="确定删除吗？"
                    description="删除后不可恢复"
                    onConfirm={()=>onConfirm(data.id)}
                    okText="确定"
                    cancelText="取消"
                >
                <Button
                  type="primary"
                  danger
                  shape="circle"
                  icon={<DeleteOutlined />}
                />
                </Popconfirm>
              </Space>
            )
          }
        }
      ]
      // 准备表格body数据
      const data = [
        {
          id: '8218',
          comment_count: 0,
          cover: {
            images: [],
          },
          like_count: 0,
          pubdate: '2019-03-11 09:00:00',
          read_count: 2,
          status: 2,
          title: 'wkwebview离线化加载h5资源解决方案'
        }
      ]

    //删除
    const onConfirm = async(data) => {
        // console.log('删除了:',data)
        await deleteArticleAPI(data)
        setReqData({
            ...reqData,
        })
    }

    
    const [list, setlist] = useState([])
    const [count, setCount] = useState(0)
    useEffect(() => {
        async function getList() {
            const res = await getArticleListAPI(reqData)
            // console.log(res.data.results);
            setlist(res.data.results)
            setCount(res.data.total_count)
        }
    getList()},[reqData]
    )
  return (
    <div>
      <Card
        title={
          <Breadcrumb items={[
            { title: <Link to={'/'}>首页</Link> },
            { title: '文章列表' },
          ]} />
        }
        style={{ marginBottom: 20 }}
      >
        <Form initialValues={{ status: '' }} onFinish={onFinish}>
          <Form.Item label="状态" name="status" >
            <Radio.Group>
              <Radio value={''}>全部</Radio>
              <Radio value={0}>草稿</Radio>
              <Radio value={2}>审核通过</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="频道" name="channel_id">
            <Select
              placeholder="请选择文章频道"
              defaultValue={channelList[0]?.id}
              style={{ width: 120 }}
            >
              {channelList.map(item => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="日期" name="date">
            {/* 传入locale属性 控制中文显示*/}
            <RangePicker locale={locale}></RangePicker>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 40 }}>
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>
        <Card title={`根据筛选条件共查询到 ${count} 条结果`}>
        <Table 
          rowKey="id" 
          columns={columns} 
          dataSource={list} 
          pagination={{
            total: count,
            pageSize: reqData.per_page,
            onChange: onPageChange
          }}
        >
        </Table>
        </Card>

    </div>
  )
}

export default Article