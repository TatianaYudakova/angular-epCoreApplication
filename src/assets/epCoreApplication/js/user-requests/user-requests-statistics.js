function showUserRequestsStatisticsModal() {
    $("#userRequestsStatisticsModal").modal("show");
}

function closeUserRequestsStatisticsModal() {
    $("#userRequestsStatisticsModal").modal("hide");
}

function getUserRequestsStatistics() {
    var dateFrom = $('#dateFrom').val();
    var dateTo = $('#dateTo').val();

    var request = new XMLHttpRequest();
    request.open("GET", _ctx+'public/user-requests-statistics/' + dateFrom + '/' + dateTo, true);
    request.responseType = "blob";
    request.onload = function () {
        if (this.status === 200) {
            var file = window.URL.createObjectURL(this.response);
            var a = document.createElement("a");
            a.href = file;
            a.download =  this.response.name || dateFrom + "_" + dateTo + "_requests.xls";
            document.body.appendChild(a);
            a.click();
        }
    };
    request.send();
}

