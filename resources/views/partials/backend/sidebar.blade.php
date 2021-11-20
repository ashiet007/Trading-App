<nav class="navbar navbar-expand-sm navbar-default">
    <div id="main-menu" class="main-menu collapse navbar-collapse">
        <ul class="nav navbar-nav">
            <li class="{{ request()->is('admin/dashboard') ? 'active' : '' }}">
                <a href="{{route("dashboard")}}"><i class="menu-icon fa fa-laptop"></i>Dashboard </a>
            </li>
            <li class="menu-title">Users Management</li><!-- /.menu-title -->
            <li class="{{ request()->is('admin/users*') ? 'active' : '' }}">
                <a href="{{route('users.index')}}"><i class="menu-icon ti-user"></i>Users </a>
            </li>
            <li class="{{ request()->is('admin/kycs*') ? 'active' : '' }}">
                <a href="{{route('kycs.index')}}"><i class="menu-icon ti-user"></i>KYC's </a>
            </li>
            <li class="{{ request()->is('admin/orders*') ? 'active' : '' }}">
                <a href="{{route('orders.index')}}"><i class="menu-icon ti-user"></i>Orders </a>
            </li>
        </ul>
    </div><!-- /.navbar-collapse -->
</nav>
