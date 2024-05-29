let tg = window.Telegram.Webapp;

const hash = window.location.hash.slice(1);
console.log(hash);

const params = new URLSearchParams(hash);
console.log(params.get('tgWebAppStartParam'));

let first_point = 'Москва, Льва Толстого 16';
let second_point = 'Москва, Пушкина 12';
let time = '';

ymaps.ready(function () {
    var myMap = new ymaps.Map('map', {
        center: [56.032520, 92.889993],
        zoom: 9,
        // Добавим панель маршрутизации.
        controls: ['routePanelControl']
    });

    var control = myMap.controls.get('routePanelControl');

    // Зададим состояние панели для построения машрутов.
    control.routePanel.state.set({
        // Тип маршрутизации.
        type: 'masstransit',
        // Выключим возможность задавать пункт отправления в поле ввода.
        fromEnabled: false,
        // Адрес или координаты пункта отправления.
        from: first_point,
        // Включим возможность задавать пункт назначения в поле ввода.
        toEnabled: false,
        to: second_point
        // Адрес или координаты пункта назначения.
        //to: 'Петербург'
    });

    // Зададим опции панели для построения машрутов.
    control.routePanel.options.set({
        // Запрещаем показ кнопки, позволяющей менять местами начальную и конечную точки маршрута.
        allowSwitch: false,
        // Включим определение адреса по координатам клика.
        // Адрес будет автоматически подставляться в поле ввода на панели, а также в подпись метки маршрута.
        reverseGeocoding: true,
        // Зададим виды маршрутизации, которые будут доступны пользователям для выбора.
        types: { masstransit: true, pedestrian: true, auto: true }
    });

    // Создаем кнопку, с помощью которой пользователи смогут менять местами начальную и конечную точки маршрута.
    var switchPointsButton = new ymaps.control.Button({
        data: {content: "Поменять местами", title: "Поменять точки местами"},
        options: {selectOnClick: false, maxWidth: 160}
    });
    // Объявляем обработчик для кнопки.
    switchPointsButton.events.add('click', function () {
        // Меняет местами начальную и конечную точки маршрута.
        control.routePanel.switchPoints();
    });
    var multiRoutePromise = control.routePanel.getRouteAsync();
    multiRoutePromise.then(function(multiRoute) {
        // Подписка на событие обновления мультимаршрута.
        multiRoute.model.events.add('requestsuccess', function() {
            // Получение ссылки на активный маршрут.
            var activeRoute = multiRoute.getActiveRoute();
            // Когда панель добавляется на карту, она
            // создает маршрут с изначально пустой геометрией. 
            // Только когда пользователь выберет начальную и конечную точки,
            // маршрут будет перестроен с непустой геометрией.
            // Поэтому для избежания ошибки нужно добавить проверку,
            // что маршрут не пустой.
            if (activeRoute) {
                // Вывод информации об активном маршруте.
                console.log("Длина: " + activeRoute.properties.get("distance").text);
                console.log("Время прохождения: " + activeRoute.properties.get("duration").text);
                time = activeRoute.properties.get("duration").text;
            }
        });
    }, function (err) {
      console.log(err); 
    });  

    myMap.controls.add(switchPointsButton);
    document.getElementById('12321').textContent = `${hash}`;
});
