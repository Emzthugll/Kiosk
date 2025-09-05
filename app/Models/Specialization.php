<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Specialization extends Model
{
    protected $fillable = ['name'];

    public function subSpecializations()
    {
        return $this->hasMany(SubSpecialization::class, 'specialization_id');
    }
}

