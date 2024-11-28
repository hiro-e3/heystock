<?php

use App\Http\Controllers\UserController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

use function Illuminate\Log\log;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user/{id}', [UserController::class, 'show']);
    Route::put('/user/{id}', [UserController::class, 'update']);
    Route::delete('/user/{id}', [UserController::class, 'destroy']);
});

Route::post('/user', [UserController::class, 'store']);
Route::post('/login', [UserController::class, 'login']);

Route::post('/user/tokens', function(Request $request) {
    $user = User::find($request->id);
    if($user instanceof User) {
        $tokens = [];
        foreach($user->tokens as $token) {
            $tokens[] = $token->token;
        }
        return response()->json([
            'tokens' => $tokens
        ]);
    }
});


