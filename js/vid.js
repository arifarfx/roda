function getJsonData(url) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            return JSON.parse(xhr.responseText);
        } else {
            return null;
        }
    };
    xhr.send();
}

// Dapatkan data JSON
var jsonData = getJsonData("https://clubmagneto.com/wp-content/plugins/gamiwheel/inc/applixir.json");

// Periksa apakah variabel jsonData terdefinisi dan memiliki properti zoneid
if (jsonData && jsonData.hasOwnProperty("zoneid")) {
    // Ganti nilai nnnn
    var options = {
        zoneId: jsonData.zoneid,
        devId: jsonData.accid,
        gameId: jsonData.gameid,
        userId: wp.currentUser.id,
        custom: "Video Rewards",
        adStatusCb: adStatusCallback,
    };

    // Invoke Applixir Video Unit
    invokeApplixirVideoUnit(options);

    // Dapatkan status Applixir
    var status = adStatusCallback();

    // Kirim data log ke file vidrewards.php
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://clubmagneto.com/wp-content/plugins/gamiwheel/inc/vidrewards.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify({
        status: status,
    }));
} else {
    // Tampilkan pesan kesalahan
    alert("Kesalahan: Data JSON tidak valid");
}
