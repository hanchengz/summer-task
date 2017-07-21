/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
 window.onload = function(){
	var aqi_city = document.getElementById('aqi-city-input');
	var aqi_value = document.getElementById('aqi-value-input');
	var add_btn = document.getElementById('add-btn');
	var aqiData = {};
	/**
	 * 从用户输入中获取数据，向aqiData中增加一条数据
	 * 然后渲染aqi-list列表，增加新增的数据
	 */
	function addAqiData() {
		var city_name = aqi_city.value;
		var aqi_num = aqi_value.value;
		aqiData[city_name] = aqi_num;
		console.log(city_name,aqi_num);
		console.log(aqiData);
	}
	add_btn.onclick = addAqiData;
	/**
	 * 渲染aqi-table表格
	 */
	function renderAqiList() {

	}

	/**
	 * 点击add-btn时的处理逻辑
	 * 获取用户输入，更新数据，并进行页面呈现的更新
	 */
	function addBtnHandle() {
	  addAqiData();
	  renderAqiList();
	}

	/**
	 * 点击各个删除按钮的时候的处理逻辑
	 * 获取哪个城市数据被删，删除数据，更新表格显示
	 */
	function delBtnHandle() {
	  // do sth.

	  renderAqiList();
	}

	function init() {

	  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数

	  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数

	}

	init();

}