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
{{--    $name_user,
        $incidencia_url,
        $incidencia_name,
        $incidencia_description,
        $incidencia_category,
        $incidencia_limit_date,
        $supervisor_name,
        $team_name --}}
<body>
    <div class="mail-body">
        <div class='header' style="font-family: Sen, sans-serif">TICKETCLASS</div>
        <div class="body">
            <p>Hola <span><b>{{ $name_user }}</b>!</span></p>
            <p>Se te ha asignado la incidencia: <b><a style="color: #3685EC;" href={{ $incidencia_url }}>I-{{ $id_incidencia }}</a></b>
            <li>Nombre: <span><b>{{ $incidencia_name }}</b></span></li>
            <li>Descripción: <span><b>{{ $incidencia_description }}</b></span></li>
            <li>Categoría: <span><b>"{{ $incidencia_category }}</b></span></li>
            <li>Fecha límite de solución: <span><b>{{ $incidencia_limit_date }}</b></span></li>
            <li>Supervisor: <span><b>{{ $supervisor_name }}</b></span></li>
            <li>Equipo: <span><b>{{ $team_name }}</b></span></li>
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
