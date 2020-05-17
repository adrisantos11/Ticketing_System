<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <script src="https://kit.fontawesome.com/521c7205fb.js" crossorigin="anonymous"></script>
    <style>
        div .mail-body {
            width: 100%;
            height: auto;
        }
        div .header {
            font-size: 1.5rem;
            font-weight: bold;
            width: 96%;
            color: #3685EC;
            margin: 0;
        }

        div .separator {
            height: 1px;
            background-color: rgb(102, 102, 102);
            width: 96%;
        }
        div .footer {
            font-size: 1rem;
            font-weight: bold;
            color: rgb(102, 102, 102)
        }
    </style>
</head>
<body>
    <div class="mail-body">
        <div class='header' style="font-family: Sen, sans-serif">TICKETCLASS</div>
        <div class="body">
            <p>Nuevo cambio en el estado de la incidencia <span><a style="font-size: 16px;" href={{ $incidencia_url }}><b>I-{{ $id_incidencia }} </b></a></span></p>
            <p>ESTADO: <span style="color: {{$color}}; font-size: 16px;"><b>{{ $state }} </b></span></p>
        </div>
        <div class="separator"></div>
        <div class="footer">
            <p>GRACIAS POR USAR <b>TICKETCLASS</b>!!</p>
        </div>
    </div>

    {{-- La incidencia se ha modificado el día {{ $date }}.
    Porfavor, póngase en contacto con <b>{{ $technical }}</b> --}}
</body>
</html>
