<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>TicketClass</title>

    <!-- Fonts -->
    <!-- <link href="https://fonts.googleapis.com/css?family=Work+Sans&display=swap" rel="stylesheet"> -->

    <!-- Bootstrap -->
    <link rel="stylesheet" href="{{ asset('bootstrap-4.4.1-dist/css/custom-css-bootstrap-magic-blue-colours.css') }}">
    <link href="https://fonts.googleapis.com/css?family=IBM+Plex+Sans|Muli|Overpass|Rubik|Sen:400;700;800|Source+Sans+Pro|Black+Han+Sans&display=swap" rel="stylesheet">
    <script src="https://kit.fontawesome.com/521c7205fb.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="{{ asset('sass/app.scss')}}" type="text/scss">

    <!-- Styles -->
    <style>
        @import url('https://fonts.googleapis.com/css?family=Karla&display=swap');
        html,
        body {
            color: #636b6f;
            /* font-family: 'Source Sans Pro', sans-serif; */
            /* font-family: 'Muli', sans-serif; */
            /* font-family: 'Rubik', sans-serif; */
            /* font-family: 'Overpass', sans-serif; */
            /* font-family: 'IBM Plex Sans', sans-serif; */
            font-family: 'Sen', sans-serif;

        }
        .popover {
        font-family: 'Sen', sans-serif;
        }
    </style>
</head>

<body>
    <div id="root"></div>
</body>
<script type="text/javascript" src="js/root.js"></script>
<script src="https://code.jquery.com/jquery-3.4.1.slim.min.js"
    integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous">
</script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
    integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous">
</script>
<script src="{{ asset('bootstrap-4.4.1-dist/js/bootstrap.min.js') }}"></script>

</html>
