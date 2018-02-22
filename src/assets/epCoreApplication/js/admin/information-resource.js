var currentCategory = null;

var _alert = "<div class=\"alert alert-success alert-dismissible fade show\" role=\"alert\">" +
                       "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\n" +
                       "    <span aria-hidden=\"true\">&times;</span>\n" +
                       " </button>" ;

var _alertNo = "<div class=\"alert alert-danger alert-dismissible fade show\" role=\"alert\">" +
                       "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\n" +
                       "    <span aria-hidden=\"true\">&times;</span>\n" +
                       " </button>" ;
//$("#alert").hide();

var addSubElement = $("<a title='Добавить подкатегорию' class='btn btn-default btn-sm'><i class='fa fa-plus-square-o fa-lg text-primary' aria-hidden='true'></i></a>");
var editElement = $("<a title='Редактировать категорию' class='btn btn-default btn-sm'><i class='fa fa-pencil fa-lg text-primary' aria-hidden='true'></i></a>");
var v;

$(document).ready(function(){


        $('#categoryPublic').bootstrapToggle({
            on: public,
            off: private,
            offstyle: 'danger',
            width: '100%',
            onstyle: 'success'});

        $('#categoryPublic').on('change', function(){
            if($("#categoryPublic").prop("checked")){
                $('#rolesCategory').hide();
            }else $('#rolesCategory').show();
        })


    $('.list-group.checked-list-box .list-group-item').each(function () {
            $(this).css('cursor', 'pointer');
          /*  if ($.inArray(+$(this).attr('id'),role_ids)>-1) {
                $(this).find(':first-child').remove();
                $(this).addClass('checked').addClass('list-group-item-success');
                $(this).prepend($('<i class="fa fa-lg fa-check-square-o pull-right"></i>'));
            } */
            $(this).on('click', function () {
                        var $checked = $('<i class="fa fa-lg fa-check-square-o pull-right"></i>');
                        var $unchecked = $('<i class="fa fa-lg fa-square-o pull-right"></i>');
                        $(this).find(':first-child').remove();
                        if ($(this).hasClass('checked')) {
                            $(this).removeClass('checked').removeClass('list-group-item-success');
                            $(this).prepend($unchecked);
                        }
                        else {
                            $(this).addClass('checked').addClass('list-group-item-success');
                            $(this).prepend($checked);
                        }
                    });
        });

    $(function() {
        $("#categoryForm").jsForm({prefix:null});
        $("#entryForm").jsForm({prefix:null});
    });
    setEvents();



    $("#addEntry").click(function(){
        var draftEntry = {};
        draftEntry.title = 'Заголовок (черновик)';
        draftEntry.content = 'Содержание (черновик)';
        draftEntry.categoryId = currentCategory;

        $.ajax({
            type: 'POST',
            url: 'epCore/api/information-resource/entries',
            data: JSON.stringify(draftEntry),
            contentType: 'application/json; charset=utf-8',

            success: function(response) {
                $("#entryForm").jsForm("reset");
                $("#entryForm").jsForm("fill",response);
                $("#attachList").empty();
                $("#content").ckeditor();
                $("#entryModal").modal("show");
            }
        });
    });

    $("#entryDocument").change(function(){
        var formData = new FormData();
        formData.append('file', $(this).prop('files')[0]);
        $.ajax({
            type: 'POST',
            url: 'entry/'+$("#entryIdField").val()+'/documents',
            dataType: 'text',
            cache: false,
            contentType: false,
            processData: false,
            data: formData,
            success: function(response){
                doc=$.parseJSON(response);
                $("#entryDocument").val(null);
                $("#attachList").append($("<li><i class='fa fa-paperclip' aria-hidden='true'></i> <a href='document/"+doc.id+"' download='"+doc.name+"'>"+doc.name+"</a>"+
                    "&nbsp&nbsp&nbsp<i class='fa fa-remove text-danger' aria-hidden='true' onclick='deleteDoc("+doc.id+",$(this).parent());'></i>"+
                "</li>"));
                //need here to add element to form
            },
            error: function(request){
                   //alert("Недопустимый тип или размер файла");
                   alert(request.getResponseHeader('X-epCore-errorMessage'));

            }
        });
    })
});

function deleteDoc(id,element) {
    if (confirm(delFile)) {
        console.log('here blyat');
        $.ajax( {
            type: 'DELETE',
            url: 'document/'+id,
            contentType: 'application/json; charset=utf-8',
            success: function( response ) {
            }
        } );
        element.remove();
    }
}

function saveCategory() {
    /*var _name = $('#text').val();
    if(_name.match(/^[A-ZА-Я].+$/)==null){
            //alert("Поле \"Наименование\" - неверный формат");
            $("#alertNo").html(_alertNo + message1 + "</div>")
            return;
        }*/
    var _data = $('#categoryForm').serializeJSON();
    _data.isPublic = $("#categoryPublic").prop("checked")
    var method = '';
    var roles = [];
    if (!_data.id) method = 'POST'; else method = 'PUT';
    console.log(_data);
    $.ajax( {
        type: method,
        url: 'epCore/api/information-resource/categories',
        data: JSON.stringify(_data),
        contentType: "application/json; charset=utf-8",
        success: function( response ) {
            $("#categoryModal").modal("hide");
            $('.list-group.checked-list-box .list-group-item.checked').each(function () {
                 roles.push($(this).attr('id'));

             }
            );
                      $.ajax( {
                                type: "PATCH",
                                //url: 'information-resource/'+$("#category_id").val()+'/setRoles',
                                url: 'information-resource/'+ response.id +'/setRoles',
                                data: JSON.stringify(roles),
                                contentType: "application/json; charset=utf-8",
                                success: function( response ) {
                                   //alert("Категория успешно сохранена");
                                   $("#alert").html(_alert + message2 + "</div>")
                                }
                              } );

            if (method==="POST") {
                addToTree(response);
            }
            else {
                updateTree(response);
            }
 }
 } );
}

