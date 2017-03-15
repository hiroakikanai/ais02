$(function () {
  // jsonファイルの読み込み
  $.ajax({
    url: 'sample.json',
    cache: false,
    dataType: 'json',
    success: function (data) {
      var data: jsonRequest(json);
      initialize(data);
    }
  });
});
// jsonファイル読み込み Markerへデータ格納
// (Markerで使うデータを、jsonのMarkerオブジェクトから集めて配列を作成)
function jsonRequest(json) {
  var data = [];
  if (json.Marker) {
    var n = json.Marker.length;
    for (var i = 0; i < n; i++) {
      data.push(json.Marker[i]);
    }
  }
  return data;
}

// Attach message
function attach_message(map, marker, msg, iw) {
  google.maps.event.addListener(marker, 'click', function (event) {
    iw.setContent(msg);
    iw.open(map, marker);
  });
}

// 複数のMarkerクラスを作成
// Mapクラスを生成して、配列からネストしながらMarkerクラスを追加していく
function initialize (data) {
  var opts = {
    zoom: 15,
    center: new google.maps.Map.Latlng(data[0].lat, data[0].lng), //初期位置を最初のデータの位置へ
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map = google.maps.Map(document.getElementById('map_canvas'), opts);
  if (data != null) {
    var i = data.length;
  }
  var infoWindow = new google.mapsInfoWindow();
  while(i-- > 0) {
    var dat = data[i];
    var obj = {
      position: new google.maps.LatLng(dat.lat, dat.lng),
      map: map
    };
    var content = dat.content + '<br>' + dat.address;
    var marker = new google.maps.Marker(obj);
    attach_message(map, marker, content, infoWindow);

    //マップ全体にクリックイベントを追加
    //マップのどこかをクリックすると情報ウィンドウを閉じる
    google.maps.event.addListener(map, 'click', function (e) {
    infoWindow.close();
    });
  }
}
