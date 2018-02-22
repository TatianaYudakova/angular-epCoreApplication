

$(function () {
    initTree();
});

function initTree() {
    $('.tree li:has(ul)').addClass('parent_li').find(' > span').attr('title', 'Свернуть');
    $('.tree li.parent_li > span').on('click', function (e) {
        var children = $(this).parent('li.parent_li').find(' > ul > li');
        if (children.is(":visible")) {
            children.hide('fast');
            $(this).attr('title', expand).find(' > i').addClass('fa-folder').removeClass('fa-folder-open');
            //$(this).find(' > i').addClass('fa-folder').removeClass('fa-folder-open');
        } else {
            children.show('fast');
            $(this).attr('title', collapse).find(' > i').addClass('fa-folder-open').removeClass('fa-folder');
            //$(this).find(' > i').addClass('fa-folder-open').removeClass('fa-folder');
        }
        e.stopPropagation();
    });
}