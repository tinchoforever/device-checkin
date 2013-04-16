<?php

class Checkin extends Eloquent
{
     public function from()
     {
          return $this->has_one('User');
     }
     public function to()
     {
          return $this->has_one('User');
     }
     public function device()
     {
          return $this->has_one('Device');
     }
}