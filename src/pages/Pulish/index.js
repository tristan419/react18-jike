import {
    Card,
    Breadcrumb,
    Form,
    Button,
    Radio,
    Input,
    Upload,
    Space,
    Select,
    message
  } from 'antd'
  import { PlusOutlined } from '@ant-design/icons'
  import { Link } from 'react-router-dom'
  import './index.scss'

  import ReactQuill from 'react-quill-new'
  //   import ReactQuill from 'react-quill'
//   import 'react-quill/dist/quill.snow.css'
import 'react-quill-new/dist/quill.snow.css'
import React, { useState, useEffect } from 'react'

import  {createArticleAPI, getChannelAPI, updateArticleAPI } from '@/apis/article'
import create from '@ant-design/icons/lib/components/IconFont'
import { info } from 'sass'
import { useChannel } from '@/hooks/useChannel'
import { useSearchParams } from 'react-router-dom'
import { getArticleByIdAPI } from '@/apis/article'
import { type } from '@testing-library/user-event/dist/type'
  
  

  const { Option } = Select
  
  const Publish = () => {

  // //获取频道列表
  // const [channelList, setChannelList] = useState([])

  // useEffect(() => {
  //     //1.调取接口
  //     //2.调用函数
  //     const getChannelList = async () => {
  //         const res = await getChannelAPI()
  //         // console.log(res.data.channels);
  //         //3.更新状态
  //         setChannelList(res.data.channels)
  //     }
  //     getChannelList()},[])
  const { channelList } = useChannel()

  //回填数据
  const [searchParams] = useSearchParams()
  const articleId = searchParams.get('id')
  // console.log(articleId)
  const [form] = Form.useForm()
  useEffect(() => {
    // 通过id获取数据
    async function getArticleById() {
     const res = await getArticleByIdAPI(articleId)
    //通过实例方法完成回填
    form.setFieldsValue(
      {...res.data,
      type: res.data.cover.type,}
    )
    //回填图片列表
    // console.log(res)
    // console.log('res类型是：', typeof res)
    // console.log('res内容是：', res)
    setImageNum(res.data.cover.type)
    setImageList(res.data.cover.images.map(url => {
      return {url}
      }))
    }
    if (articleId) {
    getArticleById()
    }
  },[articleId, form])
  
  const onFinish = (values) => {
    // console.log('Success:', values)
    //校验封面类型是否和实际图片列表数量一致
    if (imageNum !== imageList.length) return message.error('封面图片数量和类型不一致')
    const{title,content,channel_id} = values
    const reqData ={
      title: title,
      content: content,
      cover:{
        type: imageNum,//封面模式
        //这里得做处理，看图片的接口是添加的新图还是返回的旧图
        images:imageList.map(item => {
          if (item.response) {
            return item.response.data.url
          }else{
            return item.url
          }
        })
      },
      channel_id: channel_id,
    }
    //调用接口提交，这里得调用不同的接口，如果是编辑回填就得是response如果是新增就是create
    if(articleId){
      console.log('编辑文章', articleId)
      updateArticleAPI({...reqData, id:articleId})
    }else{
      createArticleAPI(reqData)
    }
  }

  //上传回调
  const [imageList, setImageList] = useState([])
  const onUploadChange = (info) => {
    setImageList(info.fileList)
  }
  
  const[imageNum, setImageNum] = useState(1)
  //切换图片类型
  const onTypeChange =(e)=> {
    setImageNum(e.target.value)

  }
    return (
      <div className="publish">
        <Card
          title={
            <Breadcrumb items={[
              { title: <Link to={'/'}>首页</Link> },
              { title: articleId ? '编辑文章' : '新增文章' },
            ]}
            />
          }
        >
          <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ type: 1 }}
            onFinish={onFinish}
            form={form}
          >
            <Form.Item
              label="标题"
              name="title"
              rules={[{ required: true, message: '请输入文章标题' }]}
            >
              <Input placeholder="请输入文章标题" style={{ width: 400 }} />
            </Form.Item>
            <Form.Item
              label="频道"
              name="channel_id"
              rules={[{ required: true, message: '请选择文章频道' }]}
            >
              <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              {channelList.map(item => (
              <Option key={item.id} value={item.id}>
              {item.name}
              </Option>
            ))}

              </Select>
            </Form.Item>

            <Form.Item label="封面">
            <Form.Item name="type" onChange={onTypeChange}>
              <Radio.Group>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>

             
            </Form.Item >
            {imageNum > 0 && 
            <Upload
              name='image'
              listType="picture-card"
              showUploadList
              action={'http://geek.itheima.net/v1_0/upload'}
              onChange={onUploadChange}
              maxCount={imageNum}
              fileList={imageList}
            >
              <div style={{ marginTop: 8 }}>
                <PlusOutlined />
              </div>
            </Upload>}
            </Form.Item>

            <Form.Item
              label="内容"
              name="content"
              rules={[{ required: true, message: '请输入文章内容' }]}
            >
                {/*富文本编辑器 */}
            <ReactQuill
            className="publish-quill"
            theme="snow"
            placeholder="请输入文章内容"
            />
            </Form.Item>
  
            <Form.Item wrapperCol={{ offset: 4 }}>
              <Space>
                <Button size="large" type="primary" htmlType="submit">
                  发布文章
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>
      </div>
    )
  }
  
  export default Publish