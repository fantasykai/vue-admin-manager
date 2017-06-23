/**
 * Created by kai.fantasy on 2017/6/22 0022.
 */
import Mock from 'mockjs';

const MsgData = [];

for (let i = 0; i < 82; i++) {
    MsgData.push(Mock.mock({
        _created: Mock.Random.datetime(),
        _updated: Mock.Random.datetime(),
        _id: Mock.Random.guid(),
        fromUserId: {
            "userId": Mock.Random.integer(10000000, 99999999),
            "nickname": Mock.Random.cname(),
        },
        'objectName|1': ['app:image', 'app:video'],
        msgTimestamp: Mock.Random.datetime(),
        content: {
            'path|1': ['https://ws1.sinaimg.cn/large/7108d6c2ly1fguwgogowkj20gt0gtduk.jpg', 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm'],
            "thumbnail": ''
        },
    }));
}

export {MsgData};
