function getJsonData(url) {
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.onload = function() {
            if (xhr.status === 200) {
                resolve(JSON.parse(xhr.responseText));
            } else {
                reject(new Error(xhr.statusText));
            }
        };
        xhr.onerror = function() {
            reject(new Error(xhr.statusText));
        };
        xhr.send();
    });
}

// Contoh penggunaan promise:
getJsonData("https://clubmagneto.com/wp-content/plugins/gamiwheel/inc/applixir.json")
    .then(jsonData => {
         // Periksa kata-kata dalam jsonData.
        if (jsonData && jsonData.hasOwnProperty("zoneid")) {
            var options = {
                zoneId: jsonData.zoneid,
                devId: jsonData.accid,
                gameId: jsonData.gameid,
                userId: wp.currentUser.id,
                custom: "Video Rewards",
                adStatusCb: adStatusCallback,
            };

            invokeApplixirVideoUnit(options);

            // Kita perlu memanggil adStatusCallback sebagai promise, asumsikan ia adalah fungsi async.
            adStatusCallback()
                .then(status => {
                    var xhr = new XMLHttpRequest();
                    xhr.open("POST", "https://clubmagneto.com/wp-content/plugins/gamiwheel/inc/vidrewards.php", true);
                    xhr.setRequestHeader("Content-Type", "application/json");
                    xhr.send(JSON.stringify({
                        status: status,
                    }));
                })
                .catch(error => {
                    console.error("Failed to get status: ", error);
                });
        } else {
            alert("Kesalahan: Data JSON tidak valid");
        }

    })
    .catch(error => {
        console.error("Failed to get json data: ", error);
    });
