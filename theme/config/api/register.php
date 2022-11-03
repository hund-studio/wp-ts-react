<?php

return function ($data) {

    $first_name = $data['first_name'];
    $last_name = $data['last_name'];
    $tax_code = $data['tax_code'];

    $region = $data['region'];
    $city = $data['city'];
    $zip_code = $data['zip_code'];
    $street = $data['street'];

    $email = $data['email'];

    $code = $data['code'];

    if (!$first_name || !$last_name || !$tax_code || !$region || !$city || !$zip_code || !$street || !$email || !$code) return false;

    $id = wp_insert_post([
        'post_title' => $first_name . ' ' . $last_name,
        'post_type' => 'member',
        'post_status' => 'publish'
    ]);

    if ($id === 0) return false;

    update_field('personal_information', [
        'first_name' => $first_name,
        'last_name' => $last_name,
        'tax_code' => $tax_code,
    ], $id);

    update_field('address', [
        'region' => $region,
        'city' => $city,
        'zip_code' => $zip_code,
        'street' => $street,
    ], $id);

    update_field('contact_information', [
        'email' => $email,
    ], $id);

    update_field('membership', [
        'code' => '',
    ], $id);

    return $id;
};
