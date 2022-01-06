<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Levitas Global Markets</title>
    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">
    <link rel="stylesheet" href="{{asset("css/icons.min.css")}}">
    <link rel="stylesheet" href="{{asset("css/app.min.css")}}">
    <link rel="stylesheet" href="{{asset("css/bootstrap.min.css")}}">
    <link rel="stylesheet" href="{{asset("css/style.css")}}">
</head>
<body data-layout="horizontal">
    <div id="layout-wrapper"></div>
    <div class="rightbar-overlay"></div>
    <script src="{{asset("js/app.js")}}"></script>
    <script src="{{asset('libs/metismenu/metisMenu.min.js')}}"></script>
    <script src="{{asset('libs/simplebar/simplebar.min.js')}}"></script>
    <script src="{{asset('libs/node-waves/waves.min.js')}}"></script>
    <script src="{{asset('libs/feather-icons/feather.min.js')}}"></script>
    <!-- pace js -->
    <script src="{{asset('libs/pace-js/pace.min.js')}}"></script>
    <!-- password addon init -->
    <script src="{{asset('js/pass-addon.init.js')}}"></script>
</body>
</html>
