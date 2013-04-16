<?php

class Create_Devices_Table {

	public function up()
    {
		Schema::create('devices', function($table) {
			$table->increments('id');
			$table->string('name');
			$table->string('uid')->unique();
			$table->timestamps();
	});

    }

	public function down()
    {
		Schema::drop('devices');

    }

}