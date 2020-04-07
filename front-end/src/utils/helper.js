/**
* 获取cookie
* @param {String} str 
* @return {undefined/String/Number} 对应的cookie值
*/
function getCookie() {
  const cookieObject = {};
  const cookie = document.cookie;
  if (cookie === '') {
    return undefined;
  }
  const cookieArr = cookie.split('; ');
  for (let i = 0; i < cookieArr.length; i += 1) {
    const item = cookieArr[i];
    const index = item.indexOf('=');
    const name = item.substring(0, index);
    const value = item.substring(index + 1);
    cookieObject[name] = value;
  }
  return cookieObject;
}

/** 生成列标签和内容的layout函数 */
function getFormLayout(labelCol, wrapperCol) {
  return (
    {
      labelCol: {
        xs: { span: 24 },
        sm: { span: labelCol },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: wrapperCol },
      },
    }
  );
}

function obj2query(data) {
  let query = '';
  if (!data) return query;
  for (const i in data) {
    if (hasOwnProperty.call(data, i)) {
      query += `${i}=${encodeURIComponent(data[i])}&`;
    }
  }
  // remove last `&`
  return query.replace(/&$/, '');
}

export {
  getFormLayout,
  obj2query,
  getCookie,
};
