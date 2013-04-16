<?php

class Create_Checkins_Table {

	public function up()
    {
		Schema::create('checkins', function($table) {
			$table->increments('id');
			$table->integer('from');
			$table->integer('to');
            $table->integer('device');
			$table->timestamps();
	});

    }

	public function down()
    {
		Schema::drop('checkins');

    }

}