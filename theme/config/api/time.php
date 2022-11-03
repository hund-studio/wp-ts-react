<?php

return function () {
    // return ['a', 'b'];
    // return new \WP_Error('test_error', 'Expcted error', ['status' => 500]);
    return new \WP_REST_Response(date('Y-m-d H:i:s'), 200);
};
