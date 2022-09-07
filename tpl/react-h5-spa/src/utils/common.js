/**
 * 获取url中的参数
 * @param {*} name 
 * @returns 
 */
export function urlParse(name) {
	const query = window.location.search.substring(1);
	const names = query.split("&");
	for (let i = 0; i < names.length; i++) {
		let pair = names[i].split("=");
		if (pair[0] === name) {
			return pair[1];
		}
	}
	return (false);
}