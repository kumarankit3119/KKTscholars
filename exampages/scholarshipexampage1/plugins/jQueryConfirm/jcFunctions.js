function SuccessMessageCallBack(msg, callBack) {
    $.confirm({
        title: "Alert!",
        content: msg,
        type: "green",
        useBootstrap: !1,
        boxWidth: "400px",
        backgroundDismiss: !1,
        backgroundDismissAnimation: "shake",
        buttons: {
            ok: {
                btnClass: "btn-primary",
                action: callBack
            }
        }
    })
}

function SuccessMessage(msg) {
    $.alert({
        title: "Alert!",
        content: msg,
        useBootstrap: !1,
        boxWidth: "400px",
        type: "green",
        backgroundDismiss: !1,
        backgroundDismissAnimation: "shake",
        buttons: {
            ok: {
                btnClass: "btn-primary"
            }
        }
    })
}

function ErrorMessage(msg) {
    $.alert({
        title: "Error!",
        content: msg,
        type: "red",
        useBootstrap: !1,
        boxWidth: "400px",
        backgroundDismiss: !1,
        backgroundDismissAnimation: "shake",
        buttons: {
            ok: {
                btnClass: "btn-primary"
            }
        }
    })
}

function ErrorMessageCallBack(msg, callBack) {
    $.confirm({
        title: "Error!",
        content: msg,
        type: "red",
        useBootstrap: !1,
        boxWidth: "500px",
        backgroundDismiss: !1,
        backgroundDismissAnimation: "shake",
        buttons: {
            ok: {
                btnClass: "btn-primary",
                action: callBack
            }
        }
    })
}

function ConfirmCallBack(msg, callBack) {
    $.confirm({
        title: "Confirm!",
        content: msg,
        backgroundDismiss: !1,
        boxWidth: "500px",
        useBootstrap: !1,
        backgroundDismissAnimation: "shake",
        type: "gray",
        buttons: {
            yes: {
                btnClass: "btn-primary",
                action: callBack
            },
            cancel: {
                btnClass: "btn-primary"
            }
        }
    })
}

function SuccessCallBackMedium(msg, callBack) {
    $.confirm({
        title: "Success!",
        content: msg,
        autoClose: "ok|8000",
        boxWidth: "500px",
        useBootstrap: !1,
        type: "green",
        backgroundDismiss: !1,
        backgroundDismissAnimation: "shake",
        buttons: {
            ok: {
                btnClass: "btn-primary",
                action: callBack
            }
        }
    })
}

function EDIUPLOADSingle(id, btn, Savefor, parm1, parm2, parm3) {
    var targetfile = $("#" + id + "File");
    if ("" == targetfile.val()) return ErrorMessage("No File Choosen!!!"), !1;
    var oldText = btn.html();
    if (btn.hasClass("disabled")) return !1;
    btn.text("Processing....."), btn.attr("disabled", !0), btn.addClass("disabled");
    var fileUpload = targetfile.get(0);
    if (null == window.FormData) return !1;
    for (var files = fileUpload.files, fileData = new FormData, i = 0, result; i < files.length; i++) fileData.append(files[i].name, files[i]);
    return 0 == files.length && fileData.append(targetfile.val(), null), fileData.append("id", id), fileData.append("Savefor", Savefor), fileData.append("parm1", parm1), fileData.append("parm2", parm2), fileData.append("parm3", parm3), forminuse = !0, $.ajax({
        method: "POST",
        url: window.location.pathname + "/UploadDoc",
        data: fileData,
        async: !1,
        cache: !1,
        contentType: !1,
        processData: !1
    }).done((function(data) {
        "success" == data.c ? (result = data._objUPLOAD, SuccessMessageCallBack(data.m, (function() {
            var i;
            $("#Go" + id).html('<a style="width:auto" class="btn btn-success" href="' + data.p + '" target="_blank"><i class="fa fa-download"></i> View File</a>'), $("#hdf" + id + "File").val(data.p)
        }))) : "fileExtension" == data.c ? ErrorMessageCallBack(data.m, (function() {
            btn.html(oldText), btn.removeAttr("disabled"), btn.removeClass("disabled"), targetfile.val("")
        })) : "sessionexpired" == data.c ? ErrorMessageCallBack(data.m, (function() {})) : "servererror" == data.c ? ErrorMessageCallBack(data.m, (function() {})) : "alreadyexist" == data.c && ErrorMessageCallBack(data.m, (function() {})), btn.html(oldText), btn.removeClass("disabled"), btn.attr("disabled", !1), forminuse = !1
    })).error((function() {
        ErrorMessage("Opps...! Something went wrong! Please Check File size."), btn.html(oldText), btn.removeClass("disabled"), forminuse = !1
    })), result
}
$(document).on("change", ".btn-upload-doc", (function(e) {
    e.preventDefault();
    var btn = $(this),
        id = btn.attr("data-id"),
        targetfile = $("#" + id + "File");
    if ("" == targetfile.val()) return ErrorMessage("No File Choosen!!!"), !1;
    if (forminuse) return !1;
    var oldText = btn.html();
    if (btn.hasClass("disabled")) return !1;
    btn.text("Processing....."), btn.attr("disabled", !0), btn.addClass("disabled");
    var fileUpload = targetfile.get(0);
    if (null == window.FormData) return !1;
    for (var files = fileUpload.files, fileData = new FormData, i = 0; i < files.length; i++) fileData.append(files[i].name, files[i]);
    0 == files.length && fileData.append(targetfile.val(), null), fileData.append("id", id), forminuse = !0, $.ajax({
        method: "POST",
        url: window.location.pathname + "/UploadDoc",
        data: fileData,
        async: !1,
        cache: !1,
        contentType: !1,
        processData: !1
    }).done((function(data) {
        "success" == data.c ? SuccessMessageCallBack(data.m, (function() {
            var i;
            $("#Go" + id).html('<a style="width:auto" class="btn btn-success mt20" href="' + data.p + '" target="_blank"><i class="fa fa-download"></i> View File</a>'), $("#hdf" + id + "File").val(data.p)
        })) : "fileExtension" == data.c ? ErrorMessageCallBack(data.m, (function() {
            btn.html(oldText), btn.removeAttr("disabled"), btn.removeClass("disabled"), targetfile.val("")
        })) : "sessionexpired" == data.c ? ErrorMessageCallBack(data.m, (function() {})) : "servererror" == data.c ? ErrorMessageCallBack(data.m, (function() {})) : "alreadyexist" == data.c && ErrorMessageCallBack(data.m, (function() {})), btn.html(oldText), btn.removeClass("disabled"), btn.attr("disabled", !1), forminuse = !1
    })).error((function() {
        ErrorMessage("Opps...! Something went wrong! Please Check File size."), btn.html(oldText), btn.removeClass("disabled"), forminuse = !1
    }))
}));