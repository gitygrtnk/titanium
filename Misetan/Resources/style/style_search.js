// ===============================================
// 検索画面 ページオブジェクト
// ===============================================
var pageObjects = {
	// ===============================================
	// ビュー(ページ全体)
	// ===============================================
	view : function() {
		return Ti.UI.createView({
			top    : 5,
			layout : 'vertical'
		});
	},
	// ===============================================
	// スクロールビュー
	// ===============================================
	scrollView : function() {
		return Ti.UI.createScrollView({
			height : '40%',
			layout : 'vertical',
			showVerticalScrollIndicator : true
		});
	},
	// ===============================================
	// ビュー(店舗詳細)
	// ===============================================
	viewDetail : function() {
		return Ti.UI.createView({
			top             : '5%',
			left            : '5%',
			width           : '90%',
			height          : '90%',
			backgroundColor : '#FFFFFF',
			borderColor     : '#000000',
			borderWidth     : 1,
			layout          : 'vertical'
		});
	},
	// ===============================================
	// 画像
	// ===============================================
	image : function(url) {
		return Ti.UI.createImageView({
			top    : 10,
			left   : 30,
			width  : 160,
			height : 'auto',
//			height : 120,
			image  : url
		});
	},
	// ===============================================
	// ラベル(タイトル用)
	// ===============================================
	labelTitle : function(text) {
		return Ti.UI.createLabel({
			top    : 5,
			left   : 10,
			buttom : 5,
			color  : '#000000',
			font   : { fontSize : 20 },
			text   : text
		});
	},
	// ===============================================
	// ラベル(見出し用)
	// ===============================================
	labelSub : function(text) {
		return Ti.UI.createLabel({
			top    : 5,
			left   : 15,
			buttom : 5,
			color  : '#000000',
			font   : { fontSize : 18 },
			text   : text
		});
	},
	// ===============================================
	// ラベル(標準)
	// ===============================================
	labelNormal : function(text) {
		return Ti.UI.createLabel({
			left  : 25,
			color : '#000000',
			font  : { fontSize : 15 },
			text  : text
		});
	},
	// ===============================================
	// ラベル(リンク付き)
	// ===============================================
	labelLink : function(text, url, winParent) {
		var label = Ti.UI.createLabel({
			left  : 25,
			font  : { fontSize : 15 },
			text  : text
		});
		if (url) {
			label.color = '#000060';
			// クリックでWebビュー表示
			label.addEventListener(
				'click',
				function(e) {
					var win = Ti.UI.createWindow();
					var webView = Ti.UI.createWebView({
						top : 43,
						url : url
					});
					// 閉じるボタン
					var btnClose = Ti.UI.createButton({
						top    : 0,
						left   : 0,
						width  : '100%',
						height : 50,
						font   : { fontSize : 15 },
						title  : 'Webビューを閉じる',
					});
					btnClose.addEventListener('click', function() { win.close(); });
					win.add(btnClose);
					win.add(webView);
					win.open();
				}
			);
		}
		return label;
	},
	// ===============================================
	// ボタン
	// ===============================================
	button : function(title, clickEvent) {
		var button = Ti.UI.createButton({
			top    : 5,
			width  : 100,
			height : 45,
			font   : { fontSize : 15 },
			title  : title
		});
		if (clickEvent) {
			button.addEventListener('click', clickEvent);
		}
		return button;
	},
	// ===============================================
	// 地図
	// ===============================================
	mapview : function() {
		return Ti.Map.createView({
			top       : 10,
			width     : '95%',
			height    : '45%',
			mapType   : Ti.Map.STANDARD_TYPE,
			animate   : true,
			regionFit : true
		});
	},
	// ===============================================
	// ピン
	// ===============================================
	annotation : function(title, lat, lng, pincolor, shopInfo) {
		return Ti.Map.createAnnotation({
			title     : null,
			animate   : true,
			subtitle  : (!shopInfo) ? title : title + '\n(クリックで詳細表示)',
			latitude  : lat,
			longitude : lng,
			pincolor  : pincolor,
			shopInfo  : shopInfo
		});
	}
};
