<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <!-- CSS only -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossorigin="anonymous">
</head>
<body>
    <div class="container">
        <h5>Coins List</h5>
        <div class="table">
            <table class="table-responsive">
                <thead>
                    <th>Sr.No.</th>
                    <th>Id</th>
                    <th>Symbol</th>
                    <th>Name</th>
                </thead>
                <tbody>
                    @foreach ($coins as $coin)
                        <tr>
                            <td>{{$loop->iteration}}</td>
                            <td>{{$coin['id']}}</td>
                            <td>{{$coin['symbol']}}</td>
                            <td>{{$coin['name']}}</td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
            {{$coins->links()}}
        </div>
    </div>
    <!-- JavaScript Bundle with Popper -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-U1DAWAznBHeqEIlVSCgzq+c9gqGAJn5c/t99JyeKa9xxaYpSvHU5awsuZVVFIhvj" crossorigin="anonymous"></script>
</body>
</html>
