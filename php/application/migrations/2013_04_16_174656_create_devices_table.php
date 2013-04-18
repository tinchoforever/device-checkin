<?php

class Create_Devices_Table {

	public function up()
    {
		Schema::create('devices', function($table) {
			$table->increments('id');
			$table->increments('id');
			$table->model('name');
			$table->string('uid');
			$table->timestamps();
	});

    }

	public function down()
    {
		Schema::drop('devices');

    }

}