Page({
	/*** 页面的初始数据*/
	data: {
		phone: '', //手机号初始值
		code: '', //验证码初始值
		codebtn: '发送验证码',
		disabled: false, //按钮初始值可用
	},
	/*** 生命周期函数--监听页面加载*/

	onLoad: function (options) {
		var phone = wx.getStorageSync('phone');
		console.log(phone);
		if (phone) {
			this.setData({
				phone: phone
			});
		}
	},
	// 获取输入账号 
	phone: function (e) {
		let phone = e.detail.value;
		let reg = /^[1][3,4,5,7,8][0-9]{9}$/;
		if (!reg.test(phone)) {
			wx.showToast({
				title: '手机号码格式不正确',
				icon: "none",
				duration: 2000
			})
			return false;
		}
		this.setData({
			phone: e.detail.value,
		})
	},
	//发送验证码
	sendcode() {
		let that = this;
		var phone = this.data.phone;
		wx.request({
			url: 'http://localhost:8080/code',
			method: 'post',
			data: {
				phoneNumber: phone, //手机号
			},
			header: {
				'content-type': 'application/json' // 默认值
			},
			success(res) {
				console.log(res);
				if (res.data.code == "1") {
					wx.showToast({
						title: '验证码已发送.请注意接收',
						icon: "success"
					})
					let time = 60;
					var timers = setInterval(function () {
						time--;
						if (time > 0) {
							that.setData({
								codebtn: time,
								disabled: true
							});
						} else {
							that.setData({
								codebtn: '发送验证码',
								disabled: false
							});
							clearInterval(timers)
						}
					}, 1000)
				}
			}
		})
	},

	// 登录处理
	login: function (evt) {
		// console.log(evt);
		console.log(evt.detail.value);
		//获得表单数据
		var objData = evt.detail.value;
		if (objData.phone) {
			// 同步方式存储表单数据
			wx.setStorageSync('phone', objData.phone);
		}
		var that = this;
		let val = evt.detail.value;
		console.log(val)
		if (val.phone == "") {
			wx.showToast({
				title: '请填写手机号码',
				icon: 'none',
				duration: 2000
			})
			return false;
		}
		if (val.code == "" || isNaN(val.code) || val.code.length > 6) {
			wx.showToast({
				title: '验证码格式不正确',
				icon: 'none',
				duration: 2000
			})
			return false;
		} else {
			wx.request({
				url: 'http://localhost:8080/Phone/login',
				method: 'post',
				data: {
					userCode: val.code, //获取input中的验证码
					phoneNumber: val.phone, //获取input中的手机号
				},
				header: {
					'content-type': 'application/json' // 默认值
				},
				success(res) {
					console.log(res);
					if (res.data.code == "1") {
						wx.navigateTo({
                          url: '../index/index'
                        })
					} else {
						wx.showToast({
							title: res.data.msg,
							icon: 'none',
							duration: 2000
						})
					}
				}
			})
		}
	}
})
