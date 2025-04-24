//封装获取频道列表的逻辑
import { useEffect, useState } from 'react';
import { getChannelAPI } from '@/apis/article'

function useChannel() {
    //获取频道列表
    //组件中用到的return出去
    const [channelList, setChannelList] = useState([])
    useEffect(() => {
        const getChannelList = async () => {
            const res = await getChannelAPI()
            // console.log(res.data.channels);
            //3.更新状态
            setChannelList(res.data.channels)
        }
        getChannelList()
    }, [])

    return{
        channelList,
    }
}

export {useChannel}