function page_load() {
    $(document).ready((function() {
        changeIndtruct($("#drpLanguage").find("option:selected").val(), 1)
    }))
}

function changeIndtruct(q, flag) {
    $("#" + q).css("display", "block"), "2" == q ? ($("#1").css("display", "none"), $("#3").css("display", "none")) : "1" == q ? ($("#2").css("display", "none"), $("#3").css("display", "none")) : "3" == q ? ($("#1").css("display", "none"), $("#2").css("display", "none")) : ($("#2").css("display", "none"), $("#3").css("display", "none")), null != q && 0 != flag && $.ajax({
        method: "GET",
        async: !1,
        url: $("#hdfBaseUrl").val() + "Quiz/Home/Instructions_Lang",
        data: {
            LangID: q
        }
    }).done((function(data) {
        $(".ulInstruction> li:visible").length > 1 && $(".ulInstruction li:last-child").remove(), "" != data && $.each(JSON.parse(data.Instructions), (function(i, item) {
            $(".ulInstruction").append("<li>" + item.Instruction + "</li>")
        }))
    })).error((function() {
        swal("Opps...!", "Something went wrong! Please try again.")
    }))
}

function check_instruction(id) {
    0 == $("#" + id + "_ch").prop("checked") ? "1" == id ? swal({
        title: "Warning!",
        text: "Please accept terms and conditions before proceeding.",
        type: "warning",
        closeOnConfirm: !0,
        confirmButtonText: "OK",
        confirmButtonClass: "btn-primary",
        showLoaderOnConfirm: !0
    }) : "2" == id ? swal({
        title: "चेतावनी!",
        text: "आगे बढ़ने से पहले नियम और शर्तें स्वीकार करें।",
        type: "warning",
        closeOnConfirm: !0,
        confirmButtonText: "OK",
        confirmButtonClass: "btn-primary",
        showLoaderOnConfirm: !0
    }) : "3" == id && swal({
        title: "ચેતવણી!",
        text: "આગળ વધતા પહેલાં નિયમો અને શરતો સ્વીકારો.",
        type: "warning",
        closeOnConfirm: !0,
        confirmButtonText: "OK",
        confirmButtonClass: "btn-primary",
        showLoaderOnConfirm: !0
    }) : window.location.href = $("#hdfBaseUrl").val() + "Quiz/Home/Paper?Lng=" + $("#drpLanguage").find("option:selected").val()
}

function page_click() {
    $(document).on("click", "#btnStart", (function(e) {
        e.preventDefault();
        var frm = $("#frmexamtype"),
            frmParsley, btn;
        if (frm.parsley().validate(), !frm.parsley().isValid()) return !1;
        $(this).text("Processing..."), window.location.href = $("#hdfBaseUrl").val() + "Quiz/Home/Login?PaperID=" + $("#drpExamPaper").find("option:selected").val()
    })), $(document).on("click", "#btnLogin", (function(e) {
        e.preventDefault(), window.location.href = $("#hdfBaseUrl").val() + "Quiz/Home/Instructions"
    })), $(document).on("click", "#btnInstruction", (function(e) {
        var id;
        e.preventDefault(), check_instruction($(this).val())
    }))
}

function page_change() {
    $("#drpNatureofExam").on("change", (function(e) {
        e.preventDefault();
        var ID = $(this).val();
        "" != ID ? fill_paper($("#drpExamPaper"), ID) : $("#drpExamPaper").html = ""
    }))
}

function fill_paper(drp, ID) {
    $.ajax({
        method: "GET",
        async: !1,
        url: $("#hdfBaseUrl").val() + "Quiz/Home/SelectPaper",
        data: {
            ID: ID
        }
    }).done((function(data) {
        drp.html(""), drp.append("<option value=''>--Select--</option"), data.List.length > 0 && $.each(data.List, (function(index, value) {
            var opt = "<option value='" + value.ID + "'>" + value.PaperName + "</option>";
            drp.append(opt)
        }))
    })).error((function() {
        swal("Opps...!", "Something went wrong! Please try again.")
    }))
}
$(document).ready((function() {
    page_load(), page_click(), page_change()
}));