@extends("layouts.backend")

@section("content")
<div class="animated fadeIn">
    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">
                    <strong class="card-title">Orders</strong>
                </div>
                <div class="card-body">
                    @include("partials.alerts")
                    {{$dataTable->table()}}
                </div>
            </div>
        </div>
    </div>
</div><!-- .animated -->
@endsection

@section("scripts")
{{$dataTable->scripts()}}
@endsection