function updateEntry() {
    var _data = $('#entryForm').serializeJSON();
    $.ajax( {
        type: 'PUT',
        url: 'epCore/api/information-resource/entries',
        data: JSON.stringify(_data),
        contentType: 'application/json; charset=utf-8',

        success: function( response ) {
            closeEntryModal();
            refreshEntriesList();
        }
    } );
}

function addToTree(category) {
    element = $("<li data-catid='"+category.id+"' class='parent_li'><span><i class='fa fa-folder-open'></i>"+category.name+"</span><ul></ul></li>");
    if (category.parentCategoryId==null) {
        element.prependTo($(".tree > ul"));
    }
    else {
        element.prependTo($("[data-catid="+category.parentCategoryId+"]").children("ul"));
    }
    setEvents();
}


function setEvents() {
    $('.tree li.parent_li > span').on('click', function (e) {
    //Сюда вставляй обработчик для нажати на категорию... значение текущей категории в следующей строчке
        currentCategory = $(this).parent().data('catid');
        $("#addEntry").removeClass("hidden");
        refreshEntriesList();
        $(".tree li.parent_li > span").removeClass("list-group-item-success");
        $(this).addClass("list-group-item-success");
        addSubElement.data("catid",$(this).parent().data('catid')).appendTo($(this));
        editElement.data("catid",$(this).parent().data('catid')).insertAfter(addSubElement);
        addSubElement.on('click', function(e) {
                startAddChild($(this).data("catid"));
            }
        );
        editElement.on('click', function(e) {
                startEditCategory($(this).data("catid"));
            }
        );
    });
}

function addCategory() {
    showRoles = true;
    $("#categoryForm").jsForm("reset");
    $("#langSelect").val("ru");
    $("#categoryModal").modal("show");
}

function startAddChild(parentCategory) {
    $("#categoryForm").jsForm("reset");
    $("#modalParentCategoryId").val(parentCategory);
    $("#categoryModal").modal("show");
}

function startEditCategory(categoryId) {
    $.ajax( {
              type: "GET",
              url: 'epCore/api/information-resource/categories/'+categoryId,
              success: function( response ) {
                $("#categoryForm").jsForm("fill",response);
                $('.roleitem').each(function() {
                    var $unchecked = $('<i class="fa fa-lg fa-square-o pull-right"></i>');
                    $(this).find(':first-child').remove();
                    $(this).prepend($unchecked).removeClass('checked').removeClass('list-group-item-success');
                });
                response.roles.forEach(function(item) {
//                        console.log($("#"+item.id+".roleitem"));
                        var $checked = $('<i class="fa fa-lg fa-check-square-o pull-right"></i>');
                        $("#"+item.id+".roleitem").find(':first-child').remove();
                        $("#"+item.id+".roleitem").prepend($checked).addClass('checked').addClass('list-group-item-success');;
                });
                $("#categoryModal").modal("show");
              }
            } );
}


function closeCatModal() {
    $("#categoryModal").modal("hide");
}

function updateTree(category) {
    $("[data-catid="+category.id+"] > span").contents()[1].replaceWith(category.name);
}

function closeEntryModal() {
    $("#entryModal").modal("hide");
}

function refreshEntriesList() {
    $.ajax( {
                  type: "GET",
                  url: 'getEntriesByCategory/'+currentCategory,
                  success: function( response ) {
                    $("#entryList").html($(response).filter("#part").html());
                  }
                } );
}

function openEntry(id) {
    $("#attachList").empty();
    $.ajax( {
                  type: "GET",
                  url: 'entries/'+id,
                  success: function( response ) {
                    $("#entryForm").jsForm("fill",response);
                    $("#content").ckeditor();
                    $("#entryModal").modal("show");
                  }
           });
    $.ajax( {
                  type: "GET",
                  url: 'entry/'+id+'/documents',
                  success: function( response ) {
                        $.each(response,function(id,name) {
                            $("#attachList").append($("<li><i class='fa fa-paperclip' aria-hidden='true'></i> <a href='cms/document/"+id+"' download='"+name+"'>"+name+"</a>"+
                                "&nbsp&nbsp&nbsp<i class='fa fa-remove text-danger' aria-hidden='true' onclick='deleteDoc("+id+",$(this).parent());'></i>"+
                                "</li>"));
                            })

                  }
    });
}

function deleteEntry(id){
    if(confirm(delEntry)){
        $.ajax( {
                      type: "DELETE",
                      url: 'delete/entry/'+id,
                      success: function(response){
                        $("#part").remove();
                        refreshEntriesList();
                        //alert("Материал успешно удалён");
                      }
        });
    }
    //refreshEntriesList();
}

function downloadFile(){

   // window.location.replace("epCore/api/information-resource/download");
}

function removeCategory(id) {
    if(confirm("Вы действительно хотите удалить категорию и все вложенные материалы?")){
        var _data = $('#categoryForm').serializeJSON();
        $.ajax( {
                      type: "DELETE",
                      url: 'categories/'+_data.id,
                      success: function(response){
                            $("#categoryModal").modal("hide");
                            $("li[data-catid='" + _data.id +"']").remove();
                            showAlert("Категория успешно удалена...");
                      }
        });
    }
}

