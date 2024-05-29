<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>Быстрый старт. Размещение интерактивной карты на странице</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

    <script src="https://api-maps.yandex.ru/2.1/?apikey=ваш API-ключ&lang=ru_RU" type="text/javascript"></script>
    <script src="https://telegram.org/js/telegram-web-app.js"></script>

    
    <script type="text/javascript">
        ymaps.ready(init);
        function init(){
            var myMap = new ymaps.Map("map", {
                center: [55.76, 37.64],
                zoom: 7
            });
        }

        var WebApp = window.Telegram.WebApp
    </script>
</head>

<body>
    <div id="map" style="width: 600px; height: 400px"></div>
</body>

</html>

