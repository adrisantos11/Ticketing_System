<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Laravel</title>

    <!-- Fonts -->
    <!-- <link href="https://fonts.googleapis.com/css?family=Work+Sans&display=swap" rel="stylesheet"> -->

    <!-- Bootstrap -->
    <link rel="stylesheet" href="{{ asset('bootstrap-4.4.1-dist/css/custom-css-bootstrap-magic-blue-colours.css') }}">
    <link href="https://fonts.googleapis.com/css?family=IBM+Plex+Sans|Muli|Overpass|Rubik|Source+Sans+Pro|Black+Han+Sans|Tomorrow&display=swap" rel="stylesheet">
    <script src="https://kit.fontawesome.com/521c7205fb.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="{{ asset('sass/app.scss')}}">

    <!-- Styles -->
    <style>
        @import url('https://fonts.googleapis.com/css?family=Karla&display=swap');
        html,
        body {
            color: #636b6f;
            /* font-family: 'Tomorrow', sans-serif; */
            /* font-family: 'Source Sans Pro', sans-serif; */
            /* font-family: 'Muli', sans-serif; */
            font-family: 'Rubik', sans-serif;
            /* font-family: 'Overpass', sans-serif; */
            /* font-family: 'IBM Plex Sans', sans-serif; */
        }
    </style>
</head>

<body>
    <!-- {{-- <div class="flex-center position-ref full-height"> --}}
        {{-- @if (Route::has('login'))
        <div class="top-right links">
            @auth
            <a href="{{ url('/home') }}">Home</a>
            @else
            <a href="{{ route('login') }}">Login</a>

            @if (Route::has('register'))
            <a href="{{ route('register') }}">Register</a>
            @endif
            @endauth
        </div>
        @endif --}} -->
    <!-- {{-- </div> --}} -->
    <div id="root" class="divPrincipal flex-center"></div>
</body>
<script type="text/javascript" src="js/root.js"></script>
<script src="https://code.jquery.com/jquery-3.4.1.slim.min.js"
    integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous">
</script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
    integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous">
</script>
<script src="{{ asset('bootstrap-4.4.1-dist/js/bootstrap.min.js') }}"
    integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous">
</script>

</html>
