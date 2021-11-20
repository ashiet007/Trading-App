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
        <h5>markets List</h5>
        <div class="table">
            <table class="table-responsive">
                <thead>
                    <th>Sr.No.</th>
                    <th>Name</th>
                    <th>Symbol</th>
                    <th>Current Price</th>
                </thead>
                <tbody>
                    @foreach ($markets as $market)
                        <tr>
                            <td>{{$loop->iteration}}</td>
                            <td>{{$market['name']}}</td>
                            <td><img src="{{$market['image']}}" width="50"></td>
                            <td>{{$market['current_price']}}</td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
            {{$markets->links()}}
        </div>
    </div>
    <!-- JavaScript Bundle with Popper -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-U1DAWAznBHeqEIlVSCgzq+c9gqGAJn5c/t99JyeKa9xxaYpSvHU5awsuZVVFIhvj" crossorigin="anonymous"></script>
</body>
</html>
