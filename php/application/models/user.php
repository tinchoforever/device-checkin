<?php

class User extends Eloquent
{
    public function checkins()
    {
        return $this->has_many('Checkin',"from");
    }
}