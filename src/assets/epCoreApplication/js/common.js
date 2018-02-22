var _ctx = $("meta[name='ctx']").attr("content");
// Prepend context path to all jQuery AJAX requests
$.ajaxPrefilter(function( options, originalOptions, jqXHR ) {
    if (!options.crossDomain) {
        options.url = _ctx + options.url;
    }
});
$.extend($.fn.bootstrapTable.defaults, $.fn.bootstrapTable.locales["ru-RU"]);

function replaceUrlParam(url, paramName, paramValue){
    if(paramValue == null)
        paramValue = '';
    var pattern = new RegExp('\\b('+paramName+'=).*?(&|$)')
    if(url.search(pattern)>=0){
        return url.replace(pattern,'$1' + paramValue + '$2');
    }
    url = url.replace(/\?$/,'');
    return url + (url.indexOf('?')>0 ? '&' : '?') + paramName + '=' + paramValue
}

$.ajax( {
              type: "GET",
              url: '..'+_ctx+'isTourAgent',
              success: function( response ) {
                    if(response == true){
                        $(".is-ta").hide();
                    }
              }
    } );

$.ajax( {
                  type: "GET",
                  url: '..'+_ctx+'open/operatorSelect',
                  success: function( response ) {
                        $("#tourOperatorSelectDiv").html($(response).filter("#part").html());
                  }
                } );

function createNewVoucher() {

        $.ajax( {type: "GET",
                      url: '..'+_ctx+'vouchers/new',
                      success: function( response ) {
                        window.location.replace(_ctx+"vouchers/"+response.id+"/auth/"+response.auth);
                      },
                      statusCode: {
                        403: function(){
                            alert(messageUnableRegistry);
                        }
                      }
        } );

}

$('[data-toggle=offcanvas]').click(function() {
    $('.row-offcanvas').toggleClass('active');
    $('.collapse').toggleClass('in').toggleClass('hidden-xs').toggleClass('visible-xs');
});

function showLoader() {
    $(".loader").removeClass("hidden");
    $(".overlay").removeClass("hidden");
};

function hideLoader() {
    $(".loader").addClass("hidden");
    $(".overlay").addClass("hidden");
};
/*$("#overlay").click(function() {
    $(this).hide();
});*/

function request() {
    window.location.replace(_ctx+"public/user-requests");
}

function searchVoucher(){
    var numberVoucher = $("#numberVoucher").val();
    if(numberVoucher == "" || numberVoucher == undefined){
        alert(messageNoInputNumberVoucher);
        return;
    }
   $.ajax( {
                         type: "GET",
                         url: '..'+_ctx+'/voucher/number/' + numberVoucher,
                         success: function( response ) {
                           window.location.replace(_ctx+"vouchers/"+response.id+"/auth/"+response.auth);
                         },
                         error: function(){
                               alert(messageVoucherNotFound);

                         }
           } );
}


$(".languageicon").on("click",function() {
    if (!window.location.search.trim()) {
        window.location.replace(window.location.href+"?lang="+$(this).attr("lang")+irlangstr);
    }
    else {
        window.location.replace(replaceUrlParam(window.location.href,"lang",$(this).attr("lang")));
        window.location.replace(replaceUrlParam(window.location.href,"locale",irlang));
    }

})

function change_lang(lang) {
    irlang=null; irlangstr='';
    if (lang==='ru') {
    irlang='ru';
    }
    else {
        if (lang==='eng') {
            irlang='en';
        }
    }
    if (irlang!=null) {
        irlangstr="&locale="+irlang;
    }
    if (!window.location.search.trim()) {
        console.log(1);
        window.location.replace(window.location.href+"?lang="+lang+irlangstr);
    }
    else {
        console.log(2+irlang);
        url = replaceUrlParam(replaceUrlParam(window.location.href,"lang",lang),"locale",irlang);
        //window.location.replace(replaceUrlParam(window.location.href,"lang",lang));
        //window.location.replace(replaceUrlParam(window.location.href,"locale",irlang));
        window.location.replace(url);
    }
}

$(".languagebutton").on("click",function() {
    //window.location.replace(window.location.pathname+"?lang="+$(this).attr("lang"));
    if (!window.location.search.trim()) {
        window.location.replace(window.location.href+"?lang="+$(this).attr("lang"));
    }
    else {
        window.location.replace(replaceUrlParam(window.location.href,"lang",$(this).attr("lang")));
    }

})

function showAlert(message){
    $("#alertBoxMessage").html(message);
    $("#alertBox").fadeTo(1000,1).delay(2000).fadeTo(3000,0)
}

function rusificateNReco(){
    $(".pvtRenderer option[value='Table']").html(table);
    $(".pvtRenderer option[value='Table Barchart']").remove();
    $(".pvtRenderer option[value='Heatmap']").html(heatmap);
    $(".pvtRenderer option[value='Row Heatmap']").remove();
    $(".pvtRenderer option[value='Col Heatmap']").remove();
    $(".pvtRenderer option[value='Line Chart']").remove();
    $(".pvtRenderer option[value='Bar Chart']").html(barChart);
    $(".pvtRenderer option[value='Stacked Bar Chart']").html(stackedBarChart);
    $(".pvtRenderer option[value='Area Chart']").remove();
    $(".pvtRenderer option[value='Scatter Chart']").remove();

    $(".pvtAggregator option[value='Количество']").html(quantity);
    $(".pvtAggregator option[value='Количество уникальных значений']").html(numberUniqueValues);
    $(".pvtAggregator option[value='Список уникальных значений']").html(listUniqueValues);
    $(".pvtAggregator option[value='Сумма']").html(sum);
    $(".pvtAggregator option[value='Среднее']").html(average);
    $(".pvtAggregator option[value='Минимальное']").html(minimal);
    $(".pvtAggregator option[value='Максимальное']").html(maximum);
    $(".pvtFixedHeader div[title='Totals']").each(function(){
        $(this).html("Итого");
    });
    $(".pvtTable.pvtFixedHeader").css("width", "");
}
