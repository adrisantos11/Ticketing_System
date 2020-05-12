<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    {{-- <link href="https://fonts.googleapis.com/css?family=IBM+Plex+Sans|Muli|Overpass|Rubik|Sen:400;700;800|Source+Sans+Pro|Black+Han+Sans&display=swap" rel="stylesheet"> --}}
    <script src="https://kit.fontawesome.com/521c7205fb.js" crossorigin="anonymous"></script>
    {{-- <link rel="stylesheet" href="{{ asset('css/prueba.css')}}""> --}}
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Sen');
        div .mail-body {
            width: 100%;
            height: auto;
        }
        div .header {
            font-size: 1.5rem;
            font-weight: bold;
            width: 100%;
            text-align: center;
            margin: 1rem;
            padding: 1rem;
            color: #3685EC;
            background-color: rgb(241, 241, 241);
            font-family: 'Sen', sans-serif;
        }
        div .body p{
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="mail-body">
        <div class='header' style="font-family: Sen, sans-serif">Ticketclass</div>
        <div class="body">
            <p>La incidencia </p>
            <p><a style="font-size: 16px; text-align: center;" href={{ $incidencia_url }}><b>I-{{ $id_incidencia }} </b></a></p>
            <p>a cambiado al estado </p>
            <p style="color: {{$color}}; font-size: 16px;"><b>{{ $state }} </b></p>
        </div>
    </div>

    {{-- La incidencia se ha modificado el día {{ $date }}.
    Porfavor, póngase en contacto con <b>{{ $technical }}</b> --}}
</body>
</html>
