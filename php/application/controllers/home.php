<?php

class Home_Controller extends Base_Controller {



	public function action_index()
	{
      $devices = Device::order_by('created_at', 'desc')->get();
      return View::make('home.index')->with('devices', $devices);
  }

}