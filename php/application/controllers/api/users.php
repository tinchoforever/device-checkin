<?php

class Api_Users_Controller extends Base_Controller {

    public $restful = true;
    public function get_all($office = "Buenos Aires"){
        $office = urldecode($office);
        $users = User::where('region', "=", $office)->get();
        $response = array();
        foreach ($users as $key => $value) {
         $response[] = $value->to_array();
     }
     return Response::json($response);
 }
 public function get_autocomplete($key, $office = 'Buenos Aires'){
     $key = urldecode($key);
     $office = urldecode($office);
     $users = User::where('fullname', "like", "%".$key ."%")
     ->where('region', "=", $office)
     ->get();
     $response = array();
     foreach ($users as $key => $value) {
         $response[]= $value->to_array();
     }
     return Response::json($response);
 }
}