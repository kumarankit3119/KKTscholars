var myInterval, AttemptedAns = [],
    TotalTime = 0;

function NextQuestion(e) {
    var t = $(".test-questions").find("li.active");
    if (CheckNextPrevButtons(), t.is(":last-child")) return !1;
    $(".test-questions").find("li").removeClass("active"), t.next().addClass("active"), OpenCurrentQue(t.next().find("a")), e && (t.find("a").addClass("que-not-answered"), t.find("a").removeClass("que-not-attempted"));
    var a = t.attr("data-seq");
    $(".nav-tab-sections").find("li").removeClass("active"), $(".nav-tab-sections").find("li[data-id=" + a + "]").addClass("active"), CheckQueAttemptStatus()
}

function PrevQuestion(e) {
    var t = $(".test-questions").find("li.active");
    if (CheckNextPrevButtons(), t.is(":first-child")) return !1;
    $(".test-questions").find("li").removeClass("active"), t.prev().addClass("active"), OpenCurrentQue(t.prev().find("a"));
    var a = t.attr("data-seq");
    $(".nav-tab-sections").find("li").removeClass("active"), $(".nav-tab-sections").find("li[data-id=" + a + "]").addClass("active"), CheckQueAttemptStatus()
}

function CheckNextPrevButtons() {
    var e = $(".test-questions").find("li.active");
    $("#btnPrevQue").removeAttr("disabled"), $("#btnNextQue").removeAttr("disabled"), e.is(":first-child") ? $("#btnPrevQue").attr("disabled", "disabled") : e.is(":last-child") && $("#btnNextQue").attr("disabled", "disabled")
}

function pad(e, t) {
    for (var a = e + ""; a.length < t;) a = "0" + a;
    return a
}

function OpenCurrentQue(e) {
    $(".tab-content").hide(), $("#lblQueNumber").text(e.text()), $("#" + e.attr("data-href")).show();
    var t = e.parent().attr("data-seq");
    $(".nav-tab-sections").find("li").removeClass("active"), $(".nav-tab-sections").find("li[data-id=" + t + "]").addClass("active"), CheckQueAttemptStatus()
}

function CoundownTimer(e) {
    var t = 33.33 * e;
    myInterval = setInterval((function() {
        myTimeSpan = 1e3 * t, $(".timer-title").text(GetTime(myTimeSpan)), t < 600 ? ($(".timer-title").addClass("time-ending"), $(".timer-title").removeClass("time-started")) : ($(".timer-title").addClass("time-started"), $(".timer-title").removeClass("time-ending")), t > 0 ? t -= 1 : CleartTimer()
    }), 1e3)
}
function CleartTimer() {
    clearInterval(myInterval), $("title").text("Time Out"), $("#btnYesSubmitConfirm").trigger("click")
}

function GetTime(e) {
    parseInt(e % 1e3 / 100);
    var t = parseInt(e / 1e3 % 60),
        a = parseInt(e / 6e4 % 60),
        n = parseInt(e / 36e5 % 24);
    return (n = n < 10 ? "0" + n : n) + ":" + (a = a < 10 ? "0" + a : a) + ":" + (t < 10 ? "0" + t : t)
}

function pretty_time_string(e) {
    return (e < 10 ? "0" : "") + e
}

function CheckQueExists(e) {
    $.each(AttemptedAns, (function(t, a) {
        void 0 !== a && a[1] == e && AttemptedAns.splice(t, 1)
    }))
}

function CheckQueAttemptStatus() {
    var e = 0,
        t = 0,
        a = 0,
        n = 0,
        s = 0,
        i = 0;
    $(".test-questions").find("li").each((function() {
        var r = $(this);
        e += 1, r.children().hasClass("que-save") ? a += 1 : r.children().hasClass("que-save-mark") ? n += 1 : r.children().hasClass("que-mark") ? s += 1 : r.children().hasClass("que-not-answered") ? t += 1 : i += 1
    })), $(".lblTotalQuestion").text(e), $(".lblNotAttempted").text(t), $(".lblTotalSaved").text(a), $(".lblTotalSaveMarkForReview").text(n), $(".lblTotalMarkForReview").text(s), $(".lblNotVisited").text(i)
}

