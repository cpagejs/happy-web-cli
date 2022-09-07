
function sleep(seconed) {
  return new Promise((res, rej) => {
    setTimeout(res, seconed);
  });
}

function reduceMenuList(list, path = "") {
  const data = [];
  list.forEach((i) => {
    const {
      children,
      ...item
    } = i;
    item.parentPath = path;
    if (children) {
      const childList = reduceMenuList(children, path + i.path);
      data.push(...childList);
    }
    data.push(item);
  });
  return data;
}

export {
  sleep,
  reduceMenuList,
};
