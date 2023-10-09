function getJsonData(url) {
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.onload = function() {
            if (xhr.status === 200) {
                resolve(JSON.parse(xhr.responseText));
            } else {
                reject({
                    status: xhr.status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.onerror = function() {
            reject({
                status: xhr.status,
                statusText: xhr.statusText
            });
        };
        xhr.send();
    });
}

getJsonData("https://clubmagneto.com/wp-content/plugins/gamiwheel/inc/jsongen.php")
    .then(jsonData => {
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
            var status = adStatusCallback();
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "https://clubmagneto.com/wp-content/plugins/gamiwheel/inc/vidrewards.php", true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify({
                status: status,
            }));
        } else {
            alert("Kesalahan: Data JSON tidak valid");
        }
    })
    .catch(error => {
        alert("Kesalahan: " + error.statusText);
    });
