@extends("layouts.backend")

@section("content")
<div class="animated fadeIn">
    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">
                    <strong class="card-title">User #{{$user->id}}</strong>
                </div>
                <div class="card-body">
                    <table id="bootstrap-data-table" class="table table-striped table-bordered">
                        <tr>
                            <th>Name</th>
                            <td>{{$user->name}}</td>
                        </tr>
                        <tr>
                            <th>Email</th>
                            <td>{{$user->email}}</td>
                        </tr>
                        <tr>
                            <th>Created At</th>
                            <td>{{$user->created_at}}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div><!-- .animated -->
@endsection

@section("scripts")
@endsection
