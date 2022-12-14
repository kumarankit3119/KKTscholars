$(document).ready((function() {
    $('[data-toggle="tooltip"]').tooltip(), $.fn.SetNumericOnly = function() {
        return this.each((function() {
            $(this).keydown((function(e) {
                var key = e.charCode || e.keyCode || 0;
                return 8 == key || 9 == key || 13 == key || 46 == key || key >= 35 && key <= 40 || key >= 48 && key <= 57 || key >= 96 && key <= 105 || (65 == e.keyCode || 86 == e.keyCode || 67 == e.keyCode) && (!0 === e.ctrlKey || !0 === e.metaKey)
            }))
        }))
    }, $.fn.SetDecimalOnly = function() {
        return this.each((function() {
            $(this).keydown((function(e) {
                var key = e.charCode || e.keyCode || 0;
                return 8 == key || 9 == key || 13 == key || 46 == key || 110 == key || 190 == key || key >= 35 && key <= 40 || key >= 48 && key <= 57 || key >= 96 && key <= 105
            }))
        }))
    }, $.fn.SetAlphabetOnly = function() {
        return this.each((function() {
            $(this).keydown((function(e) {
                var key = e.charCode || e.keyCode || 0;
                return 8 == key || 9 == key || 13 == key || 46 == key || 32 == key || 37 == key || 39 == key || key >= 65 && key <= 90 || (65 == e.keyCode || 86 == e.keyCode || 67 == e.keyCode) && (!0 === e.ctrlKey || !0 === e.metaKey)
            }))
        }))
    }, $.fn.SetAlphaNumericOnly = function() {
        return this.each((function() {
            $(this).keydown((function(e) {
                var key = e.charCode || e.keyCode || 0;
                return 8 == key || 32 == key || 46 == key || 36 == key || 35 == key || 37 == key || 39 == key || 144 == key || 188 == key || 189 == key || 190 == key || key >= 48 && key <= 57 || key >= 65 && key <= 90 || key >= 97 && key <= 105 || (65 == e.keyCode || 86 == e.keyCode || 67 == e.keyCode) && (!0 === e.ctrlKey || !0 === e.metaKey)
            }))
        }))
    }, $.fn.CheckAlphabetOnly = function() {
        return this.each((function() {
            $(this).blur((function(e) {
                var control = $(this),
                    str, letters = /^[A-Za-z ]+$/;
                return !!control.val().match(letters) || (swal("", "Please enter alphabets only", "error"), setTimeout((function() {
                    $(window).focus(), control.focus()
                }), 1), !1)
            }))
        }))
    }, $.fn.CheckAlphaNumericOnly = function() {
        return this.each((function() {
            $(this).blur((function(e) {
                var control, str, letters = /^[A-Z0-9]+$/;
                return !!$(this).val().match(letters) || (swal("", "Alphanumerics in capital only: [AXXXXXXXX67]", "error"), !1)
            }))
        }))
    }
}));