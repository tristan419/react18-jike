import { Layout, Menu, Popconfirm } from 'antd'
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined,
} from '@ant-design/icons'
import './index.scss'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

const { Header, Sider } = Layout

const items = [
  {
    label: '首页',
    key: '/',
    icon: <HomeOutlined />,
  },
  {
    label: '文章管理',
    key: '/Article',
    icon: <DiffOutlined />,
  },
  {
    label: '创建文章',
    key: '/Publish',
    icon: <EditOutlined />,
  },
]

const GeekLayout = () => {
  const navigate = useNavigate()
  const onMenuclick = (router) => {
    const path = router.key
    navigate(path)
  }

  //反向高亮
  //1.获取当前的路由路径
  //2.遍历items,找到对应的key值
  //3.设置当前的key值
  const currentPath = useLocation()
  // console.log(currentPath.pathname)

  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">柴柴老师</span>
          <span className="user-logout">
            <Popconfirm title="是否确认退出？" okText="退出" cancelText="取消">
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            theme="dark"
            selectedKeys={[currentPath.pathname]}
            onClick={onMenuclick}
            items={items}
            style={{ height: '100%', borderRight: 0 }}></Menu>
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          {/*二级路由的出口*/}
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  )
}
export default GeekLayout