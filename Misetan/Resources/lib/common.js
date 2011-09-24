// ===============================================
// 共通定数・関数ファイル
// ===============================================
// 共通オブジェクト初期化
if (!Ti.App.MYLIB) {
	Ti.App.MYLIB = {};
}

// ===============================================
// 共通定数
// ===============================================
if (!Ti.App.MYLIB.common) {
	Ti.App.MYLIB.common = {};
}
// APIキー(https://webservice.recruit.co.jp/register/index.htmlで発行)
// ※github登録の為、空文字列に設定済(アプリ動作の為にはAPIキーが必要)
Ti.App.MYLIB.common.apiKey = '';
// 最大取得店舗数(1-100)
Ti.App.MYLIB.common.apiCount = '10';
// 検索範囲(1: 300m, 2: 500m, 3: 1000m, 4: 2000m, 5: 3000m)
Ti.App.MYLIB.common.apiRange = '3';
// 緯度・経度のデフォルト値(現在地を取得できなかった場合に使用)
Ti.App.MYLIB.common.defaultLat = '35.658704';
Ti.App.MYLIB.common.defaultLng = '139.745408';
// グルメサーチAPI URL
Ti.App.MYLIB.common.apiGourmetUrl = 
	'http://webservice.recruit.co.jp/hotpepper/gourmet/v1/' +
	'?key='   + Ti.App.MYLIB.common.apiKey + 
	'&count=' + Ti.App.MYLIB.common.apiCount +
	'&range=' + Ti.App.MYLIB.common.apiRange +
	'&format=json';
// ジャンルマスタAPI URL
Ti.App.MYLIB.common.apiGenreUrl = 
	'http://webservice.recruit.co.jp/hotpepper/genre/v1/' +
	'?key='   + Ti.App.MYLIB.common.apiKey +
	'&format=json';
// 料理カテゴリマスタAPI URL
Ti.App.MYLIB.common.apiFoodUrl = 
	'http://webservice.recruit.co.jp/hotpepper/food_category/v1/' +
	'?key='   + Ti.App.MYLIB.common.apiKey +
	'&format=json';

// ===============================================
// 共通関数
// ===============================================
// HTTPリクエスト
Ti.App.MYLIB.httpRequest = function(method, url, callback) {
	var xhr = Ti.Network.createHTTPClient();
	xhr.open(method, url);
	xhr.onload = function() {
		callback(xhr.responseText);
	};
	xhr.send();
}
// ダイアログ表示
Ti.App.MYLIB.showAlert = function(title, message) {
	var alertDialog = Ti.UI.createAlertDialog({
	    title       : title,
	    message     : message,
	    buttonNames : ['OK']
	});
	alertDialog.show();
};

// ===============================================
// ホットペッパーAPI利用
// ===============================================
if (!Ti.App.MYLIB.hotpepper) {
	Ti.App.MYLIB.hotpepper = {};
}
// グルメサーチAPI
Ti.App.MYLIB.hotpepper.getShopInfo = function(config, callback) {
	var url = Ti.App.MYLIB.common.apiGourmetUrl;
	if (config) {
		url += (config.genre)   ? ('&genre='   + config.genre)   : '';
		url += (config.food)    ? ('&food='    + config.food)    : '';
		url += (config.keyword) ? ('&keyword=' + config.keyword) : '';
		url += (config.lat)     ? ('&lat='     + config.lat)     : '';
		url += (config.lng)     ? ('&lng='     + config.lng)     : '';
	}
	Ti.App.MYLIB.httpRequest('GET', url, callback);
}
// ジャンルマスタAPI
Ti.App.MYLIB.hotpepper.getGenreMaster = function(callback) {
	Ti.App.MYLIB.httpRequest('GET', Ti.App.MYLIB.common.apiGenreUrl, callback);
}
// 料理カテゴリマスタAPI
Ti.App.MYLIB.hotpepper.getFoodMaster = function(callback) {
	Ti.App.MYLIB.httpRequest('GET', Ti.App.MYLIB.common.apiFoodUrl, callback);
}
