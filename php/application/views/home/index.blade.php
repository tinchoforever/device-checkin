@layout('layouts.admin')
@section('scripts')
@endsection

@section('styles')
@endsection
@section('content')

<div class="content app ng-scope">
	@if (count($checkins) == 0 )
	<h1> There are no checkins <small> :-( </small></h1>
	<h2> Why don't you try to go to a devices a install the app? </h2>
	@else
		@foreach ($checkins as $checkin)
        <hr/>
              <h3> {{ $checkin->device()->first()->name}}  {{ $checkin->device()->first()->platform}} </h3>
               <h3> {{ $checkin->device()->first()->model}} </h3>
               <h6> {{ $checkin->to()->first()->fullname}} </h6>
              <h6> {{ $checkin->location }} </h6>
              <h6> {{ $checkin->created_at }} </h6>

		@endforeach
        <hr/>
	@endif
</div>

<script src="/js/app/main.js"></script>

@endsection
