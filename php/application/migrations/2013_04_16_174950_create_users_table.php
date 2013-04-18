<?php

class Create_Users_Table {

	public function up()
    {
		Schema::create('users', function($table) {
			$table->increments('id');
			$table->string('fullname');
			$table->string('username')->unique();
			$table->timestamps();
	});

    }

	public function down()
    {
		Schema::drop('users');

    }

}