// ===============================================
// 検索画面
// ===============================================
Ti.include('../style/style_search.js');
var win = Ti.UI.currentWindow;

// ===============================================
// オブジェクト配置
// ===============================================
var view = pageObjects.view();
var mapview = pageObjects.mapview();
var scrollView = pageObjects.scrollView();
var btnSearch = pageObjects.button('再検索');
mapview.hide();
view.add(pageObjects.labelLink('Powered by ホットペッパー Webサービス', 'http://webservice.recruit.co.jp/'));
view.add(mapview);
view.add(btnSearch);
view.add(scrollView);
win.add(view);

// ===============================================
// 検索結果表示処理
// ===============================================
var display = function() {
	Ti.Geolocation.purpose = '店舗検索';
	Ti.Geolocation.getCurrentPosition(
		function(e) {
			// DB設定値取得
			var config = Ti.App.MYLIB.configDb.getConfig();
			if (!config) {
				config = new Ti.App.MYLIB.ConfigDAO('', '', '', Ti.App.MYLIB.common.defaultLat, Ti.App.MYLIB.common.defaultLng);
				Ti.App.MYLIB.configDb.setConfig(config);
			}
			// 位置情報取得
			if (e.success && !e.error)　{
				config.lat = e.coords.latitude;
				config.lng = e.coords.longitude;
			}
			else {
				Ti.App.MYLIB.showAlert('エラー', '現在の位置情報を取得できませんでした。\nデフォルトの位置情報を使用します。');
			}
			
			Ti.App.MYLIB.hotpepper.getShopInfo(
				config,
				function(res) {
					var jsonShop = JSON.parse(res);
					var aryShopInfo = jsonShop.results.shop;
					
					// スクロールビューの再作成
					view.remove(scrollView);
					scrollView = pageObjects.scrollView();
					
					// ピンの全削除
					mapview.removeAllAnnotations();
					
					// ピン追加(現在地)
					mapview.addAnnotation(pageObjects.annotation('現在地', config.lat, config.lng, Ti.Map.ANNOTATION_RED, null));
					// ピン追加(店舗)
					for (var i = 0; i < aryShopInfo.length; i++) {
						mapview.addAnnotation(pageObjects.annotation('[' + (i+1) + '] ' + aryShopInfo[i].name, aryShopInfo[i].lat, aryShopInfo[i].lng, Ti.Map.ANNOTATION_GREEN, aryShopInfo[i]));
					}
					// イベント追加(店舗のピンをクリック時に詳細ウインドウ表示)
					mapview.addEventListener(
						'click',
						function(e) {
							var pinClicked = e.annotation;
							if (pinClicked && pinClicked.shopInfo) {
								var viewDetail = pageObjects.viewDetail();
								mapview.touchEnabled = false;
								viewDetail.add(pageObjects.labelTitle('～' + pinClicked.shopInfo.genre['catch'] + '～\n' + pinClicked.shopInfo.name));
								viewDetail.add(pageObjects.image(pinClicked.shopInfo.photo.mobile.l));
								viewDetail.add(pageObjects.labelNormal('【画像提供：ホットペッパー グルメ】'));
								viewDetail.add(pageObjects.labelSub('< 紹介 >'));
								viewDetail.add(pageObjects.labelNormal(pinClicked.shopInfo['catch']));
								viewDetail.add(pageObjects.labelSub('< ホームページ >'));
								viewDetail.add(pageObjects.labelLink(pinClicked.shopInfo.urls.pc + ' (クリックでアクセス)', pinClicked.shopInfo.urls.pc));
								viewDetail.add(pageObjects.labelSub('< 住所 >'));
								viewDetail.add(pageObjects.labelNormal(pinClicked.shopInfo.address));
								viewDetail.add(pageObjects.labelSub('< アクセス >'));
								viewDetail.add(pageObjects.labelNormal(pinClicked.shopInfo.mobile_access));
								viewDetail.add(pageObjects.labelSub('< 営業時間 >'));
								viewDetail.add(pageObjects.labelNormal(pinClicked.shopInfo.open));
								viewDetail.add(pageObjects.labelSub('< 定休日 >'));
								viewDetail.add(pageObjects.labelNormal(pinClicked.shopInfo.close));
								viewDetail.add(pageObjects.button('閉じる', function() { win.remove(viewDetail); mapview.touchEnabled = true; }));
								win.add(viewDetail);
							}
						}
					)
					// マップの中心を現在地に設定
					mapview.setLocation(
						{
							latitude       : config.lat,
							longitude      : config.lng,
							latitudeDelta  : 0.01,
							longitudeDelta : 0.01
						}
					);
					// 検索結果表示
					scrollView.add(pageObjects.labelTitle(
						(aryShopInfo.length >= 1) ? aryShopInfo.length + '件のお店が見つかりました。' : '条件を満たすお店が見つかりませんでした。'
					));
					// 店舗名の一覧表示
					for (var i = 0; i < aryShopInfo.length; i++) {
						scrollView.add(pageObjects.labelSub('[' + (i+1) + '] ' + aryShopInfo[i].name));
						scrollView.add(pageObjects.labelNormal(aryShopInfo[i]['catch']));
					}
					// 結果表示
					mapview.show();
					view.add(scrollView);
				}
			);
		}
	);
};

btnSearch.addEventListener('click', display);
display();