function CheckResult() {
    var n = 0;
    $("#tbodyResult").html();
    var score = 0,
        TotalQuestion = 0,
        TotalAttempted = 0,
        TotalCorrect = 0,
        TotalWrong = 0;
       
    $(".test-questions").find("li").each((function() {
        var r = $(this),
            a = r.find("a").attr("data-href"),
            currectAns = $("#" + a).find(".hdfCurrectAns").val(),
            currectQue = $("#" + a).find(".question-title").text(),
            CorrectAnsMarks = $("#" + a).find(".hdfCorrectAnsMarks").val(),
            InCorrectAnsMarks = $("#" + a).find(".hdfInCorrectAnsMarks").val();
        TotalQuestion += 1;
        var tr = $("<tr></tr>");
        tr.append("<td>" + currectQue + "</td>");
        var ansStatus = "Wrong",
            selectedAns = "";
        (r.children().hasClass("que-save") || r.children().hasClass("que-save-mark")) && ($("#" + a).find("input[name='radios" + a + "']").each((function() {
            var e = $(this);
            e.is(":checked") && (selectedAns = e.val(), e.val() == currectAns && (ansStatus = "Correct"))
        })), "Correct" == ansStatus ? (score += parseInt(CorrectAnsMarks), TotalCorrect += 1) : (score += parseInt(InCorrectAnsMarks), TotalWrong += 1), TotalAttempted += 1), r.children().hasClass("que-save") || r.children().hasClass("que-save-mark") ? tr.append("<td>" + selectedAns + "</td>") : tr.append("<td>---</td>"), r.children().hasClass("que-save") || r.children().hasClass("que-save-mark") ? "Correct" == ansStatus ? tr.append('<td><span class="label label-success">' + ansStatus + "</span></td>") : tr.append('<td><span class="label label-danger">' + ansStatus + "</span></td>") : tr.append("<td>N/A</td>"), tr.append("<td>" + currectAns + "</td>"), $("#tbodyResult").append(tr)
    })), $("#lblRTotalQuestion").text(TotalQuestion), $("#lblRTotalAttempted").text(TotalAttempted), $("#lblRTotalCorrect").text(TotalCorrect), $("#lblRTotalWrong").text(TotalWrong), $("#lblRScore").text(score), $("#theadres").DataTable({
        paging: !0,
        sorting: !1
    })

    console.log("Total attemped"+TotalAttempted);
    console.log("TotalCorrect"+TotalCorrect);
    console.log("TotalWrong"+TotalWrong);
    console.log("TotalQuestion"+TotalQuestion);
    $("#btnViewResult1").trigger("click")
}
$(document).ready((function() {
    "14" == $("#ExamID").val() && $("#drplanguage").append($("<option></option>").text("Gujarati").val("gujarati")), $("#page01").show(), $(".exam-paper").show(), CoundownTimer(parseInt($("#hdfTestDuration").val())), CheckNextPrevButtons(), CheckQueAttemptStatus(), $("#drpQuestionsGroup").on("change", (function() {
        $(".test-questions").find("li:nth-child(" + $(this).val() + ")").find("a").trigger("click")
    })), $("#btnPrevQue").click((function() {
        PrevQuestion(!0)
    })), $("#btnNextQue").click((function() {
        NextQuestion(!0)
    })), $(".test-ques").click((function() {
        var e = $(".test-questions").find("li.active").find("a");
        $(".test-questions").find("li").removeClass("active"), $(this).parent().addClass("active"), $(this).hasClass("que-save") || $(this).hasClass("que-save-mark") || $(this).hasClass("que-mark") || ($(this).addClass("que-not-answered"), $(this).removeClass("que-not-attempted")), e.hasClass("que-save") || e.hasClass("que-save-mark") || e.hasClass("que-mark") || (e.addClass("que-not-answered"), e.removeClass("que-not-attempted")), OpenCurrentQue($(this))
    })), $(".btn-save-answer").click((function(e) {
        e.preventDefault();
        var t = $(".test-questions").find("li.active"),
            a = t.find("a").attr("data-href"),
            n = ($("#" + a).find(".hdfQuestionID").val(), $("#" + a).find(".hdfPaperSetID").val(), $("#" + a).find(".hdfCurrectAns").val(), !1);
        if ($("input[name='radios" + a + "']").each((function() {
                $(this).is(":checked") && (n = !0)
            })), 0 == n) return alert("Please choose an option"), !1;
        $("input[name='radios" + a + "']:checked").val(), t.find("a").removeClass("que-save-mark"), t.find("a").removeClass("que-mark"), t.find("a").addClass("que-save"), t.find("a").removeClass("que-not-answered"), t.find("a").removeClass("que-not-attempted"), NextQuestion(!1), CheckQueAttemptStatus()
    })), $(".btn-save-mark-answer").click((function(e) {
        e.preventDefault();
        var t = $(".test-questions").find("li.active"),
            a = t.find("a").attr("data-href"),
            n = ($("#" + a).find(".hdfQuestionID").val(), $("#" + a).find(".hdfPaperSetID").val(), $("#" + a).find(".hdfCurrectAns").val(), $("#" + a).find(".hdfCurrectAns").val(), !1);
        if ($("input[name='radios" + a + "']").each((function() {
                $(this).is(":checked") && (n = !0)
            })), 0 == n) return alert("Please choose an option"), !1;
        $("input[name='radios" + a + "']:checked").val(), t.find("a").removeClass("que-save"), t.find("a").removeClass("que-mark"), t.find("a").addClass("que-save-mark"), t.find("a").removeClass("que-not-answered"), t.find("a").removeClass("que-not-attempted"), NextQuestion(!1), CheckQueAttemptStatus()
    })), $(".btn-mark-answer").click((function(e) {
        e.preventDefault();
        var t = $(".test-questions").find("li.active"),
            a = t.find("a").attr("data-href");
        $("#" + a).find(".hdfQuestionID").val(), $("#" + a).find(".hdfPaperSetID").val(), $("#" + a).find(".hdfCurrectAns").val(), $("#" + a).find(".hdfCurrectAns").val(), t.find("a").removeClass("que-save-mark"), t.find("a").removeClass("que-save"), t.find("a").addClass("que-mark"), t.find("a").removeClass("que-not-answered"), t.find("a").removeClass("que-not-attempted"), NextQuestion(!1), CheckQueAttemptStatus()
    })), $(".btn-reset-answer").click((function(e) {
        e.preventDefault();
        var t = $(".test-questions").find("li.active"),
            a = t.find("a").attr("data-href");
        $("#" + a).attr("data-queid"), t.find("a").removeClass("saved-que"), $("input[name='radios" + a + "']:checked").each((function() {
            $(this).prop("checked", !1).change()
        })), $("input[name='chk" + a + "']").each((function() {
            $(this).prop("checked", !1).change()
        })), $("input[type=checkbox]").prop("checked", !1).change(), $("input[type=text]").val(""), a = t.find("a").attr("data-href"), $("#" + a).find(".hdfQuestionID").val(), $("#" + a).find(".hdfPaperSetID").val(), $("#" + a).find(".hdfCurrectAns").val(), $("#" + a).find(".hdfCurrectAns").val(), t.find("a").removeClass("que-save-mark"), t.find("a").removeClass("que-mark"), t.find("a").removeClass("que-save"), t.find("a").removeClass("que-not-attempted"), t.find("a").addClass("que-not-answered"), CheckQueAttemptStatus()
    })), $(".btn-submit-all-answers").click((function(e) {
        e.preventDefault(), $(this), $(".test-questions").find("li").each((function() {
            var e = $(this),
                t = !1;
            if (e.children().hasClass("que-save") ? t = !0 : e.children().hasClass("que-save-mark") && (t = !0), t) {
                var a = e.find("a").attr("data-href");
                $("#" + a).find(".hdfCurrectAns").val(), $("#" + a).find("input[name='radios" + a + "']").each((function() {
                    var e = $(this);
                    e.is(":checked") && e.val()
                }))
            }
        })), $(".exam-paper").hide(), $(".stream_1").hide(), $("#divdrplngcng").hide(), $(".exam-summery").show(), CheckQueAttemptStatus()
    })), $("#btnYesSubmitConfirm").on("click", (function(e) {
        e.preventDefault(), $(".exam-thankyou").show(), $(".exam-paper").hide(), $("#divdrplngcng").hide(), $(".exam-summery").hide()
    })), $("#btnNoSubmitConfirm").on("click", (function(e) {
        e.preventDefault(), $(".exam-paper").show(), $(".stream_1").show(), $(".exam-confirm").hide(), $("#divdrplngcng").show(), $(".exam-summery").hide()
    })), $(".drplanguage").on("change", (function(e) {
        e.preventDefault();
        var newlang = $(this).val();
        $(".question-height > .MQ").each((function(index, item) {
            var currentImg = $(this),
                currentQuestionNo = currentImg.data("questionno"),
                currentDisImg = $(".question-height > ." + currentQuestionNo + "DQ");
            $.each(JSON.parse(PaperQuestions), (function(i, item) {
                item.QuestionNo == currentQuestionNo && item.LangID == parseInt(newlang) && (currentDisImg.attr("src", $("#datalink").val() + item.DescriptionImagePath), currentImg.attr("src", $("#datalink").val() + item.QuestionImagePath))
            }))
        })), $("#hdfCurrentLng").val(newlang)
    })), $(".stream_1").on("click", (function(e) {
        e.preventDefault();
        var current_herf = $(this).attr("data-href"),
            a;
        $(".test-questions").find("li").find("a[data-href=" + current_herf + "]").trigger("click")
    })), $("#btnViewResult").on("click", (function(e) {
        e.preventDefault(), CheckResult(), $(".exam-result").show(), $(".exam-thankyou").hide(), $("#divdrplngcng").hide()
    })), $("#btnRBack").on("click", (function(e) {
        e.preventDefault(), window.location.href = $("#hdfBaseURL").val() + "Quiz/Home/Index"
    })), $(".full_screen").click((function() {
        $("#quest").removeClass("col-md-8"), $("#quest").addClass("col-md-12"), $("#pallette").addClass("hidden"), $(".full_screen").addClass("hidden"), $(".collapse_screen").removeClass("hidden")
    })), $(".collapse_screen").click((function() {
        $("#quest").removeClass("col-md-12"), $("#quest").addClass("col-md-8"), $("#pallette").removeClass("hidden"), $(".full_screen").removeClass("hidden"), $(".collapse_screen").addClass("hidden")
    }))
}));