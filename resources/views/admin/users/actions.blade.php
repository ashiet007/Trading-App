{!! Form::open(['route' => ["users.destroy", $id], 'method' => 'delete']) !!}
<div class='btn-group'>
    <a href="{{ route("users.show", $id) }}" class='btn btn-primary btn-xs'>
        <i class="ti-eye"></i>
    </a>
    <a href="{{ route('users.edit', $id) }}" class='btn btn-success btn-xs'>
        <i class="ti-pencil-alt"></i>
    </a>
    {!! Form::button('<i class="ti-trash"></i>', [
        'type' => 'submit',
        'class' => 'btn btn-danger btn-xs',
        'onclick' => "return confirm('Are you sure?')"
    ]) !!}
</div>
{!! Form::close() !!}
