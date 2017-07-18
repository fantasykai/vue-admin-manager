/**
 * Created by kai.fantasy on 2017/7/18 0018.
 */
import moment from 'moment';
import channelCode from 'static/channelCode.json';
/**
 *
 * 发送消息数，不存在则展示0
 * @param sendNum
 * @returns {number}
 */
export function formatSendNum(sendNum) {
    return sendNum ? sendNum : 0;
}
/**
 * 格式化化bluid，如果存在bluid，则展示bluid，不存在，则展示seqid
 *
 * @param row
 * @returns {string}
 */
export function formatBluId(row) {
    let bluId = '';
    let userInfo = JSON.stringify(row);
    let {bluid, seqid} = JSON.parse(userInfo);
    if (bluid) {
        bluId = bluid
    } else {
        bluId = seqid
    }
    return bluId;
}

/**
 * 格式化为北京时间
 * @param date
 * @returns {string}
 */
export function formatBeijingDate(date) {
    let beijingDate = '';
    if (date) {
        beijingDate = moment(date).add(8, 'hours').format('YYYY-MM-DD HH:mm:ss')
    }
    return beijingDate;
}

/**
 * 将字符串转为json格式展示
 * @param str
 * @returns {*}
 */
export function formattedJson(str) {
    let jsonStr;
    if (str) {
        jsonStr = JSON.stringify(str)
    } else {
        jsonStr = '无'
    }
    return jsonStr;
}

/**
 * 格式化结果类型
 * @param str
 * @returns {*}
 */
export function formatResultType(str) {
    let type;
    if ("" === str) {
        type = 'gray';
    }
    if (str) {
        type = 'success';
    }
    return type
}

/**
 * 星座对应中文
 * @param index
 * @returns {string}
 */
export function formattedConstellation(index) {

    let constellationStrings = ["性感的白羊", "傲娇的金牛", "机智的双子", "温暖的巨蟹", "万人迷的狮子"
        , "高贵的处女", "美味的天秤", "魅惑的天蝎", "色色的射手", "硬核的摩羯", "鬼马的水瓶", "温柔的双鱼", "温柔的双鱼"];

    return constellationStrings[index];

}

/**
 * 格式化生日信息
 * @param str
 * @returns {string}
 */
export function formattedBirthday(str) {
    let birthday = '';
    if (str) {
        birthday = str.split(" ")[0];
    }
    return birthday;
}

/**
 * 格式化性别
 * @param sex
 * @returns {string}
 */
export function formattedSex(sex) {
    let sexName = '不明';
    if (1 === sex) {
        sexName = '男';
    } else if (2 === sex) {
        sexName = '女';
    }
    return sexName;
}
/**
 * 格式化恋爱倾向
 * @param sexual
 * @returns {string}
 */
export function formattedSexual(sexual) {
    let sexualName = '不明';
    if (1 === sexual) {
        sexualName = '来个汉子'
    } else if (2 === sexual) {
        sexualName = '来个妹子'
    } else if (3 === sexual) {
        sexualName = '人类'
    }
    return sexualName;
}

/**
 * 格式化用户地址
 * @param address
 * @returns {string}
 */
export function formattedDetail(address) {
    let addrJson = JSON.stringify(address);
    let addr = '';
    if (addrJson) {
        let {item0, item1, item2} = JSON.parse(addrJson);
        if (item0) {
            addr += item0.province + '/' + item0.city + item0.region + '/'
        }
        if (item1) {
            addr += item1.detail + '/'
        }
        if (item2) {
            addr += item2.detail + '/'
        }
    }
    return addr;
}
/**
 * 格式化学校
 * @param schools
 * @returns {string}
 */
export function formattedSchools(schools) {
    let schoolJson = JSON.stringify(schools);
    let schoolName = '';
    if (schoolJson) {
        let {item0} = JSON.parse(schoolJson);

        if (item0) {
            schoolName += item0.city + '/' + item0.region + '/' + item0.school
        }
    }
    return schoolName
}
/**
 * 格式化工作信息
 * @param job
 * @returns {string}
 */
export function formattedJob(job) {
    let jobJson = JSON.stringify(job);
    let jobName = '';
    if (jobJson) {
        let {c} = JSON.parse(jobJson);
        if (c) {
            jobName = c;
        }
    }
    return jobName;
}
/**
 * 格式用户最近的登录时间
 * @param client
 * @returns {string}
 */
export function formattedClientLastLoginTime(client) {

    let lastLoginTime = '';

    let clientJson = JSON.stringify(client);

    let {last} = JSON.parse(clientJson);

    if (last) {
        lastLoginTime = last._created;
    }
    return lastLoginTime;
}
/**
 * 格式化用户软件版本
 * @param client
 * @returns {string}
 */
export function formattedClientLastBluVer(client) {

    let bluVer = '';

    let clientJson = JSON.stringify(client);

    let {last} = JSON.parse(clientJson);

    if (last) {
        bluVer = last.bluVer;
    }

    return bluVer;
}
/**
 * 格式化用户品牌
 * @param client
 * @returns {string}
 */
export function formattedClientLastBrand(client) {

    let brand = '';
    let clientJson = JSON.stringify(client);
    let {last} = JSON.parse(clientJson);
    if (last) {
        brand = last.brand;
    }
    return brand;
}
/**
 * 格式化用最近使用的设备名称
 * @param client
 * @returns {string}
 */
export function formattedClientLastDeviceName(client) {
    let deviceName = '';
    let clientJson = JSON.stringify(client);
    let {last} = JSON.parse(clientJson);
    if (last) {
        deviceName = last.deviceName;
    }
    return deviceName;
}
/**
 * 格式化用户最近使用的系统版本
 * @param client
 * @returns {string}
 */
export function formattedClientLastSysVer(client) {

    let sysVer = '';
    let clientJson = JSON.stringify(client);

    let {last} = JSON.parse(clientJson);

    if (last) {
        sysVer = last.sysVer;
    }
    return sysVer;
}
/**
 *  格式化用户最近登录的客户端信息
 * @param client
 * @returns {string}
 */
export function formattedClientLastSysDesc(client) {
    let sysDesc = '';
    let clientJson = JSON.stringify(client);
    let {last} = JSON.parse(clientJson);
    if (last) {
        sysDesc = last.sysDesc;
    }
    return sysDesc;
}
/**
 * 格式化渠道字段
 * @param row
 * @returns {string}
 */
export function formattedChannel(row) {

    let channelName = '';

    let userInfo = JSON.stringify(row);

    let {channel, from} = JSON.parse(userInfo);

    if (from) {
        let channelId = from.channel;
        if (channelId) {
            channelName = null === channelCode[channelId] ? channelId : channelCode[channelId]
        }

    } else if (channel) {
        channelName = null === channelCode[channel] ? channel : channelCode[channel];
    }

    return channelName;
}
/**
 * 格式化用户表的 from字段
 * @param row
 * @returns {string}
 */
export function formattedFrom(row) {

    let userInfo = JSON.stringify(row);

    let {from} = JSON.parse(userInfo);

    let userId = '';

    if (from) {
        userId = from.user_id
    }
    return userId;
}
/**
 * 格式化第一次申请理由
 * @param row
 * @returns {string}
 */
export function formatWhyFirst(row) {
    let friendInfo = JSON.stringify(row);
    let {why} = JSON.parse(friendInfo);
    let firstWhy = '';
    if (why) {
        if (why.length > 0) {
            firstWhy = why[0];
        }
    }
    return firstWhy;
}
