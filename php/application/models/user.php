<?php

class User extends Eloquent
{
    public function comments()
    {
      return $this->has_many('Checkin');
    }
}