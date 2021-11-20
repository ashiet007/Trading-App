@extends("layouts.backend")

@section("content")
<div class="animated fadeIn">
    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">
                    <strong class="card-title">Create User</strong>
                </div>
                <div class="card-body">
                    @include("partials.alerts")
                    <form class="col-md-8" method="post" action="{{route("users.store")}}" id="admin-form">
                        @csrf
                        <div class="form-group">
                            <label for="name" class=" form-control-label">Name</label>
                            <input type="text" name="name" id="name" placeholder="Enter your name" class="form-control" value="{{old('name')}}">
                        </div>
                        <div class="form-group">
                            <label for="email" class=" form-control-label">Email</label>
                            <input type="email" name="email" id="email" placeholder="Enter your email" class="form-control" value="{{old('email')}}">
                        </div>
                        <div class="form-group">
                            <label for="password" class=" form-control-label">Password</label>
                            <input type="password" name="password" id="password" placeholder="Enter your password" class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="password_confirmation" class=" form-control-label">Password confirmation</label>
                            <input type="password" name="password_confirmation" id="password_confirmation" placeholder="Confirm password" class="form-control">
                        </div>
                        <button type="submit" class="btn btn-lg btn-info btn-block">
                                Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div><!-- .animated -->
@endsection

@section("scripts")
<script type="text/javascript" src="{{ asset('vendor/jsvalidation/js/jsvalidation.js')}}"></script>
{!! $validator->selector('#admin-form') !!}
@endsection
