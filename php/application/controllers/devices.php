<?php

class Devices_Controller extends Base_Controller {

	public function action_index()
    {
         $devices = Device::order_by('created_at', 'desc')->get();
         return View::make('index')->with('devices', $devices);
    }

	public function action_show()
    {

    }

	public function action_edit()
    {

    }

}