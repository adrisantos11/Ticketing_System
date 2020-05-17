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
            width: 50%;
            color: #3685EC;
            margin: 0;
        }
        
        div .separator {
            height: 1px;
            background-color: rgb(102, 102, 102);
            width: 50%;
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
            <p>Se ha añadido un nuevo comentario en la incidencia <b>{{ $id_incidencia }}</b></p>
            <p>Enviado por: <b>{{ $user_name }}</b></p>
            <p>Contenido: <span><b>"{{ $comment }}"</b></span></p>
            <a style="font-size: 16px;" href={{ $incidencia_url }}>Ver comentarios</a>
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
