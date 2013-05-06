<?php

class Device extends Eloquent
{

     public function checkins()
     {
          return $this->has_many('Checkin','device');
     }


     public function lastcheckin()
     {
          return $this->has_many('Checkin','device')->order_by('created_at', 'desc');
     }

}