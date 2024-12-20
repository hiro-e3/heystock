<?php

use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

use function Illuminate\Log\log;

it('returns a successful response', function () {
    $rules = Rule::in(['manufacturer', 'supplier', 'customer']);
    $validate = Validator::make(['manufacturer'], [$rules]);

    return expect($validate->passes())->toBeTrue();
});
