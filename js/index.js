$(function () {

    var costSlider = $(".slider-cost__range");
    var daysSlider = $(".slider-days__range");
    var deperDatapicker = $("#departure-dates");

    $(costSlider).slider({
        range: true,
        animate: true,
        min: 500,
        max: 200000,
        step: 500,
        values: [50000, 150000],
        slide: function (event, ui) {
            $(".slider-cost__amount").text(ui.values[0] + " P" + " — " + ui.values[1] + " P");
            $("input[name = 'from-rub']").val(ui.values[0]);
            $("input[name = 'to-rub']").val(ui.values[1]);
        }
    });

    $(".slider-cost__amount").text($(costSlider).slider("values", 0) + " P" +
        " — " + $(costSlider).slider("values", 1) + " P");

    $(".slider-cost").on("click", function () {
        $(this).toggleClass("slider-wrap-active");
        $(this).find(".slider-cost__range-wrap").toggleClass("slider-active");
    });


    $(daysSlider).slider({
        range: true,
        animate: true,
        min: 1,
        max: 30,
        step: 1,
        values: [6, 14],
        slide: function (event, ui) {
            $(".slider-days__amount").text(ui.values[0] + " — " + ui.values[1] + " ночей");
            $("input[name = 'from-cost']").val(ui.values[0]);
            $("input[name = 'to-cost']").val(ui.values[1]);
        }
    });

    $(".slider-days__amount").text($(daysSlider).slider("values", 0) + " — " + $(daysSlider).slider("values", 1) + " ночей");

    $(".slider-days").on("click", function () {
        $(this).toggleClass("slider-wrap-active");
        $(this).find(".slider-days__range-wrap").toggleClass("slider-active");
    });

    $.datepicker.regional['ru'] = {
        "closeText": "Закрыть",
        "prevText": "Пред",
        "nextText": "След",
        "currentText": "Сегодня",
        "monthNames": ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"],
        "monthNamesShort": ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
        "dayNames": ["воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота"],
        "dayNamesShort": ["ВС", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"],
        "dayNamesMin": ["ВС", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"],
        "firstDay": 1,
        "isRTL": false,
        "showMonthAfterYear": false,
        "yearSuffix": ""
    };
    $.datepicker.setDefaults($.datepicker.regional['ru']);

    $(deperDatapicker).datepicker({
        range: 'period',
        numberOfMonths: 2,
        dateFormat: 'dd.mm.yy',
        monthNames: ["январь", "февраль", "март", "апрель", "май", "июнь", "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь"],
        onSelect: function (dateText, inst, extensionRange) {
            var startDate = $.datepicker.formatDate("dd MM, D", $.datepicker.parseDate("dd.mm.yy", extensionRange.startDateText));
            var endDate = $.datepicker.formatDate("dd MM, D", $.datepicker.parseDate("dd.mm.yy", extensionRange.endDateText));
            $(deperDatapicker).val(startDate + ' - ' + endDate);
        }
    });

    $(".parameters__region-item span").on("click", function () {
        $(this).closest("div").addClass("parameters__region-item-hide");
    });

    var citySelect = $('.city-select').selectize({
        sortField: 'text'
    });
    var citySelectize = citySelect[0].selectize;

    $(".city-btn-close").on("click", function () {
        citySelectize.clear()
    });

    $(".guests-wrap").on("click", function () {
        $(this).find(".guests-wrap__select-wrap").toggleClass("slider-active");
    });

    $(".guests-wrap__select-wrap").on("click", function () {
        return false;
    });

    var guestsSpan = $(".guests-wrap__amount");

    $(".guests-wrap__adults,.guests-wrap__children").on("change", function () {
        var adults = $(".guests-wrap__adults option:selected").val();
        var children = $(".guests-wrap__children option:selected").val();

        var text = adults + " ";
        if (adults == 1) {
            text += "взрослый";
        } else {
            text += "взрослых";
        }

        if (children != 0) {
            text += ", " + children + " ";
            if (children == 1) {
                text += "ребенок";
            } else {
                text += "детей";
            }
        }
        guestsSpan.text(text);
    });
});
