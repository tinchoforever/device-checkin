<?php

class Api_Devices_Controller extends Base_Controller {

    public $restful = true;
    public function post_checkin($uid,$from,$to){

        $checkin = new Checkin();
        $checkin->device = Device::where('uid', '=', $uid)->first()->id;
        $checkin->from = User::where('username', '=', $from)->first()->id;
        $checkin->to = User::where('username', '=', $to)->first()->id;
        $checkin->save();


        $response =  array('success' => true ,
            'id'=>$checkin->id,
            'date' =>  $checkin->created_at);
        return Response::json($response);
    }

    public function post_create() {
        $input = file_get_contents("php://input");

        $input =json_decode($input,true);


        $newdevice = new Device($input["device"]);
        $newdevice->save();

        $response =  array('success' => true, 'id' =>$newdevice->id);
        return Response::json($response);
    }



}