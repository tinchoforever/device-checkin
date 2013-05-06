<?php

class Checkin extends Eloquent
{

     public $includes = array('from', 'to', 'device');

     public function from()
     {
          return $this->belongs_to('User', "from");
     }
     public function to()
     {
          return $this->belongs_to('User', "to");
     }
     public function device()
     {
          return $this->belongs_to('Device', "device");
     }
}