// ===============================================
// 設定画面
// ===============================================
Ti.include('../style/style_config.js');
var win = Ti.UI.currentWindow;

// ===============================================
// オブジェクト生成
// ===============================================
// DB設定値取得
var currentConfig = Ti.App.MYLIB.configDb.getConfig();
if (!currentConfig) {
	currentConfig = new Ti.App.MYLIB.ConfigDAO('', '', '', Ti.App.MYLIB.common.defaultLat, Ti.App.MYLIB.common.defaultLng);
	Ti.App.MYLIB.configDb.setConfig(currentConfig);
}
// ジャンル選択リスト
var pickGenre = pageObjects.picker();
Ti.App.MYLIB.hotpepper.getGenreMaster(
	function(res) {
		var genreInfo = JSON.parse(res).results.genre;
		pickGenre.setListItems(genreInfo, 'name', 'code');
		pickGenre.selectRowValue(currentConfig.genre);
	}
);
// 料理カテゴリ選択リスト
var pickFood = pageObjects.picker();
Ti.App.MYLIB.hotpepper.getFoodMaster(
	function(res) {
		var foodInfo = JSON.parse(res).results.food_category;
		pickFood.setListItems(foodInfo, 'name', 'code');
		pickFood.selectRowValue(currentConfig.food);
	}
);
// キーワード入力ボックス
var textKeyword = pageObjects.textField();
textKeyword.value = currentConfig.keyword;
// 保存ボタン
var btnSave = pageObjects.button('保存', function() {
	var config = new Ti.App.MYLIB.ConfigDAO(
		pickGenre.getSelectedRow(0).custom_item,
		pickFood.getSelectedRow(0).custom_item,
		textKeyword.value,
		Ti.App.MYLIB.common.defaultLat,
		Ti.App.MYLIB.common.defaultLng
	);
	Ti.App.MYLIB.configDb.setConfig(config);
	Ti.App.MYLIB.showAlert('完了', '設定を保存しました。');
});

// ===============================================
// オブジェクト配置
// ===============================================
var view = pageObjects.view();
view.add(pageObjects.label('ジャンル'));
view.add(pickGenre);
view.add(pageObjects.label('料理カテゴリ'));
view.add(pickFood);
view.add(pageObjects.label('キーワード'));
view.add(textKeyword);
view.add(btnSave);
win.add(view);
