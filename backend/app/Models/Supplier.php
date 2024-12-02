<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * 仕入先モデル
 *
 * @package App\Models
 */
class Supplier extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'address', 'phone', 'email', 'contact_person', 'contact_person_phone', 'contact_person_email', 'comment'];
}
