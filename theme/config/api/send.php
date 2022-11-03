<?php

return function ($data) {

	$destination = $data['destination'];
	$subject = $data['subject'];
	$message = $data['message'];

	if (!$destination || !$subject || !$message) return false;

	return wp_mail($destination, $subject, $message);
};
